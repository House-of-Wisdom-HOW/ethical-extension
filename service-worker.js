async function getTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id;
};

chrome.tabs.onActivated.addListener(async function () {
    console.log("TAB UPDATED");
    const tabId = await getTabId();
    chrome.scripting.executeScript({
      target : {tabId: tabId},
      files : [ "content-script.js" ],
    })
    .then(() => console.log("script injected"))
    .then(() => chrome.scripting.insertCSS(
        {target: {tabId: tabId},
        files: ["coupon.css"]}
    ))
    .catch((err) => console.log("err", err));
});

//Make sure to check service worker logs to see the current URL being logged and not the browser logs
//You can access service worker logs by clicking on the service worker link when reloading the extension