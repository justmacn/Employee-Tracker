// require the connection to the db
const pool = require('./connection');

// Database class to build SQL db in JS
class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // selects all departments 
  viewAllDepartments() {
    return this.query(
      'SELECT department.id, department.name FROM department;')
  }

  // selects all roles w/ department
  viewAllRoles() {
    return this.query(
      'SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;')
  }

  // selects all employees w/ role + department
  viewAllEmployees() {
    return this.query(
      'SELECT employee.id, CONCAT(employee.rank, " ", employee.first_name, " ", employee.last_name) AS name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;')
  }

}