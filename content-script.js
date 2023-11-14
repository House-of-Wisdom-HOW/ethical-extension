chrome.tabs.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("       ");
        console.log("request", request);
        console.log("sender", sender);
        console.log("sendResponse", sendResponse);
        console.log("       ");

        sendResponse({farewell: "goodbye"});
    }
);