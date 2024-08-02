-- view all departments
SELECT department.id, department.name FROM department;

-- view all roles
SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;

-- view all employees
SELECT employee.id, CONCAT(employee.rank, ' ', employee.first_name, ' ', employee.last_name) AS name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;

-- add department
INSERT INTO department VALUES (${deptInput});

-- add a role
roleInputs = `${roleTitle}, ${roleSalary}, ${roleDept}`
INSERT INTO role VALUES ($(roleInputs));