chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF'
    });
  });

chrome.action.onClicked.addListener(async (tab) => {
    console.log("   Plug in logs    ")
    console.log(tab);
    console.log(tab.url);
    return true;
});