<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">JoltEd - Chrome Extension</h1>

  <p align="center">
    The JoltEd Chrome Extension provides personalized explanation generation and example provisioning of educational content with the aim to authentically increase students' interest and value in their learning.
  </p>
</div>


<!-- ABOUT -->
## About
<p align="center">
  <img width="1470" alt="Screenshot 2023-11-03 at 3 32 57 PM" src="https://github.com/ACCELab-UofT/JoltEd-Chrome-Extension/assets/73498725/113bd8ad-c22b-4f98-89b1-d51bee5e4af1">
</p>

Modern day students consume educational material, including textbooks and articles, now nearly exclusively online. Tailored explanations aligned with students' interests help students find more value and meaning in their learning. The extension allows users to:
* Generate concrete examples and customized explanations of educational content.
* Highlight any text on the screen, personalize it, and seamlessly transform what they see on the screen. 

## Built using
* HTML, CSS, JavaScript, Python, FastAPI


<!-- LICENSE -->
## Getting Started (For Developers)
First, make a clone of this repository.

Then, on Chrome, type ```chrome://extensions``` into the address bar and press the load "unpacked button" in the top left. Navigate to this project folder (wherever it has been cloned locally) and select it. The extension should now be added to your list of Chrome extensions. When enabled, highlighting text on a webpage should display the lightning bolt icon.

<p align="center">
  <img width="400" alt="image" src="https://github.com/jaeyonglee3/JoltEd-Chrome-Extension/assets/73498725/e6fb9bbe-5adc-479f-a264-38dfd508aeae">
</p>

Use the reload icon next to the enable toggle to sync any code changes made locally with the extension loaded in the browser. 

## Known Issues / Next Steps
* Having the extension enabled seems to alter (to only a slight extent) the CSS of some web pages that are being viewed, such as Google search results not appearing in blue. This issue currently has no known direct cause.

## How it works
* The content.js file is the content script that runs in the context of the webpage and has access to the webpage DOM. Its job is to get the user’s currently highlighted text and store it in the browser's local storage. 
* The popupMod.js file takes the responses from the HTML form you see in the popup, constructs a prompt, and makes the request to our API to transform the text + receives the response. 
* The background.js script is active and running as long as the browser is open and the extension is enabled. Its primary job is to send a request to the content script to find and replace on screen text when the popupMod.js file detects a form submission from the popup window in the browser.
