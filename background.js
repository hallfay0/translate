const browserAction = chrome.browserAction;
browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "translateAndReplace" });
});
