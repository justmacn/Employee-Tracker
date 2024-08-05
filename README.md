# Employee Tracker <div style="float: right;">![App](https://img.shields.io/badge/Language-Javascript-red.svg) ![App](https://img.shields.io/badge/Database-PostgreSQL-blue.svg) ![App](https://img.shields.io/badge/Enviornment-Node.js-pine.svg)</div>

## Description

Employee Tracker is a command line application that will create and manage a database of employees for a given company, using backend logic with Node.js and postgreSQL. 

This app utilizies the inquirer npm package to prompt users with options to navigate and query the database. Users are able to view all departments, roles, and employees as separate tables. For new data entries, users can add new departments, roles, and/or employees to the database. Newly added entries can then be instantly viewed with the available 'view all' options. 

Once finished, users can quit the application with the provided option, which will return a friendly goodbye message as the app closes.

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Links](#links)

- [Contacts](#contact)

## Installation

This application uses the following npm dependencies:
- [inquirer @8.2.4](https://www.npmjs.com/package/inquirer) 

- [pg](https://www.npmjs.com/package/pg)

- [colors](https://www.npmjs.com/package/colors)

- [ASCII art logo](https://www.npmjs.com/package/asciiart-logo)

---

To run the application:
1. Clone the repo

2. Install the npm packages: `npm i`

3. Connect to db: `npm run sql`
    - Initiates the postgres login (defaulted to db user 'postgres')

4. Initiate the employee_db and tables: `\i db/schema.sql`

5. Seed the tables: `\i db/seeds.sql`

6. Exit postgres: `\q`

7. Run app: `npm start`

## Usage

This cli application can be used to generate and manage an employee database of any size. Employees can be tracked across departments, job roles, and their respective managers. Future features will include removing items and sorting employees by category.

### Mock-up

https://github.com/user-attachments/assets/a332723c-8cc0-48f5-8c17-1b583b61edc2
<div style="text-align: center; font-style: italic;">Demo</div>


## Links
Find the project repository below:

- [Project Repository](https://github.com/justmacn/Employee-Tracker)

## Contacts

For any additional questions you can contact me at:

- Github: [Justmacn](https://github.com/Justmacn)

- Email: 172618812+justmacn@users.noreply.github.com
