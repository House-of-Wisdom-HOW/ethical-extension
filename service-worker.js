async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url;
};

chrome.tabs.onUpdated.addListener(async function () {
    console.log("TAB UPDATED");
    let url = await getTab();
    console.log(url);
    return true;
});

//Make sure to check service worker logs to see the current URL being logged and not the browser logs
//You can access service worker logs by clicking on the service worker link when reloading the extension