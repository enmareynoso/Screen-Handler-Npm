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

function displayFormScreen() {
    // Read the screens.json file and parse the JSON data
    const screens = JSON.parse(fs.readFileSync("screens.json"));
  
    // Get the form screen data
    const formScreen = screens["form"];
  
    // Print the form screen title and content
    console.log(formScreen.title);
    console.log(formScreen.content);
  
    // Define an object to store the user's form data
    const userData = {};
  
    // Loop through the form fields
    for (const field of formScreen.fields) {
      // Prompt the user for the field's value
      rl.question(`${field.name}: `, (value) => {
        // Store the user's input in the userData object
        userData[field.name] = value;

        rl.question(`${field.Last}`)

        
  
        // Check if we have processed all of the form fields
        if (Object.keys(userData).length === formScreen.fields.length) {
          // Print the save button message
          console.log(`\nTo save your data, type "${formScreen.saveButton.text}" and press enter.`);
  
          // Listen for the user's response
          rl.on("line", (input) => {
            if (input.trim().toLowerCase() === formScreen.saveButton.text.toLowerCase()) {
              // Save the user data to a JSON file
              fs.writeFileSync("user-data.json", JSON.stringify(userData));
  
              // Close the readline interface
              rl.close();
            }
          });
  
          // Prompt the user for input
          rl.prompt();
        }
      });
    }
  }


function displayDataScreen() {
    // Read the screens.json file and parse the JSON data
    const screens = JSON.parse(fs.readFileSync("screens.json"));
  
    // Get the data screen data
    const dataScreen = screens["data"];
  

    console.log(dataScreen.content);
  
    // Check if the user-data.json file exists
    if (fs.existsSync("user-data.json")) {
      // Read the user data from the file and parse the JSON data
      const userData = JSON.parse(fs.readFileSync("user-data.json"));
  
      // Loop through the user data object and print each field
      for (const [key, value] of Object.entries(userData)) {
        console.log(`${key}: ${value}`);
      }
    } else {
      // Print the no data message
      console.log(dataScreen.noDataMessage);
    }
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
      rl.question("Enter the name of the screen you want to display: ", (screenId) => {
        //check if the screen id is valid
        if (screenId === "welcome" || screenId === "form" ||screenId === "viewData" || screenId === "exit") {
          if (screenId === "welcome") {
            console.clear();
            displayWelcomeScreen();
          } else if (screenId === "form") {
            console.clear();
            displayFormScreen();
          } else if (screenId === "exit") {
            console.clear();
            displayExitScreen();
          }else if (screenId === "viewData"){
            console.clear();
            displayDataScreen();
          }
        } else {
          console.log("Invalid screen id.");
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


