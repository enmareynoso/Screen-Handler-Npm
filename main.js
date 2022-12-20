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
const welcomeScreen = screens['welcome'];

console.log(colors.magenta(`${welcomeScreen.content}`))
}




async function displayFormScreen() {

  const screens = JSON.parse(fs.readFileSync("screens.json"));
  const formScreen = screens["form"];

  console.log(colors.blue(formScreen.content));

  const userData = {};

  for (const field of formScreen.fields) {
      userData[field.name] = await new Promise((resolve) => {
      rl.question(`${field.name}: `, resolve);
    });
  }

  console.log(colors.bgGreen(`\nTo save your data, type "${formScreen.saveButton.text}" and press enter.`));

  const saveButtonText = await new Promise((resolve) => {
    rl.question(`${formScreen.saveButton.text}: `, resolve);
  });

  if (saveButtonText.trim().toLowerCase() === formScreen.saveButton.text.toLowerCase()) {
    let data;
    try {
      data = fs.readFileSync("user-data.json");
      data = JSON.parse(data);
    } catch (error) {
      data = [];
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    data.push(userData);

    fs.writeFileSync("user-data.json", JSON.stringify(data));

    rl.close();
  } else {
    console.log("Invalid input. Please try again.");
    rl.prompt();
  }
}


function displayDataScreen() {

    // check if the file exists
    if (!fs.existsSync('user-data.json')) {
      console.log(colors.bgRed('⚠ Unable to read json file, please enter data on the form screen first'));
      return;  // exit the function
    }

  const screens = JSON.parse(fs.readFileSync('./screens.json'));
  const viewData = screens["viewData"]
  const userData = JSON.parse(fs.readFileSync("user-data.json"));


  console.log(colors.bgMagenta(`${viewData.content}`))
  if (userData.length === 0) {
    console.log(colors.bgYellow("No data available on user-data.json"));
  } else {
    userData.forEach((object, index) => {
    console.log(`${index}: ${JSON.stringify(object)}`);
    });

      rl.question("Enter the index of the object if you want to delete it [i]:", (index) => {
      userData.splice(index, 1);

      fs.writeFileSync("user-data.json", JSON.stringify(userData));

      rl.close();
    });
  }
}



function displayExitScreen() {
    const screens = JSON.parse(fs.readFileSync("screens.json"));
    const exitScreen = screens["exit"];
 
    console.log(colors.rainbow(`${exitScreen.content}`));
  
    rl.question("Do you want to close the program? (yes/no): ", (response) => {
      if (response.trim().toLowerCase() === "yes") {
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


