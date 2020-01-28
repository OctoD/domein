import { state } from "@state";

interface IMessage {
  payload: any;
  type: string;
}

function messagedispatcher(message: IMessage) {
  switch (message.type) {
    case "actioninvoked":
      state.actions.changeset.push(message.payload);
      state.actions.statetree.merge(message.payload);
      break;
    case "domainsmap":
      state.actions.domainsdefinition.set(message.payload);
      break;
    case "initialstate":
      state.actions.statetree.set(message.payload);
      break;
    case "resetstate":
      resetstate();
      break;
  }
}

async function resetstate() {
  state.actions.changeset.empty();
  state.actions.domainsdefinition.reset();
  state.actions.statetree.reset();
}

chrome.runtime.onMessage.addListener((message: IMessage) => {
  console.debug("Message arrived from background", message);
  messagedispatcher(message);
});
