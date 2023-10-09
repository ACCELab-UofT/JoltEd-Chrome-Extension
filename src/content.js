// NOTE: you can't use import statements in the content.js file

(async () => {
  console.log("actual content js")
  const src = chrome.runtime.getURL("./main.js");
  const contentMain = await import("./main.js");
  const srcPopup = chrome.runtime.getURL("./popupMod.js");
  const contentPopup = await import("./popupMod.js");
  const srcSelection = chrome.runtime.getURL("./selectionMod.js");
  const contentSelection = await import("./selectionMod.js");
  const textReplacement = chrome.runtime.getURL("./textReplacementMod.js");
  const contentReplacement = await import("./textReplacementMod.js");
  // contentMain.main();
})();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Request received to initiate text transformation");
    findAndReplaceText()
  }
);

function findAndReplaceText() {
  let highlightedText = '';
  let apiResponse = '';

  // Use Promises to ensure that the data retrieval is completed before proceeding
  const getHighlightedTextPromise = new Promise((resolve) => {
    chrome.storage.local.get(['highlightedText'], (result) => {
      if (result.highlightedText) {
        highlightedText = result.highlightedText;
        console.log('Retrieved highlighted text:', highlightedText);
      }
      resolve(); 
    });
  });

  const getApiResponsePromise = new Promise((resolve) => {
    chrome.storage.local.get(['apiResponse'], (result) => {
      if (result.apiResponse) {
        apiResponse = result.apiResponse.message;
        console.log('Retrieved api response text:', apiResponse);
      }
      resolve(); 
    });
  });

  Promise.all([getHighlightedTextPromise, getApiResponsePromise]).then(() => {
    // Create a regular expression with the 'g' flag for global search
    var regex = new RegExp(escapeRegExp(highlightedText), 'g');
    var allText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');

    for (let i = 0; i < allText.length; i++) {
      if (allText[i].innerText.includes(highlightedText)) {
        allText[i].innerText = allText[i].innerText.replace(regex, apiResponse);
      }
    }
  });
}

// A utility function to escape special characters in a string for use in a regular expression
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}