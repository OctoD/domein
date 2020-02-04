import { Middleware } from ".";
import { createPublicAction } from "./action";

const devtoolsactiondispatchkey = "__domein_SUBSCRIBE_ACTION_DISPATCH__";
const devtoolsextensionkey = "__domein_DEVTOOLS_EXTENSION__";
const devtoolsdomainsmapkey = "__domein_DEVTOOLS_PUSH_DOMAINSMAP__";
const devtoolsrestartkey = "__domein_DEVTOOLS_EXTENSION_RESTARTED__";

function tryexec(key: string, ...args: any[]) {
  const maybefn = (globalThis as any)[key];

  if (typeof maybefn === "function") {
    maybefn.apply(null, args);
  }
}

interface IDispatchActionMessage {
  domain: string;
  name: string;
  payload: any;
}

export interface IDevtoolsConfig {
  disabled?: boolean;
}

export function devtools(config: IDevtoolsConfig = {}): Middleware {
  if (!config.disabled) {
    tryexec(devtoolsrestartkey);
  }
  return domainsmap => {
    if (!config.disabled) {
      tryexec(
        devtoolsactiondispatchkey,
        async (message: IDispatchActionMessage) => {
          const domain = domainsmap[message.domain];
          const action: any = createPublicAction({
            actionname: message.name,
            channel: domain.setstatechannel,
            domainname: message.domain,
            getstate: domain.get,
            mediator: domain.mediator,
            middlewares: [
              middlewaremessage =>
                tryexec(devtoolsextensionkey, middlewaremessage)
            ],
            privateaction: domain.actions[message.name] as any
          });
          action(message.payload);
        }
      );

      const domains = Object.keys(domainsmap);
      const actions = domains.map(key =>
        Object.keys(domainsmap[key].actions).reduce(
          (actionsmap, action) => ({
            ...actionsmap,
            [action]: {
              haspayload: domainsmap[key].actions[action].length > 1,
              name: action
            }
          }),
          {}
        )
      );
      const initialstate = domains.reduce(
        (state, domain) => ({
          ...state,
          [domain]: domainsmap[domain].get()
        }),
        {}
      );

      tryexec(devtoolsdomainsmapkey, {
        actions,
        domains,
        initialstate
      });
    }

    return message => {
      if (!config.disabled) {
        tryexec(devtoolsextensionkey, message);
      }

      return message.state.next;
    };
  };
}
