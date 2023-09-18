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
  <img width="90%" alt="image" src="https://github.com/jaeyonglee3/JoltEd-Chrome-Extension/assets/73498725/6fdcf46c-33d5-4151-86b1-0e7028efc131">
</p>



Modern-day students consume educational material, including textbooks and articles, now almost exclusively online. Tailored explanations aligned with students' interests help make the students' learning more valuable.
* Enables example provision and customized explanations of educational content.
* Users can highlight any text, personalize it, and seamlessly transform what they see on the screen. 

## Built using
* HTML, CSS, JavaScript, Python, FastAPI


<!-- LICENSE -->
## Getting Started
To start, open up a terminal or a command prompt and navigate to the ```server``` directory of this project. Once you are there, type the following command:
   ```sh
   pip install -r requirements.txt
   ```
Then, on Chrome, navigate to ```chrome://extensions``` and press the load unpacked button in the top left. Navigate to this project folder and select it. The extension should now be added to your list of Chrome extensions.

Before being able to transform any online content, we need to start the backend server. Go back to the ```server``` directory of this project from any terminal and type this to get the sever started:
   ```sh
   python3 app.py
   ```

## Known Issues
