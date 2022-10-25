INSERT INTO department (names)
VALUES
    ('ENGINEERING'),
    ('FINANCE'),
    ('SALES'),
    ('LEGAL');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 2),  
    ('Lead Engineer', 150000, 3),
    ('Software Engineer', 120000, 4),
    ('Account Manager', 160000, 5),
    ('Accountant', 125000, 6),
    ('Legal Team Lead', 250000, 7),
    ('Lawyer', 190000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Clark', 'Griswold', 1, NULL),
    ('Ellen', 'Griswold', 7, NULL),
    ('Rusty', 'Griswold', 5, 7),
    ('Audrey', 'Griswold', 4, 7),
    ('Cousin', 'Eddie', 2, 1),
    ('Aunt', 'Edna', 6, 7);
