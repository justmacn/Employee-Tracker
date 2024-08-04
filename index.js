// require modules
const { prompt } = require("inquirer");
const DB = require('./db/index');
const logo = require('asciiart-logo');
const { type } = require("os");

// declare DB class as a variable
const db = new DB()

// call init function
init();

// initialize the app
function init() {
    // branded logo for application using asciiart package
    const brand = logo({ name: 'USS Discovery (NCC-1031)' }).render()
    // display logo in terminal w/ app
    console.log(brand);
    // call the app function
    runPrompts();
}

// run the app prompts
function runPrompts() {
    console.log('The USS Discovery Crew Database')
    prompt([
        {
            type: "list",
            name: "selected",
            message: "State your purpose:",
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
        // call the appropriate query depending on what the user chose
        switch (userInput) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
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

// view all departments from db
function viewAllDepartments() {
    db.selectDepartments()
        .then(({ rows }) => {
            let allDepartments = rows;
            console.table("\n" + allDepartments);
        }).then(() => runPrompts());
}

// view all roles from db
function viewAllRoles() {
    db.selectRoles()
        .then(({ rows }) => {
            let allRoles = rows;
            console.log("\n");
            console.table(allRoles);
        }).then(() => runPrompts());
}

// view all employees from db
function viewAllEmployees() {
    db.selectEmployees()
        .then(({ rows }) => {
            let allEmployees = rows;
            console.log("\n");
            console.table(allEmployees);
        }).then(() => runPrompts());
}

// add department to db
function addDepartment() {
    prompt([
        {
            name: "name",
            message: "Enter the department name:",
        },
    ]).then((res) => {
        let departmentName = res.name;
        db.insertDepartment(departmentName)
            .then(() => console.log(`New department (${departmentName}) was added to the database!`))
    }).then(() => runPrompts());
}

// add role to db
function addRole() {
    db.selectDepartments()
        .then(({ rows }) => {
            let allDepartments = rows;
            const departmentList = allDepartments.map(({ id, name }) => ({
                name: name,
                value: id,
            }));

            prompt([
                {
                    name: "title",
                    message: "Enter the name of the role:",
                },
                {
                    name: "salary",
                    message: "Enter the salary of the role:",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Select the department this role will belong to:",
                    choices: departmentList,
                },
            ]).then((role) => {
                db.insertRole(role)
                    .then(() => console.log(`New role (${role.title}) was added to the database!`))
                    .then(() => runPrompts());
            });
        });
}

// add employee to db
function addEmployee() {
    const rankList = [
        "Admiral",
        "Captain",
        "Commander",
        "Lt. Commander",
        "Lieutenant",
        "Lieutenant JG",
        "Ensign"
    ]

    prompt([
        {
            name: "first_name",
            message: "Enter the crew member's first name:",
        },
        {
            name: "last_name",
            message: "Enter the crew member's last name:",
        },
        {
            type: "list",
            name: "rank",
            message: "Select the crew member's rank:",
            choices: rankList
        },
    ]).then((res) => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        let rank = res.rank

        db.selectRoles().then(({ rows }) => {
            let allRoles = rows;
            const rolesList = allRoles.map(({ id, title }) => ({
                name: title,
                value: id,
            }));
            prompt({
                type: "list",
                name: "role_id",
                message: "Select the crew member's role:",
                choices: rolesList,
            }).then((res) => {
                let roleId = res.role_id;

                db.selectEmployees().then(({ rows }) => {
                    let allEmployees = rows;
                    const managersList = allEmployees.map(
                        ({ id, rank, first_name, last_name }) => ({
                            name: `${rank} ${first_name} ${last_name}`,
                            value: id,
                        })
                    );
                    prompt({
                        type: "list",
                        name: "manager_id",
                        message: "Select the crew member's manager:",
                        choices: managersList,
                    }).then((res) => {
                        let managerId = res.manager_id
                        let newEmployee = {
                            rank: rank,
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: managerId,
                        };

                        db.insertEmployee(newEmployee);
                    }).then(() =>
                        console.log(`New crew member (${rank} ${firstName} ${lastName}) was added to the database!`)
                    ).then(() => runPrompts());
                });
            });
        });
    });
}