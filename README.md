<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">JoltEd - Chrome Extension</h1>

  <p align="center">
    Personalized explanations and examples for enhancing students' education. Powered by the OpenAI API.
  </p>
</div>


<!-- ABOUT -->
## About
<p align="center">
  <img alt="image" src="https://github.com/jaeyonglee3/JoltEd-Chrome-Extension/assets/73498725/81f19407-2396-454c-87ac-d91287eb7823">
</p>



Modern-day students consume educational material, including textbooks and articles, now almost exclusively online. Tailored explanations aligned with students' interests help make the students' learning more valuable.
* Enables example provision and customized explanations of educational content.
* Users can highlight any text, personalize it, and seamlessly transform what they see on the screen. 

## Built using
* HTML, CSS, JavaScript, Python, FastAPI


<!-- LICENSE -->
## Getting Started
Navigate to the ```server``` directory of this project and install the dependencies if you don't have them already:
   ```sh
   pip install -r requirements.txt
   ```
Then, on Chrome, navigate to ```chrome://extensions``` and press the load unpacked button in the top left. Navigate to this project folder and select it. The extension should now be added to your list of Chrome extensions. Pin it to see it in the top right of Chrome (little red circle favicon).

Go back to the ```server``` directory of this project and add a ```.env``` file with ```OPENAI_API_KEY``` set to your API key. Start the server:
   ```sh
   python3 app.py
   ```

Inspect the popup window to see the console outputs of text received and the responses from Open AI. **Inspect the popup, and then highlight text (see known issues)**

## Known Issues / Next Steps
* The popup window must be open as the "receiving end" to receive highlighted text from the content.js file. Users can't open the popup and then highlight text because Chrome forces extension popups to close when something else is clicked.
  * We get around this during development by always having the dev tool window open for the popup (it doesn't close when it is being inspected) and then highlighting text and interacting w/ the extension.
* The app.py file sometimes needs to be run with ```uvicorn app:app --host 0.0.0.0 --port 8000 --reload``` to get the server started.
* Next step -> change text directly on webpage with transformed text.

## How it works
* The content.js file is the content script that runs in the context of the webpage and has access to the webpage DOM. Its job is to get the user’s currently highlighted text and send it to background.js. 
* The popup.js file takes the responses from the HTML form you see in the popup, constructs a prompt, and makes the request to the backend to transform the text + receives the response (just logs it out to console for now). 
* The background.js script is active and running as long as the browser is open and the extension is enabled. It acts as the intermediary between the content.js file and popup.js file (so highlighted text can be sent to popup.js)
