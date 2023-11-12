let extensionInstallType; 

chrome.management.getSelf(myInfo =>{
    extensionInstallType = myInfo.installType
})

// Send request to content script to find and replace on screen text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    if (message.action == 'replaceText') {
        (async () => {
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            await chrome.tabs.sendMessage(tab.id, message = { req: 'run', body: message.body });
        })();
    }
});

// Provide install type to content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-install-type') {
      sendResponse(extensionInstallType);
    }
});