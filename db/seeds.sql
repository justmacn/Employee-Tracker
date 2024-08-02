\c employee_db;

INSERT INTO department(name)
VALUES
    ('Command'),
    ('Bridge Crew'),
    ('Security');
    ('Medical'),
    ('Science'),
    ('Engineering');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Commanding Officer', 100000, 1),
    ('First Officer', 85000, 1),
    ('Security Chief', 75000, 3),
    ('Chief Engineer', 80000, 6),
    ('Communications Officer', 65000, 2),
    ('Medical Officer', 90000, 4),
    ('Helmsman', 82500, 2),
    ('Science Officer', 75000, 5),
    ('Tatical Officer', 65000, 2),
    ('Operations Officer', 65000, 2);

INSERT INTO employee(rank, first_name, last_name, role_id, manager_id)
VALUES 
    ('Captian', 'Michael', 'Burnham', 1),
    ('Commander', 'Saru', 'Billy Badass' 2, 1),
    ('Commander', 'Nahn', "" 3, 1),
    ('Lt. Commander', 'Paul', 'Stamets' 4, 2),
    ('Lieutenant JG', 'R.A.', 'Bryce' 5, 2),
    ('Doctor', 'Hugh', 'Culber' 6, 2),
    ('Lieutenant', 'Keyla', 'Detmer' 7, 1),
    ('Lieutenant JG', 'Sylvia', 'Tilly' 8, 2),
    ('Lieutenant', 'Gen', 'Rhys' 9, 2),
    ('Lieutenant JG', 'Joann', 'Owosekun' 10, 2);