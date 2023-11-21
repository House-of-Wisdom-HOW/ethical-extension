async function getTabInfo() {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);
    const tab = tabs[0];
    const tabUrl = tab.url;
    const tabDomain = domain = tabUrl.replace('http://', '').replace('https://', '').replace('www.','').split(/[/?#]/)[0];
    return [tab.id, tabDomain];
};

function generateModal(companyName, companyEthicacy) {
    const couponDisplay = document.createElement('div');
    couponDisplay.className = '_coupon__list';
    couponDisplay.innerHTML = `<h1>${companyName}</h1><p>${companyEthicacy}</p>`;
    couponDisplay.style.display = 'block';
    document.body.appendChild(couponDisplay);
}

function hideModal(){
    couponDisplay.style.display = 'none';
}

async function displayModal() {
    console.log("TAB UPDATED");
    const [tabId, tabDomain] = await getTabInfo();
    chrome.scripting.executeScript({
      target : {tabId: tabId},
      func : generateModal,
      args: [tabDomain, "This company is very ethical"]
    })
    .then(() => console.log("script injected"))
    .then(() => chrome.scripting.insertCSS(
        {target: {tabId: tabId},
        files: ["coupon.css"]}
    ))
    .catch((err) => console.log("err", err));
}

chrome.tabs.onActivated.addListener(async function () {
    console.log("TAB UPDATED");
});

//Make sure to check service worker logs to see the current URL being logged and not the browser logs
//You can access service worker logs by clicking on the service worker link when reloading the extension