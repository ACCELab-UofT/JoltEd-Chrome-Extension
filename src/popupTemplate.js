export const popupTemplate = `
<div id='popup' style="margin: auto; margin-top: 10%;" class="bg-white p-8 rounded-lg shadow-lg w-96">

      <h1 class="text-2xl mb-4 font-bold">JoltEd Chrome Extension</h1>
      <form>
        <fieldset class="mb-4">
          <legend class="font-medium mb-2">Transformation Type:</legend>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="radio" name="transformationType" value="Personalize Text" class="form-radio mr-2" checked />
              Personalize
            </label>
            <label class="flex items-center">
              <input type="radio" name="transformationType" value="Concrete Example" class="form-radio mr-2" />
              Give Concrete Example
            </label>
            <label class="flex items-center">
              <input type="radio" name="transformationType" value="Explanation With Metaphor" class="form-radio mr-2" />
              Give Metaphorical Explanation
            </label>
            <label class="flex items-center">
              <input type="radio" name="transformationType" value="simplify" class="form-radio mr-2" />
              Simplify
            </label>
          </div>
        </fieldset>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Area of Interest:</label>
          <input type="text" name="areaOfInterest" class="form-input w-full p-2 rounded border border-gray-300" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Instructor Identity:</label>
          <input type="text" name="instructorIdentity" class="form-input w-full p-2 rounded border border-gray-300" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Level of Expertise:</label>
          <input type="text" name="levelOfExpertise" class="form-input w-full p-2 rounded border border-gray-300" />
        </div>


        <button id="processButton" type="button" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Transform Highlighted Text
        </button>
      </form>
    </div>
`;
