import { popupTemplate } from './popupTemplate.js';
import { initializePopup } from './popupMod.js';

export function handleMouseUp(event) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        chrome.storage.local.set({ highlightedText: selectedText }, () => {
            console.log('Highlighted text saved.');
            console.log(selectedText)
        });
        showBoltIcon(event);
    }
}

export function handleMouseDown(event) {
    let bolt = document.getElementById("boltIcon");
    if (event.target !== bolt) {
        bolt.style.display = "none";
    }
}

function showBoltIcon(event) {
    let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    let bolt = document.getElementById("boltIcon");

    bolt.style.left = rect.right + "px";
    bolt.style.top = rect.top + window.scrollY + "px";
    bolt.style.display = "block";

    bolt.onclick = function() {
        showJoltedPopup();
    };
}


function showJoltedPopup() {
    const container = document.getElementById('joltedExtensionPopupContainer');

    container.innerHTML = popupTemplate;

    container.style.display = 'block';
    container.onclick = function(event) {
        if (event.target === container) {
            container.style.display = 'none';
        }
    };

    initializePopup();
}


document.body.insertAdjacentHTML('beforeend', '<div id="boltIcon" style="position: absolute; display: none; cursor: pointer; border: 1px solid gray; padding: 5px; background-color: white; z-index: 9999;">⚡</div>');

// jolted container
document.body.insertAdjacentHTML('beforeend', '<div id="joltedExtensionPopupContainer" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 10000;"></div>');
