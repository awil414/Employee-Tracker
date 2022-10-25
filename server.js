// Import and require packages
//require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { default: ExpandPrompt } = require('inquirer/lib/prompts/expand');

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
    inquirer.prompt ([
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
            viewEmployess();
        } else if (answers.choices === 'Add a department') {  
            addDepartment();
        } else if (answers.choices === 'Add a role') {  
            addRole();
        } else if (answers.choices === 'Add an employee') {  
            addEmployee();
        } else if (answers.choices === 'Update an employee role') { 
            updateEmployee();
        } else if (answers.choices === 'Done!') { 
            EndPrompt();
        }
    });
};
promptUser();

// Function to view all departments
viewDepartments = () => {
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
                INNER JOIN department ON roles.department_id = department.id `;
    db.query(mysql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

// Function to view all employees
const viewEmployees = () => {
    console.log('Viewing all employees...\n');
    const mysql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.names AS department, roles.salary,
                CONCAT(mgr.first_name, mgr.last_name) AS manager
                FROM employee
                INNER JOIN roles ON employee.role_id = roles.id 
                INNER JOIN department ON roles.department_id = department.id
                INNER JOIN employee mgr ON employee.manager_id = mgr.id`;
    db.query(mysql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};