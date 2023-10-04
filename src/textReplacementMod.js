export function findAndReplaceText() {
    let highlightedText = '';
    let apiResponse = '';

    chrome.storage.local.get(['highlightedText'], (result) => {
        if (result.highlightedText) {
            highlightedText = result.highlightedText;
        }
    });

    chrome.storage.local.get(['apiResponse'], (result) => {
        if (result.apiResponse) {
            apiResponse = result.apiResponse;
        }
    });

    // Create a regular expression with the 'g' flag for global search
    var regex = new RegExp(escapeRegExp(highlightedText), 'g');

    // Get the paragraph element that contains the text
    var allText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');

    for (let i=0; i < allText.length; i++) {
        console.log(allText[i].innerText)
        if (allText[i].innerText.includes(highlightedText)) {
            allText[i].innerText = allText[i].innerText.replace(regex, apiResponse)
        }
    }
}
  
// Function to escape special characters in a string for regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}