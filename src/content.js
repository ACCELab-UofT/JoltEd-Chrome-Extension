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

// This listener waits for messages from other parts of the extension or even other extensions.
// The onMessage event is fired when a message is sent from either an extension process (by runtime.sendMessage) 
// or a content script (by tabs.sendMessage).
chrome.runtime.onMessage.addListener((request) => {
  console.log("Request received to initiate text transformation", request);
  
  // Once a message is received, we start the text replacement process by calling `findAndReplaceText`.
  findAndReplaceText(request.body.prompt);
});

// This asynchronous function coordinates the main logic of the text replacement.
const findAndReplaceText = async (prompt) => {
  try {
    // Retrieve the text that we need to replace.
    const highlightedText = await getHighlightedText();
  
    // If no text is found, we exit early.
    if (!highlightedText) return;

    // Locate the text within the document and get a reference to it.
    const reference = findReference(highlightedText);
  
    // If we couldn't find the text in the document, we exit.
    if (!reference) return;

    // Fetch new data and update the located text.
    await fetchData(prompt, chunk => {
      reference.element.innerText += chunk;
    });
  } catch (error) {
    console.error("Error in findAndReplaceText:", error);
    // Optionally, inform the user of an error through UI
  }
};

// Asynchronously retrieve the highlighted text from Chrome's local storage.
// Chrome storage is a key-value store that allows extensions to save data and retrieve it later.
const getHighlightedText = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['highlightedText'], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving from storage:", chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        console.log('Retrieved highlighted text:', result.highlightedText);
        resolve(result.highlightedText);
      }
    });
  });
};

// This function looks through specified elements in the document to find a match for `highlightedText`.
// Once found, it removes the original text from the document.
const findReference = (highlightedText) => {
  const allText = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
  
  // The `for...of` loop is a modern loop in ES6 which allows for iterating over iterable objects.
  for (const element of allText) {
    if (element.innerText.includes(highlightedText)) {
      element.innerText = ''; // Remove the original text
      return { element, originalText: element.innerText };
    }
  }
};

// Fetch data from a local server endpoint, handling it in chunks.
// This allows for potential real-time processing as each chunk of data is received.
const fetchData = async (prompt, onChunkReceived) => {
  try {
    const response = await fetch("http://localhost:8000/ask-gpt", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }), // ES6 shorthand for { prompt: prompt }
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // Pipe the readable stream through a TextDecoderStream.
    // This is useful for handling data streams that don't arrive all at once.
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    let chunk;
    while (!(chunk = await reader.read()).done) {
      onChunkReceived(chunk.value); // As each chunk arrives, we process it using the callback provided.
    }
  } catch (error) {
    console.error("Error in fetchData:", error);
    // Optionally, inform the user of an error through UI
  }
};

// A utility function to escape special characters in a string for use in a regular expression.
// This ensures that characters that have special meanings in regex (like ., *, +) are treated as literals.
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
