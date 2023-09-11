// const getSelectedText = () => window.getSelection().toString();

// document.addEventListener("click", () => {
//   const a = getSelectedText()
//   if (a.length > 0) {
//     console.log('new selection', a)
//   }
// });

// document.addEventListener("selectionchange", () => {
//   if (getSelectedText().length === 0) {
//     console.log('selection change')
//   }
// });

// import function from form handler 
// pass in the highlighted text
// get output and replace the on screen text from here
console.log("Welcome to prototype V3 (from content script)")

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
    const a = getSelectedText();
    if (a && a.length > 0) {
      console.log('New selection: ', a);
  
      // Send the highlighted text to the background script
      chrome.runtime.sendMessage({ action: "highlightedText", highlightedText: a });
    }
});
  
  document.addEventListener("selectionchange", () => {
    const a = getSelectedText();
    if (!a || a.length === 0) {
      console.log('Selection change: empty');

      // Send a message to the background script with an empty highlightedText (optional, if needed)
      chrome.runtime.sendMessage({ action: "highlightedText", highlightedText: "" });
    }
});
  