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
