this.__domein_SUBSCRIBE_ACTION_DISPATCH__ = function __domein_SUBSCRIBE_ACTION_DISPATCH__(
  fn
) {
  if (typeof fn !== "function") {
    throw "__domein_SUBSCRIBE_ACTION_DISPATCH__ argument must be a function";
  }

  this.console.log("subscribed domein function");

  this.window.addEventListener("message", function(message) {
    if (message.data && message.data.type === "actiondispatch") {
      fn(message.data.payload);
    }
  });
};

this.__domein_DEVTOOLS_PUSH_DOMAINSMAP__ = function __domein_DEVTOOLS_PUSH_DOMAINSMAP__(
  message
) {
  const event = new this.CustomEvent("@@domein_DEVTOOLS_EXTENSION::domains", {
    detail: message
  });
  this.document.dispatchEvent(event);
};

this.__domein_DEVTOOLS_EXTENSION__ = function __domein_DEVTOOLS_EXTENSION__(
  message
) {
  const event = new this.CustomEvent("@@domein_DEVTOOLS_EXTENSION::message", {
    detail: message
  });
  this.document.dispatchEvent(event);
};

this.__domein_DEVTOOLS_EXTENSION_RESTARTED__ = function __domein_DEVTOOLS_EXTENSION_RESTARTED__() {
  const event = new this.CustomEvent("@@domein_DEVTOOLS_EXTENSION::restarted");
  this.document.dispatchEvent(event);
};
