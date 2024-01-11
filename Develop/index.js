// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');




function getLicense(value) {
    if (value === "GNU GPLv3") {
        return "[![License: GNU GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    }
}

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project title?",
    },
    {
       type: "input",
       name: "description" ,
       message: "Enter a description for your project.",
    },
    {
        type: "input",
        name: "installation",
        message: "Enter installation instructions for your project.",
    },
    {
        type: "input",
        name: "usage",
        message: "Enter project usage instructions.",
    },
    {
        type: "input",
        name: "contribution",
        message: "How can others contribute?",
    },
    {
        type: "input",
        name: "test",
        message: "Enter instructions for testing project.",
    },
    {
        type: "list",
        name: "license",
        message: "Select a license for your project.",
        choices: [
            "GNU GPLv3",
            "Apache 2.0",
            "MIT",
        ],
    },
       // github user and email
       {
        type: "input",
        name: "userName",
        message: "What is your Github username?",
       },
       {
        type: "input",
        name: "userEmail",
        message: "What is your Github email address?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Please enter a valid email.";
            }
        },
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, ""));
        data.getLicense = getLicense(data.license);
        writeToFile("README.md", data);
    });
}


// Function call to initialize app
init();
