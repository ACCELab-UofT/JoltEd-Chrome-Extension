(async () => {
  console.log("actual content js")
  // findAndReplaceText("Theoretical physics", "test test");
  findAndReplaceText("Theoretical physics is a branch of physics that employs mathematical models and abstractions of physical objects and systems to rationalize, explain and predict natural phenomena.", "test test test");
  const src = chrome.runtime.getURL("./main.js");
  const contentMain = await import("./main.js");
  const srcPopup = chrome.runtime.getURL("./popupMod.js");
  const contentPopup = await import("./popupMod.js");
  const srcSelection = chrome.runtime.getURL("./selectionMod.js");
  const contentSelection = await import("./selectionMod.js");
  // const textReplacement = chrome.runtime.getURL("./textReplacementMod.js");
  // const contentReplacement = await import("./textReplacementMod.js");
  // contentMain.main();
})();

function findAndReplaceText(findText, replaceText) {
  // Create a regular expression with the 'g' flag for global search
  var regex = new RegExp(escapeRegExp(findText), 'g');

  // Get the paragraph element that contains the text
  var allText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a'); // Adjust the selector as needed

  for (let i=0; i < allText.length; i++) {
    console.log(allText[i].innerText)
    if (allText[i].innerText.includes(findText)) {
      allText[i].innerText = allText[i].innerText.replace(regex, replaceText)
    }
  }
}

// Function to escape special characters in a string for regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Version using walker across all nodes in the webpage
// function findAndReplaceText(findText, replaceText) {
//   // Create a regular expression with the 'g' flag for global search
//   var regex = new RegExp(escapeRegExp(findText).replace(/\s+/g, '\\s+'), 'g');
//   console.log(regex)
  
//   // Iterate through all text nodes on the page
//   var walker = document.createTreeWalker(
//     document.body,
//     NodeFilter.SHOW_TEXT,
//     null,
//     false
//   );

//   while (walker.nextNode()) {
//     var node = walker.currentNode;
//     node.textContent = node.textContent.replace(regex, replaceText);
//     console.log(node.textContent)
//   }
// }

// // Function to escape special characters in a string for regex
// function escapeRegExp(string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }