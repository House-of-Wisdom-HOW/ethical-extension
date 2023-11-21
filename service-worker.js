async function getTabInfo() {
    const queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);
    const tab = tabs[0];
    const tabUrl = tab.url;
    const tabDomain = tabUrl.replace('http://', '').replace('https://', '').replace('www.','').split(/[/?#]/)[0];
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

function getDomainEthicacyLevel(tabDomain) {
    console.log('tabDomain', tabDomain);
    const dummyMap = {
        'google.com': 3,
        'amazon.com': 2,
        'twitter.com': 1
    }
    if (dummyMap[tabDomain]) {
        return dummyMap[tabDomain]
    };
    return 1;
}

function updateExtensionIcon(tabDomain) {
    const ethicacyLevel = getDomainEthicacyLevel(tabDomain);
    console.log('ethicacyLevel', ethicacyLevel);
    if (ethicacyLevel == 1) {
        chrome.action.setIcon({
            path: "green_square.png"
        })
    } else {
        chrome.action.setIcon({
            path: "yellow_square.png"
        })
    }
}

// adds a listener to detect tab change
chrome.tabs.onActivated.addListener(async function () {
    const [tabId, tabDomain] = await getTabInfo();
    updateExtensionIcon(tabDomain);
});

// adds a listener to detect url change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        const newDomain = changeInfo.url.replace('http://', '').replace('https://', '').replace('www.','').split(/[/?#]/)[0];
        updateExtensionIcon(newDomain);
    }
});

//Make sure to check service worker logs to see the current URL being logged and not the browser logs
//You can access service worker logs by clicking on the service worker link when reloading the extension