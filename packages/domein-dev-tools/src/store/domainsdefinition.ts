import { domain } from "domein";

interface IAction {
  haspayload: boolean;
  domain: string;
  name: string;
  path: string;
}

interface IActionWithPayload extends IAction {
  payload?: any;
}

interface IDomain {
  actions: IAction[];
  name: string;
}

interface IPassedState {
  actions: Array<{
    [index: string]: { name: string; haspayload: boolean };
  }>;
  domains: string[];
}

interface IState {
  currentaction?: IAction;
  currentactionpayload?: any;
  currentdomain?: IDomain;
  currentdomainname?: string;
  domains: IDomain[];
}

function actions() {
  return {
    dispatchAction,
    reset: initialstate,
    set,
    setCurrentDomain,
    setCurrentDomainName,
    setCurrentAction,
    setCurrentActionPayload
  };
}

function initialstate(): IState {
  return {
    currentactionpayload: "",
    domains: []
  };
}

function builddomains({ domains, actions }: IPassedState): IDomain[] {
  return domains.map((domainname, index) => {
    return {
      actions: Object.keys(actions[index]).map(actionkey => {
        const action = actions[index][actionkey];
        const domain = domainname;
        const haspayload = action.haspayload;
        const name = action.name;
        const path = [domainname, actionkey]
          .join(".")
          .concat(action.haspayload ? "(payload)" : "()");

        return {
          domain,
          haspayload,
          name,
          path
        };
      }),
      name: domainname
    } as IDomain;
  }) as IDomain[];
}

function dispatchAction(state: IState, action: IActionWithPayload): IState {
  chrome.runtime.sendMessage({
    payload: action,
    type: "actiondispatch"
  });

  return {
    ...state,
    currentactionpayload: ""
  };
}

function setCurrentDomain(state: IState, currentdomain: IDomain): IState {
  return {
    ...state,
    currentdomain
  };
}

function setCurrentDomainName(
  state: IState,
  currentdomainname: object
): IState {
  const currentdomain = state.domains.find(
    a => a.name === (currentdomainname as any)
  );
  const currentaction = currentdomain ? currentdomain.actions[0] : undefined;

  return {
    ...state,
    currentaction,
    currentdomain,
    currentdomainname: currentdomainname as any
  };
}

function set(state: IState, newstate: IPassedState): IState {
  const domains = builddomains(newstate);
  const currentdomain = domains.length > 0 ? domains[0] : undefined;
  const currentaction = currentdomain ? currentdomain.actions[0] : undefined;
  const currentdomainname = currentdomain ? currentdomain.name : undefined;

  return { ...state, currentaction, currentdomain, currentdomainname, domains };
}

function setCurrentAction(state: IState, currentaction: IAction): IState {
  return {
    ...state,
    currentaction,
    currentactionpayload: ""
  };
}

function setCurrentActionPayload(
  state: IState,
  currentactionpayload: object
): IState {
  return {
    ...state,
    currentactionpayload
  };
}

export default domain(initialstate, actions);
