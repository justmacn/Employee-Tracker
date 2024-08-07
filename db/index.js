// require the connection to the db
const pool = require('./connection');

// database class to access SQL db in JS
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
  selectDepartments() {
    return this.query(`
  SELECT
    department.id, department.name
  FROM department;
  `)}

  // selects all roles w/ department
  selectRoles() {
    return this.query(`
  SELECT 
    role.id, 
    role.title AS job_title, 
    department.name AS department, 
    role.salary 
  FROM role 
  JOIN department ON role.department_id = department.id;
  `)}

  // selects all employees w/ role + department
  selectEmployees() {
    return this.query(`
  SELECT 
    employee.id, 
    CONCAT(employee.rank, ' ', employee.first_name, ' ', employee.last_name) AS name, 
    role.title AS job_title, 
    department.name AS department, 
    role.salary, 
    employee.manager_id AS manager 
  FROM employee 
  JOIN role ON employee.role_id = role.id 
  JOIN department ON role.department_id = department.id;
  `)}

  // inserts a new department into table
  insertDepartment(departmentName) {
    return this.query(`
  INSERT INTO 
    department(name) 
  VALUES ($1);`, [departmentName]
  )}

  //inserts a new role into table
  insertRole(role) {
    const { title, salary, department_id} = role
    return this.query(`
  INSERT INTO 
    role(title, salary, department_id) 
  VALUES ($1, $2, $3);`, [title, salary, department_id]
  )}

  //inserts a new employee into table
  insertEmployee(employee) {
    const { rank, first_name, last_name, role_id, manager_id} = employee
    return this.query(`
  INSERT INTO 
    employee(rank, first_name, last_name, role_id, manager_id) 
  VALUES ($1, $2, $3, $4, $5);`, [rank, first_name, last_name, role_id, manager_id]
  )}

  //updates an employee role from the table
  updateEmployee(employeeId, roleId, managerId) {
    return this.query(`
  UPDATE 
    employee 
  SET role_id = $1, manager_id = $2 
  WHERE id = $3;`, [roleId, managerId, employeeId]
  )}
}

module.exports = new DB()