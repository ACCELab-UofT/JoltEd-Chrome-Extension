
// import { popupTemplate } from './popupTemplate.js';
import { handleMouseUp, handleMouseDown } from './selectionMod.js';
import { initializePopup } from './popupMod.js';

console.log("Welcome to prototype V3 (from content script)");

const cssLink = document.createElement('link');
cssLink.href = chrome.runtime.getURL('src/styles/tailwind.css');
cssLink.rel = 'stylesheet';
document.head.appendChild(cssLink);

document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousedown', handleMouseDown);

// ... [All other code related to boltIcon and joltedExtensionPopupContainer placement]

window.onload = function() {
    console.log("WINDOW LOADED");
    initializePopup();
};

// // const getSelectedText = () => window.getSelection().toString();

// // document.addEventListener("click", () => {
// //   const a = getSelectedText()
// //   if (a.length > 0) {
// //     console.log('new selection', a)
// //   }
// // });

// // document.addEventListener("selectionchange", () => {
// //   if (getSelectedText().length === 0) {
// //     console.log('selection change')
// //   }
// // });

// // import function from form handler 
// // pass in the highlighted text
// // get output and replace the on screen text from here

// import { popupTemplate } from './popupTemplate.js';
// // const popupTemplate = require('./popupTemplate.js');

// console.log("Welcome to prototype V3 (from content script)")


// const cssLink = document.createElement('link');
// cssLink.href = chrome.runtime.getURL('src/styles/tailwind.css');
// cssLink.rel = 'stylesheet';
// document.head.appendChild(cssLink);

// // const jsScript = document.createElement('script');
// // jsScript.src = chrome.runtime.getURL('src/popup.js');  // Assuming popup.js is in the root of your extension
// // document.body.appendChild(jsScript);

// document.addEventListener('mouseup', function(event) {
//     let selectedText = window.getSelection().toString().trim();
//     if (selectedText.length > 0) {
//         // Assume highlightedText is the text you've captured
//         chrome.storage.local.set({ highlightedText: selectedText }, () => {
//             console.log('Highlighted text saved.');
//             console.log(selectedText)
//         });
//         showBoltIcon(event);
//     }
// });


// document.addEventListener('mousedown', function(event) {
//     let bolt = document.getElementById("boltIcon");
//     if (event.target !== bolt) {
//         bolt.style.display = "none";
//     }
// });

// function showBoltIcon(event) {
//     let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
//     let bolt = document.getElementById("boltIcon");

//     bolt.style.left = rect.right + "px";
//     bolt.style.top = rect.top + window.scrollY + "px";
//     bolt.style.display = "block";

//     bolt.onclick = function() {
//         showJoltedPopup();
//     };
// }


// function showJoltedPopup() {
//     const container = document.getElementById('joltedExtensionPopupContainer');

//     container.innerHTML = popupTemplate;

//     // Dynamically inject the popup.js script into the current page
//     let scriptElement = document.createElement('script');
//     scriptElement.src = chrome.runtime.getURL('src/popup.js');
//     container.appendChild(scriptElement);

//     container.style.display = 'block';
//     container.onclick = function(event) {
//         if (event.target === container) {
//             container.style.display = 'none';
//         }
//     };
// }


// // const getSelectedText = () => window.getSelection().toString();

// // document.addEventListener("click", () => {
// //     const a = getSelectedText();
// //     if (a && a.length > 0) {
// //       console.log('New selection: ', a);

// //       // Send the highlighted text to the background script
// //       chrome.runtime.sendMessage({ action: "highlightedText", highlightedText: a });
// //     }
// // });

// //   document.addEventListener("selectionchange", () => {
// //     const a = getSelectedText();
// //     if (!a || a.length === 0) {
// //       console.log('Selection change: empty');

// //       // Send a message to the background script with an empty highlightedText (optional, if needed)
// //       chrome.runtime.sendMessage({ action: "highlightedText", highlightedText: "" });
// //     }
// // });

