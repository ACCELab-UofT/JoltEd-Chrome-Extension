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
