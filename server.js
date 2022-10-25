// Import and require packages
//require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
//const { default: ExpandPrompt } = require('inquirer/lib/prompts/expand');

// Connect to database
const db = mysql.createConnection(
    {
        host: "local",
        user: 'root',
        password: '@Root@66',
        database: 'employee_db',
    },
    console.log('Connected to the employee_db database.')
);

// Function to begin user prompts
const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Done!',
            ],
        },
    ])
        .then((answers) => {
            if (answers.choices === 'View all departments') {
                viewDepartments();
            } else if (answers.choices === 'View all roles') {
                viewRoles();
            } else if (answers.choices === 'View all employees') {
                viewEmployees();
            } else if (answers.choices === 'Add a department') {
                addDepartment();
            } else if (answers.choices === 'Add a role') {
                addRole();
            } else if (answers.choices === 'Add an employee') {
                addEmployee();
            } else if (answers.choices === 'Update an employee role') {
                updateEmployee();
            } else if (answers.choices === 'Done!') {
                endPrompt();
            }
        });
};
promptUser();

// Function to view all departments
const viewDepartments = () => {
    console.log('Viewing all department...\n');
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// Function to view all roles
const viewRoles = () => {
    console.log('Viewing all roles...\n');
    const mysql = `SELECT roles.id, roles.title, department.names AS department
                FROM roles
                LEFT JOIN department ON roles.department_id = department.id `;
    db.query(mysql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// Function to view all employees
const viewEmployees = () => {
    console.log('Viewing all employees...\n');
    const mysql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        roles.title, 
                        department.names AS department, 
                        roles.salary,
                        CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
                    FROM employee
                        LEFT JOIN roles ON employee.role_id = roles.id 
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.query(mysql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// Function to add department to database
const addDepartment = () => {
    console.log('Add department...\n');
    inquirer.propmt([
        {
            type: 'input',
            name: 'names',
            message: 'What department would you like to add?',
        },
    ])
        .then((answer) => {
            const mysql = `INSERT INTO department SET ?`;
            db.query(mysql, answer, (err, res) => {
                if (err) throw err;
                console.log('Added' + answer.names + ' to departments.');

                promptUser();
            });
        });
};

// Function to add a role to database
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What salary would you like to add?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department for this new role.',
        },
    ])
        .then((answer) => {
            const params = [answer.title, answer.salary, answer.department_id];
            const mysql = `INSERT INTO roles SET ?`;
            db.query(mysql, params, (err, res) => {
                if (err) throw err;
                console.log('Added' + answer.title + ' to roles.');

                promptUser();
            });
        });
};

// Function to add employee to database
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter new employee first name.',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter new employee last name.',
        },
        {
            type: 'inpt',
            name: 'role_id',
            message: 'Enter new employee role.',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Who is the employee's manager?",
        },
    ])
        .then((answer) => {
            const mysql = `INSERT INTO employee SET ?`;
            db.query(mysql, answer, (err, res) => {
                if (err) throw err;
                console.log('Added' + answer.first_name + ' into the database.');

                promptUser();
            });
        });
};

// Function to update employee 
const updateEmployee = () => {
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        const employeeData = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));

        db.query(`SELECT * FROM roles`, (err, res) => {
            if (err) throw err;
            const roleData = res.map((role) => ({
                name: `${role.title}`,
                value: role.id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'id',
                    message: 'Which employee would you like to update?',
                    choices: employeeData,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select a role to add to employee update.',
                    choices: roleData,
                },
            ])
                .then((answers) => {
                    const mysql = `UPDATE employee SET role_id=? WHERE id=?`;

                    db.query(mysql, [answer.role_id, answers.id], (err, res) => {
                        if (err) throw err;
                        console.log(res);

                        promptUser();
                    });
                });
        });
    });
};

// Function to end user prompt
const endPrompt = () => {
    console.log('Congratulations! Your database has been successfully updated.');
};