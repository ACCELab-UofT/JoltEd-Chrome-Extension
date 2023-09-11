// let highlightedText = ''

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "highlightedText") {
//     highlightedText = message.highlightedText;
//     window.addEventListener("DOMContentLoaded", () => {
//       // Access the form elements here
//       const form = document.querySelector("form");
//       form.addEventListener("submit", async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior
    
//         const formValues = {
//           transformationType: getSelectedRadioValue("transformationType"),
//           instructorIdentity: document.querySelector('[name="instructorIdentity"]').value,
//           levelOfExpertise: document.querySelector('[name="levelOfExpertise"]').value,
//           areaOfInterest: document.querySelector('[name="areaOfInterest"]').value,
//         };
    
//         try {
//           let prompt = constructPrompt(formValues);
//           let newText = await generateText(prompt);
    
//           // Handle the newText as desired (e.g., display it on the page)
//           console.log("Response: ", newText);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       });
//     });    
//   }
// });

let highlightedText = "";

// Initial approach
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.highlightedText) {
//     highlightedText = message.highlightedText;
//     console.log("Text received (in background script): ", highlightedText)
//     sendResponse({ highlightedText });
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.highlightedText) {
    highlightedText = message.highlightedText;
    chrome.runtime.sendMessage({ action: "highlightedText", highlightedText: highlightedText });
  }
});
