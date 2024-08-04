// require modules
const { prompt } = require("inquirer");
const db = require('./db/index');
const logo = require('asciiart-logo');
const colors = require('colors/safe');

// call init function
init();

// initialize the app
function init() {
    // branded logo for application using asciiart package
    const brand = logo({ name: 'U S S Discovery' }).render()
    // display logo in terminal w/ app
    console.log(colors.blue(brand));
    console.log(colors.blue(colors.italic(`  The USS Discovery Crew Database:\n`)))
    // call the app function
    runPrompts();
}

// run the app prompts
function runPrompts() {
    // console.log('\n')
    prompt([
        {
            type: "list",
            name: "selected",
            message: colors.red("STATE YOUR PURPOSE:"),
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
                    value: "UPDATE_EMPLOYEE",
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
    // query to select all departments and return as table
    db.selectDepartments()
        .then(({ rows }) => {
            let allDepartments = rows;
            console.table(allDepartments);
        }).then(() => runPrompts());
}

// view all roles from db
function viewAllRoles() {
    // query to select all roles and return as table
    db.selectRoles()
        .then(({ rows }) => {
            let allRoles = rows;
            console.table(allRoles);
        }).then(() => runPrompts());
}

// view all employees from db
function viewAllEmployees() {
    // query to select all employees and return as table
    db.selectEmployees()
        .then(({ rows }) => {
            let allEmployees = rows;
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
        // query to add new department to table
        db.insertDepartment(departmentName)
            .then(() => console.log(colors.green(colors.italic(`New department [${departmentName}] was added to the database!\n`))))
    }).then(() => runPrompts());
}

// add role to db
function addRole() {
    // query to select all departments
    db.selectDepartments()
        .then(({ rows }) => {
            let allDepartments = rows;
            const departmentList = allDepartments.map(({ id, name }) => ({
                name: name,
                value: id,
            }));
            
            // follow up prompt questions
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
                // query to add new role to role table
                db.insertRole(role)
                    .then(() => console.log(colors.green(colors.italic(`New role [${role.title}] was added to the database!\n`))))
                    .then(() => runPrompts());
            });
        });
}

// add employee to db
function addEmployee() {
    // array of ranks
    const rankList = [
        "Admiral",
        "Captain",
        "Commander",
        "Lt. Commander",
        "Lieutenant",
        "Lieutenant JG",
        "Ensign"
    ]

    // query to select all rows and declare them as variable
    db.selectRoles().then(({ rows }) => {
        let allRoles = rows;
        const rolesList = allRoles.map(({ id, job_title }) => ({
            name: job_title,
            value: id,
        }));

    // query to select all employees and declare them as variable
    db.selectEmployees().then(({ rows }) => {
        let allEmployees = rows;
        const managersList = allEmployees.map(
            ({ id, name }) => ({
                name: name,
                value: id,
            })
        );
    
    // prompt follow up questions
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
        // declare response as individual variables
        let firstName = res.first_name;
        let lastName = res.last_name;
        let rank = res.rank

            prompt({
                type: "list",
                name: "role_id",
                message: "Select the crew member's role:",
                choices: rolesList,
            }).then((res) => {
                let roleId = res.role_id;

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
                        // query to add new employee to table
                        db.insertEmployee(newEmployee);
                    }).then(() =>
                        console.log(colors.green(colors.italic(`New crew member [${rank} ${firstName} ${lastName}] was added to the database!\n`)))
                    ).then(() => runPrompts());
                });
            });
        });
    });
}

// update employee in db
function updateEmployee() {
    //query to select all employess and declare as variable
    db.selectEmployees().then(({ rows }) => {
      let allEmployees = rows;
      const employeesList = allEmployees.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

    // query to select all roles and return as variable
    db.selectRoles().then(({ rows }) => {
    let allRoles = rows;
    const rolesList = allRoles.map(({ id, job_title }) => ({
        name: job_title,
        value: id,
      }));

      // prompt follow up questions
      prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select the crew member who's role you want to update:",
          choices: employeesList,
        },
      ]).then((res) => {
        let employeeId = res.employee_id;
  
          prompt([
            {
              type: "list",
              name: "role_id",
              message:
                "Select the role you want to assign to this crew member:",
              choices: rolesList,
            },
            {
              type: "list",
              name: "manager_id",
              message:
                "Select the manager of the newly assigned role:",
              choices: employeesList,
            },
          ]).then((res) => {
            let roleId = res.role_id;
            let managerId = res.manager_id;
            
            // query to update the employee in the db
            db.updateEmployee(employeeId, roleId, managerId)})
            .then(() => console.log(colors.green(colors.italic(`Crew member [id:${employeeId}] has been updated in the database!\n`))))
            .then(() => runPrompts());
        });
      });
    });
  }

// close the app
function quit() {
    console.log(colors.blue(colors.italic(`Live Long and Propser `))+'🖖\n');
    process.exit();
  }