# Screen handler package 📦

This package consists of several functions for displaying different screens and interacting with the user through the command line.


# Install package

To install the package, you need to open the terminal of your code editor and run the following command:

      npm install screen-handler-arch

# Dependecies

The following dependencies are used in this application:

-   `readline`: Node module for creating a readline interface to allow user input through the command line
-   `fs`: Node module for reading and writing to files
-   `colors`: for adding color to the console output
- `screen.json`: JSON file that displays the screens used on the package

  

## Install node dependecies

This package is a Node JS application, in order for dependencies to work you'll need to install Node JS. Here are some links to help you install Node JS on your machine:

**MacOS**🍎

[How to Install Node.js and NPM on Mac {Step-b-Step} (phoenixnap.com)](https://phoenixnap.com/kb/install-npm-mac)
[Install Node.js and npm using Homebrew on OS X and macOS |> Changelog](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x)

**Windows**🪟

[How to Install Node.js and NPM on Your Windows System (phoenixnap.com)](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
[How to Download & Install Node.js and NPM on Windows (guru99.com)](https://www.guru99.com/download-install-node-js.html)

When npm is installed on your machine, run the following command to install the last dependencie ***Colors.js***

     npm install colors
                       


## JSON file

In order to this package to work on the user machine, the `screens.json` file is necessary.

Copy this object and save it as screens.json on your working path:

    {
    
    "welcome":  {
    
    "content":  "Welcome to the screen handler package, screens: [form], [viewData], [exit]. Type the name of the screen to navigate."
    
    },
    
    "form":  {
    
    "title":  "Form Screen",
    
    "content":  "Please enter your information below.",
    
    "fields":  [
    
    {
    
    "name":  "Name",
    
    "type":  "text"
    
    },
    
    {
    
    "name":  "Last Name",
    
    "type":  "text"
    
    },
    
    {
    
    "name":  "Age",
    
    "type":  "number"
    
    },
    
    {
    
    "name":  "Occupation",
    
    "type":  "text"
    
    }
    
    ],
    
    "saveButton":  {
    
    "text":  "Save"
    
    }
    
    },
    
    "viewData":  {
    
    "title":  "Data Screen",
    
    "content":  "This is the data screen. Your previously saved data is shown below."
    
    },
    
    "exit":  {
    
    "title":  "Exit Screen",
    
    "content":  "Thank you for using the screen handler package,Goodbye"
    
    }
    
    }

> **Note:** Saving the ***screens.json*** file as another name will make the package functionalities not work as intended.





# Functionality

The main functionality of this application is organized into the following functions:
### `displayWelcomeScreen()`

This function displays the welcome screen to the user.

### `displayFormScreen()`

This function displays a form screen to the user, prompts them for input, and saves their input to a file.

### `displayDataScreen()`

This function displays the data stored in a file to the user, allows the user to delete an item from the data, and updates the file with the modified data.

### `displayExitScreen()`

This function displays an exit screen to the user and prompts them to close the program.

### `run()`

This function  prompts the user for the screen they want to display and displays the corresponding screen.

## Screens

The content for each screen is stored in a `screens.json` file, which is a JSON object with four properties: `welcome`, `form`, `viewData`, and `exit`. Each property corresponds to a screen and contains the following fields:

-   `content`: a string that is displayed to the user when the screen is displayed
-   `fields` (for the `form` screen only): an array of objects, each representing a field in the form. Each field object has a `name` property that is displayed to the user as a prompt for input and a `type` property that specifies the type of input (e.g. "text", "email", etc.).
-   `saveButton` (for the `form` screen only): an object with a `text` property that specifies the text that the user must type and press enter to save their data.
-   `viewData` (for the `viewData` screen only): an object with a `content` property that is displayed to the user when the screen is displayed.


## Data storage

The program stores data collected from the user in a `user-data.json` file using the `fs` module. The file is a JSON array of objects, each representing a set of data collected from the user.

To read the contents of the `user-data.json` file, the program uses the `readFileSync()` method of the `fs` module, which reads the file and returns the contents as a string. The contents are then parsed into a JavaScript object using the `JSON.

## Input and output

The program prompts the user for input and displays output through the command line using the `readline` module. The `colors` module is used to add color to the output.

The program reads and writes data to a `user-data.json` file using the `fs` module.



## Error handling


The program handles errors in the following ways:

-   If the `user-data.json` file does not exist when the `displayDataScreen()` function is called, the function displays an error message indicating that the file cannot be read.
-   If the user's input on the `form` screen does not match the `text` field of the `saveButton` object, the function displays an error message and prompts the user to try again.
-   If the user enters an invalid index on the `viewData` screen, the function displays an error message and prompts the user to try again.
-   If the user enters an invalid screen name on the main screen, the function displays an error message and prompts the user to try again.



# Steps to use the package 


1.  Install Node.js on your computer if it is not already installed.
2.  Crete the `screens.json` and `index.js` files to a local directory.
3.  Open a terminal and navigate to the directory where the files are stored.
4. Run the command `npm init` to initialize the project and create a `package.json` file and `node_modules` folder.

5.  Install the required dependencies by running the commands mentioned on the ***Dependecies*** section.
6.  In the `index.js` file, add the following line at the top of the file to import the package methods `const  screenHandler  =  require('screen-handler')` (the `const screenHandler` name can be replaced with a name the user choose)
7.  Run the command `node index.js` to start the application.
8.  The application will display the welcome screen, which provides information about the program and instructions for the user.
9.  From the main menu, select the screen you want to display by entering the corresponding screen name and pressing enter. The available screen names are: `form`, `data`, and `exit`.
10.  If you select the `form` screen, the application will display a form and prompt you for input for each field. When you have finished entering your input, type the `save` button text and press enter to save your data.
11.  If you select the `data` screen, the application will display the data stored in the `user-data.json` file. You can delete an item from the data by entering its index and pressing enter.
12.  If you select the `exit` screen, the application will display an exit screen and prompt you to close the program.

### Considerations
-   Make sure you have installed Node.js on your computer before running the application.
-   The `screens.json` file and the `index.js` file must be in the same directory for the application to work correctly.

-   When entering data on the `form` screen, make sure to type the `save` button text exactly as it is displayed and press enter to save your data.
-   When deleting data on the `data` screen, make sure to enter a valid index (a positive integer) of an item in the data. If the index is invalid, an error message will be displayed.
-   When closing the program on the `exit` screen, make sure to type "yes" and press enter to confirm that you want to close the program.

- Make sure the name of the JSON files generated from the package stays with the same name, changing the JSON file name **will make the package not work properly**