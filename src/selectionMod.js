import { popupTemplate } from './popupTemplate.js';
import { initializePopup } from './popupMod.js';

// Constants
const BOLT_ICON_ID = "boltIcon";
const POPUP_CONTAINER_ID = "joltedExtensionPopupContainer";

export function handleMouseUp(event) {
    let selection = window.getSelection();
    console.log(selection.rangeCount)
    if (selection.rangeCount > 0 && selection.toString().length > 0) {
        let range = selection.getRangeAt(0);
        let highlightedText = range.toString().trim();

        console.log(range.startContainer)

        let rangeDetails = {
            startContainerPath: getNodePath(range.startContainer),
            startOffset: range.startOffset,
            endContainerPath: getNodePath(range.endContainer),
            endOffset: range.endOffset
        };

        showBoltIcon(event, selection.getRangeAt(0));

        // Store the range's details and highlighted text for later use
        chrome.storage.local.set({
            highlightedText: highlightedText,
            rangeDetails: rangeDetails
        }, () => {
            console.log('Highlighted text and range details saved.');
        });
    }
}
function getNodePath(node) {
    console.log(document.body.childNodes)
    console.log(document.childNodes)
    const path = [];
    while (node && node.parentNode) {
        path.unshift(Array.from(node.parentNode.childNodes).indexOf(node));
        node = node.parentNode;
    }
    // it's adding 2 extra ones here ... I think probably something like HTML, BODY
    return path.slice(2);
    // return path;
}

export function handleMouseDown(event) {
    let bolt = document.getElementById(BOLT_ICON_ID);
    if (event.target !== bolt) {
        bolt.style.display = "none";
    }
}

/**
 * Display the bolt icon near the selected text
 * @param {MouseEvent} event 
 * @param {Range} range - The selected range
 */
function showBoltIcon(event, range) {
    let rects = range.getClientRects();
    let lastRect = rects[rects.length - 1]; // get the last rectangle
    let bolt = document.getElementById(BOLT_ICON_ID);

    // Adjust the bolt's positioning calculation
    bolt.style.left = `${lastRect.right + window.scrollX}px`;
    bolt.style.top = `${lastRect.top + window.scrollY}px`;
    bolt.style.display = "block";

    bolt.onclick = function() {
        showJoltedPopup();
    };
}

/**
 * Display the popup and initialize its functionalities
 */
function showJoltedPopup() {
    const container = document.getElementById(POPUP_CONTAINER_ID);

    container.innerHTML = popupTemplate;
    container.style.display = 'block'; // show the container

    container.onclick = function(event) {
        if (event.target === container) {
            container.style.display = 'none';
        }
    };

    initializePopup();
}

// Create bolt icon and insert it into the body
const boltIconHTML = `
  <div id="${BOLT_ICON_ID}" style="position: absolute; display: none; cursor: pointer; border: 1px solid gray; padding: 5px; background-color: white; z-index: 9999;">
    ⚡
  </div>`;
document.body.insertAdjacentHTML('beforeend', boltIconHTML);

// Updated popup container CSS for fixed positioning
// This container will fill the screen and the modal content inside will be centered
const popupContainerHTML = `
  <div id="${POPUP_CONTAINER_ID}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 10000;">
  </div>`;
document.body.insertAdjacentHTML('beforeend', popupContainerHTML);
