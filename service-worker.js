async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs.length > 0 ? tabs[0] : undefined;
};

chrome.tabs.onActivated.addListener(async function () {
    console.log("TAB UPDATED");
    let tab = await getTab();
    if (tab) {
        console.log("service-worker", tab);
        const response = await chrome.tabs.sendMessage(tab.id, {tabUrl: tab.url});
        console.log('response', response);
    }
});

//Make sure to check service worker logs to see the current URL being logged and not the browser logs
//You can access service worker logs by clicking on the service worker link when reloading the extension