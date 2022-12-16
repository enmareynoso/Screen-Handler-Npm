const readline = require('readline');
const fs = require('fs');
const colors = require('colors');

// Creating readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function displayWelcomeScreen () {

const screens = JSON.parse(fs.readFileSync('./screens.json'));

//get welcome screen 
const welcomeScreen = screens['welcome'];

console.log(colors.bgMagenta(`${welcomeScreen.content}`))
}



async function displayFormScreen() {
  // Read the screens.json file and parse the JSON data
  const screens = JSON.parse(fs.readFileSync("screens.json"));

  // Get the form screen data
  const formScreen = screens["form"];

  // Print the form screen title and content
  console.log(colors.dim(formScreen.title));
  console.log(formScreen.content);

  // Define an object to store the user's form data
  const userData = {};

  // Loop through the form fields
  for (const field of formScreen.fields) {
    // Prompt the user for the field's value
    userData[field.name] = await new Promise((resolve) => {
      rl.question(`${field.name}: `, resolve);
    });
  }

  // Print the save button message
  console.log(`\nTo save your data, type "${formScreen.saveButton.text}" and press enter.`);

  // Prompt the user for the save button text
  const saveButtonText = await new Promise((resolve) => {
    rl.question(`${formScreen.saveButton.text}: `, resolve);
  });

  // Check if the user entered the save button text
  if (saveButtonText.trim().toLowerCase() === formScreen.saveButton.text.toLowerCase()) {
    // Read the contents of the user-data.json file, if it exists
    let data;
    try {
      data = fs.readFileSync("user-data.json");
      data = JSON.parse(data);
    } catch (error) {
      // If the file does not exist, create a new array to store the user data
      data = [];
    }

    // Check if the data is an array
    if (!Array.isArray(data)) {
      // If the data is not an array, create a new array and add the existing data to it
      data = [data];
    }

    // Add the new user data to the array
    data.push(userData);

    // Stringify the array and write it back to the file
    fs.writeFileSync("user-data.json", JSON.stringify(data));

    // Close the readline interface
    rl.close();
  } else {
    // Otherwise, print an error message and prompt the user for the save button text again
    console.log("Invalid input. Please try again.");
    rl.prompt();
  }
}


function displayDataScreen() {
  // Read the user-info.json file and parse the JSON data
  const userData = JSON.parse(fs.readFileSync("user-data.json"));

  // Print the entire object using console.dir()
  console.dir(userData, { depth: null });
}




function displayExitScreen() {
    // Read the screens.json file and parse the JSON data
    const screens = JSON.parse(fs.readFileSync("screens.json"));
  
    // Get the exit screen data
    const exitScreen = screens["exit"];
  
    // Print the exit screen message
    console.log(colors.rainbow(`${exitScreen.content}`));
  
    // Prompt the user for their response
    rl.question("Do you want to close the program? (yes/no): ", (response) => {
      // Check if the user wants to close the program
      if (response.trim().toLowerCase() === "yes") {
        // Close the readline interface
        rl.close();
      }
    });
  }


function run() {
    // Continuously prompt the user for the screen they want to display
    while (true) {
      // display the welcome screen
      console.clear();
      displayWelcomeScreen();
  
      // Prompt the user for the screen Id
      rl.question("Enter the name of the screen you want to display: ", async (screenId) => {
        switch (screenId) {
          case "welcome":
            console.clear();
            displayWelcomeScreen();
            break;
          case "form":
            console.clear();
            displayFormScreen();
            break;
          case "exit":
            console.clear();
            displayExitScreen();
            break;
        case "viewData":
            console.clear();
            displayDataScreen();
            break;
          default:
            console.log("Invalid screen id.");
            break;
        }
      });
      break;
    }
  }

module.exports = {
    run,
    displayWelcomeScreen,
    displayFormScreen,
    displayDataScreen,
    displayExitScreen,
    
}


