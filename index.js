// require modules
const { prompt } = require("inquirer");
const DB = require('./db/index');
const logo = require('asciiart-logo');

// declare DB class as a variable
const db = new DB()

// function to initialize the app
function init() {
    // branded logo for application using asciiart package
    const brand = logo({name: 'USS Discovery (NCC-1031)'}).render()
    // display logo in terminal w/ app
    console.log(brand);
    // call the app function
    appPrompts();
}

// function to run the app prompts
function appPrompts() {

}