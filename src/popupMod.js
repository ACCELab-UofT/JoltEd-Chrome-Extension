let highlightedText = '';

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

    // rest of the code remains the same...

    return prompt;
}
