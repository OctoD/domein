const injectedScript = document.createElement("script");
const src = chrome.extension.getURL(
  "extension/browser/domein-middleware-binding.js"
);

injectedScript.src = src;

(document.head || document.documentElement).appendChild(injectedScript);

injectedScript.onload = function() {
  injectedScript.remove();
};

function createmessage(type, payload) {
  return {
    type,
    payload
  };
}

function sendmessage(type, payload) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(createmessage(type, payload), resolve);
  });
}

document.addEventListener(
  "@@domein_DEVTOOLS_EXTENSION:actiondispatched",
  function(event) {
    console.log(event);
  }
);

chrome.runtime.onMessage.addListener(async function(message) {
  if (message.type === "actiondispatch") {
    window.postMessage(message);
  }
});

document.addEventListener("@@domein_DEVTOOLS_EXTENSION::domains", function(
  event
) {
  const { initialstate, ...domainsmap } = event.detail;
  sendmessage("domainsmap", domainsmap);
  sendmessage("initialstate", initialstate);
});

document.addEventListener("@@domein_DEVTOOLS_EXTENSION::message", function(
  event
) {
  sendmessage("actioninvoked", event.detail);
});

document.addEventListener("@@domein_DEVTOOLS_EXTENSION::restarted", function() {
  sendmessage("resetstate");
});
