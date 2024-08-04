// require modules
const { prompt } = require("inquirer");
const DB = require('./db/index');
const logo = require('asciiart-logo');

// declare DB class as a variable
const db = new DB()

// call init function
init();

// function to initialize the app
function init() {
    // branded logo for application using asciiart package
    const brand = logo({ name: 'USS Discovery (NCC-1031)' }).render()
    // display logo in terminal w/ app
    console.log(brand);
    // call the app function
    runPrompts();
}

// function to run the app prompts
function runPrompts() {
    console.log('The USS Discovery Crew Database')
    prompt([
        {
            type: "list",
            name: "selected",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS",
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "View All Crew",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT",
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE",
                },
                {
                    name: "Add Crew Member",
                    value: "ADD_EMPLOYEE",
                },
                {
                    name: "Update Crew Member's Role",
                    value: "UPDATE_EMPLOYEE_ROLE",
                },
                {
                    name: "Exit Database",
                    value: "QUIT",
                },
            ],
        },
    ]).then((res) => {
        let userInput = res.selected;
        // Call the appropriate function depending on what the user chose
        switch (userInput) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;
            default:
                quit();
        }
    });
}

