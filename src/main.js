import { handleMouseUp, handleMouseDown } from './selectionMod.js';

console.log("Welcome to prototype V3 (from content script)");

const cssLink = document.createElement('link');
cssLink.href = chrome.runtime.getURL('src/styles/tailwind.css');
cssLink.rel = 'stylesheet';
document.head.appendChild(cssLink);

document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousedown', handleMouseDown);

