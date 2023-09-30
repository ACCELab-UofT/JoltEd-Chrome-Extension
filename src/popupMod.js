let highlightedText = '';
// import { replaceText } from './textReplacementMod.js';

export function initializePopup() {
    console.log("Popup initialized");

    chrome.storage.local.get(['highlightedText'], (result) => {
        if (result.highlightedText) {
            highlightedText = result.highlightedText;
            console.log('Retrieved highlighted text:', highlightedText);
        }
    });

    const form = document.querySelector('form');

    const processButton = document.getElementById('processButton');
    processButton.addEventListener('click', handleFormSubmit);
}

async function handleFormSubmit(event) {
    console.log("handle form submit")
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const formValues = {
        transformationType: getSelectedRadioValue('transformationType'),
        instructorIdentity: document.querySelector('[name="instructorIdentity"]').value,
        levelOfExpertise: document.querySelector('[name="levelOfExpertise"]').value,
        areaOfInterest: document.querySelector('[name="areaOfInterest"]').value,
    };

    console.log("submit button pressed with transformation type: ", formValues.transformationType);

    try {
        // Construct the request body
        const requestBody = {
            prompt: constructPrompt(formValues), // Construct the prompt as needed
        };

        // Make a POST request to your FastAPI server
        const response = await fetch('http://localhost:8000/ask-gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from FastAPI server');
        }

        const result = await response.json();
        chrome.storage.local.set({ apiResponse: result }, () => {
            console.log('Response saved to local storage.');
        });
        console.log("Response from FastAPI server: ", result.message);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to get the selected value of a radio button group
function getSelectedRadioValue(name) {
    const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return selectedRadio ? selectedRadio.value : '';
}

// Function to construct the prompt based on formValues
function constructPrompt(formValues) {
    let prompt = '';
    const instructorIdentity = formValues.instructorIdentity || "professor of computer science";
    const levelOfExpertise = formValues.levelOfExpertise || "high";
    const areaOfInterest = formValues.areaOfInterest || "theoretical computer science";
    switch (formValues.transformationType) {
        case 'personalize':
            prompt = `Transform the following text and maintain its length within -1/+1 paragraph. Assume it is educational material that you will now modify to be more personalized. Adjust the wording and examples, conceptual explanations and/or metaphors to be appropriate to the level of expertise provided which is ${levelOfExpertise}. Replace any explanations, usecases, examples, practice problems, or other components of the educational material to be appropriate for the area of interest which is ${areaOfInterest}. Phrase all wordings as if you were a ${instructorIdentity}. \n\n ${highlightedText}`;
            break;
        case 'simplify':
            prompt = `As a ${instructorIdentity} with a level of expertise of ${levelOfExpertise} and an area of interest in ${areaOfInterest}, simplify the following text while keeping the core ideas intact. Make it more understandable for a beginner. \n\n ${highlightedText}`;
            break;
        case 'concreteExample':
            prompt = `As a ${instructorIdentity} with a level of expertise of ${levelOfExpertise} and an area of interest in ${areaOfInterest}, provide a concrete example or real-life application of the concepts in the following text. \n\n ${highlightedText}`;
            break;
        case 'metaphoricalExplanation':
            prompt = `As a ${instructorIdentity} with a level of expertise of ${levelOfExpertise} and an area of interest in ${areaOfInterest}, provide a metaphorical explanation of the ideas in the following text. Make it creative and engaging. \n\n ${highlightedText}`;
            break;
        default:
            break;
    }
    return prompt;
}
