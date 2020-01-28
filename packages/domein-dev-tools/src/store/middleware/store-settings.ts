import { Middleware } from "domein/dist/middleware";

const domainkey = "settings";
const debug = (...messages: any[]) =>
  console.debug("storesettings middleware ", ...messages);

export default function storesettings(): Middleware {
  debug("initialized");

  return domains => {
    const domain = domains[domainkey];
    debug("domains loaded");

    if (domain) {
      debug("settings domain found");
      const actions = domain.actions;
      const actionkeys = Object.keys(actions).filter(a => a !== "load");
      debug("restoring settings", actionkeys.join(", "));

      chrome.storage.sync.get(actionkeys, items =>
        (domain.actions.load as any)(domain.get(), items as any)
      );
    }

    return message => {
      if (message.domain === domainkey && message.action !== "load") {
        chrome.storage.sync.set({
          [message.action]: message.payload
        });
      }

      return message.state.next;
    };
  };
}
