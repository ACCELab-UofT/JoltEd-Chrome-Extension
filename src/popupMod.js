// Constants
const serverBaseURL = 'http://localhost:8000';
const DEFAULT_VALUES = {
    instructorIdentity: "Colleague with an expertise in Computer Science",
    levelOfExpertise: "Beginner",
    areaOfInterest: "Computer Science",
};

let highlightedText = '';

/**
 * Initialize the popup functionality
 */
export function initializePopup() {
    console.log("Popup initialized");

    retrieveHighlightedText();
    
    const processButton = document.getElementById('processButton');
    processButton.addEventListener('click', handleFormSubmit);
}

/**
 * Retrieve highlighted text from chrome storage
 */
function retrieveHighlightedText() {
    chrome.storage.local.get(['highlightedText'], (result) => {
        if (result.highlightedText) {
            highlightedText = result.highlightedText;
            console.log('Retrieved highlighted text:', highlightedText);
        }
    });
}

/**
 * Handle form submission, sending a message to the background script and closing the popup
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const formValues = collectFormValues();
    console.log("submit button pressed with transformation type: ", formValues.transformationType);

    const requestBody = {
        prompt: constructPrompt(formValues),
    };
    chrome.runtime.sendMessage({ action: "replaceText", body: requestBody });

    closePopup();
}

/**
 * Collect values from the form
 */
function collectFormValues() {
    return {
        transformationType: getSelectedRadioValue('transformationType'),
        instructorIdentity: getValueByName('instructorIdentity'),
        levelOfExpertise: getValueByName('levelOfExpertise'),
        areaOfInterest: getValueByName('areaOfInterest'),
    };
}

/**
 * Get value from an input element by its name
 * @param {string} name - name attribute of the input element
 */
function getValueByName(name) {
    return document.querySelector(`[name="${name}"]`).value;
}

/**
 * Get the selected value of a radio button group
 * @param {string} name - name attribute of the radio button group
 */
function getSelectedRadioValue(name) {
    const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return selectedRadio ? selectedRadio.value : '';
}

/**
 * Construct the prompt based on formValues
 * @param {object} formValues - form values collected
 */
function constructPrompt(formValues) {
    const {
        instructorIdentity = DEFAULT_VALUES.instructorIdentity,
        levelOfExpertise = DEFAULT_VALUES.levelOfExpertise,
        areaOfInterest = DEFAULT_VALUES.areaOfInterest,
    } = formValues;

    const promptTemplates = {
        personalize: `${highlightedText}\n\nTransform the given text but YOU MUST MAINTAIN its length within -1/+1 paragraph. Assume it is educational material that you will now modify to be personalized to the student's area of interest which is ${areaOfInterest}. Adjust the wording and examples, conceptual explanations and/or metaphors to be appropriate to the level of expertise of the student which is ${levelOfExpertise}. Replace any explanations, usecases, examples, practice problems, or other components of the educational material to be appropriate for the area of interest which is ${areaOfInterest}. Phrase all wordings as if you were a ${instructorIdentity}. \n\n `,
        simplify: `${highlightedText}\n\nAs an ${instructorIdentity} simplify the given text while keeping the core ideas the same. Make it more understandable for someone of a level of expertise ${levelOfExpertise}.`,
        concreteExample: `${highlightedText}\n\nGiven the topic in this text above, create a concrete example of how it can be applied that is personalized to the student's area of interest which is ${areaOfInterest}. Ensure that your concrete example is appropriate for a student with the following level of expertise: ${levelOfExpertise}. Phrase all wordings as a ${instructorIdentity} would.`,
        metaphoricalExplanation: `${highlightedText}\n\nGiven the topic in this text above, create a metaphorical or analogy-based explanation of the topic that is personalized to the student's area of interest which is ${areaOfInterest}. Make sure to use references and concepts that are relevant to someone with an interest in ${areaOfInterest}. Ensure that your metaphorical or analogy-based explanation is appropriate for a student with the following level of expertise: ${levelOfExpertise}. Phrase all wordings as a ${instructorIdentity} would.`,
    };

    return promptTemplates[formValues.transformationType] || '';
}

/**
 * Close the popup after processing the form
 */
function closePopup() {
    const container = document.getElementById('joltedExtensionPopupContainer');
    if (container) {
        container.style.display = 'none';
    }
}
