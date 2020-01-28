chrome.runtime.onInstalled.addListener(function() {
  chrome.runtime.onMessage.addListener(async function(message) {
    if ("type" in message && message.type === "actiondispatch") {
      console.debug("dispatching action from devtool", message);
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, message);
      });
    } else {
      console.debug("incoming message from window", message);
      chrome.runtime.sendMessage(message);
    }
  });
});
