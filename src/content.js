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
  findAndReplaceText(highlightedText, response);
  // contentMain.main();
})();