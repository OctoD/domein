console.debug("domein devtools started");

function initialdevtools() {
  return {
    devtoolsopen: false,
    pendingmessages: []
  };
}

let domeindevtools = initialdevtools();

function pushPendingMessages() {
  const messages = domeindevtools.pendingmessages.reverse();

  while (messages.length > 0) {
    const message = messages.pop();
    chrome.runtime.sendMessage(message);
    console.debug("Message pushed", message);
  }
}

chrome.devtools.panels.create("domein", "favicon.ico", "/index.html", function(
  panel
) {
  console.debug("Panel created.");

  chrome.runtime.onMessage.addListener(function(message) {
    if (!domeindevtools.devtoolsopen) {
      console.debug("Pushing to pending messages. Message:", message);
      domeindevtools.pendingmessages.push(message);
    }
  });

  panel.onShown.addListener(function() {
    domeindevtools.devtoolsopen = true;

    if (domeindevtools.pendingmessages.length > 0) {
      pushPendingMessages();
    }
  });
});
