import { popupTemplate } from './popupTemplate.js';
import { initializePopup } from './popupMod.js';

// Constants
const BOLT_ICON_ID = "boltIcon";
const POPUP_CONTAINER_ID = "joltedExtensionPopupContainer";

export function handleMouseUp(event) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        chrome.storage.local.set({ highlightedText: selectedText }, () => {
            console.log('Highlighted text saved.');
            console.log(selectedText);
        });
        showBoltIcon(event);
    }
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
 */
function showBoltIcon(event) {
    let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    let bolt = document.getElementById(BOLT_ICON_ID);

    // Adjust the bolt's positioning calculation
    bolt.style.left = `${rect.right + window.scrollX}px`;
    bolt.style.top = `${rect.top + window.scrollY}px`;
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
