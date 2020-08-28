const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

const connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  
  user: "root",

  
  password: "Mmasm&a4f6d5!",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  beginTracker();
});

function beginTracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments, Roles, and Employees",
        "Update Employee Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View Departments, Roles, and Employees":
        viewTables();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What is the name of the department you'd like to add?"
    })
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.departmentName,
          
        },
        function(err, res) {
          if (err) throw err;
          console.table(res);
          
          
          
          
        }
        
        );
        
        
        beginTracker()
      
    });
}
function addEmployee() {
  inquirer
    .prompt([{
      name: "employeeFirstName",
      type: "input",
      message: "What is the first name of the employee you'd like to add?",
    },
    
    {
      name: "employeeLastName",
      type: "input",
      message: "What is the last name of the employee you'd like to add?"
    },
    {
      name: "employeeRoleId",
      type: "input",
      message: "What is the role id of this employee?",
    }

  ])
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRoleID
          
        },
        function(err, res) {
          if (err) throw err;
          console.table(res);
          
        }
      );
      beginTracker();
      
    });
    
}
function addRole() {
  inquirer
    .prompt([
      {
      name: "roleTitle",
      type: "input",
      message: "What is the title of the role you'd like to add?"
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is the salary of the role you'd like to add?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "departmentID",
      type: "input",
      message: "What is the department ID of the role you'd like to add?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO employee_role SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.departmentID
          
        },
        function(err, res) {
          if (err) throw err;
          console.table(res)
          
        }
        );
        beginTracker();
      
      
    });
}
function viewTables() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Employees by role",
        "View Employees by department name",
        "View Roles by employee name",
        "View Roles by Department",
        "View Department by Employee Name",
        "View Department by Role"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Employees by role":
        employeeByRole();
        break;

      case "View Employees by department name":
        employeeByDepartment();
        break;

      case "View Roles by employee name":
        roleByEmployee();
        break;

      case "View Roles by Department":
        roleByDepartment();
        break;

        case "View Department by Employee Name":
        departmentByEmployee();
        break;
        
        case "View Department by Role":
        departmentByRole();
        break;
        }
    });
}
function employeeByRole(){
  inquirer
    .prompt({
      name: "employeeRole",
      type: "input",
      message: "What is the role of the employee(s) you'd like to search?"
    })
    .then(function(answer) {
      const query ="SELECT last_name, first_name, title FROM employee INNER JOIN employee_role ON employee.role_id = employee_role.id WHERE ?";
      connection.query(query, {title: answer.employeeRole},function(err, res) {
          if (err) throw err;
          console.table(res);  
        }
      );
      
    
    });
  }


  function employeeByDepartment(){
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "What is the role of the employee(s) you'd like to search?"
      })
      .then(function(answer) {
        const query ="SELECT last_name, first_name, department_name FROM employee INNER JOIN employee_role ON employee.role_id = employee_role.id INNER JOIN department ON employee_role.department_id = department.id WHERE ?";
        connection.query(query, {department_name: answer.departmentName},function(err, res) {
            if (err) throw err;
            console.table(res);
          }
        );
      
      });
    }

    function roleByEmployee(){
      inquirer
        .prompt([{
          name: "employeeLastName",
          type: "input",
          message: "What is the last name of the employee you'd like to search their role?"
        },
        {
          name: "employeeFirstName",
          type: "input",
          message: "What is the last name of the employee you'd like to search their role?"
        }
      ])
        .then(function(answer) {
          const query ="SELECT title, last_name, first_name FROM employee_role INNER JOIN employee ON employee_role.id = employee.role_id  WHERE ?";
          connection.query(query, {last_name: answer.employeeLastName, first_name: answer.employeeFirstName},function(err, res) {
              if (err) throw err;
              console.table(res);
            }
          );
          
        });
      }

      function roleByDepartment(){
        inquirer
          .prompt({
            name: "departmentName",
            type: "input",
            message: "What is the name of the department that the role(s) you're searching for belongs?"
          })
          .then(function(answer) {
            const query ="SELECT title, salary, department_name FROM employee_role INNER JOIN department ON employee_role.id = department.id WHERE ?";
            connection.query(query, {title: answer.departmentName},function(err, res) {
                if (err) throw err;
                console.table(res);
                
              }
            );
          });
        }

        function departmentByEmployee(){
          inquirer
            .prompt({
              name: "employeeLastName",
              type: "input",
              message: "What is the last name of the employee you're searching the department of?"
            })
            .then(function(answer) {
              const query ="SELECT last_name, first_name, department_name FROM employee INNER JOIN employee_role ON employee.role_id = employee_role.id INNER JOIN department ON employee_role.department_id = department.id WHERE ?";
              connection.query(query, {last_name: answer.employeeLastName},function(err, res) {
                  if (err) throw err;
                  console.table(res);
                }
              );
              
            });
          }

          function departmentByRole(){
            inquirer
              .prompt({
                name: "employeeRole",
                type: "input",
                message: "What is the role you'd like to search the department of?"
              })
              .then(function(answer) {
                const query ="SELECT title, department_name FROM employee_role INNER JOIN department ON employee.department_id = employee_role.id = department.id WHERE ?";
                connection.query(query, {title: answer.employeeRole},function(err, res) {
                    if (err) throw err;
                    console.table(res);  
                  }
                );
              });
            }
            function updateEmployeeRole() {
              inquirer
                .prompt([{
                  name: "employeeFirstNameForUpdate",
                  type: "input",
                  message: "What is the first name of the employee whose role is being updated?"
                },
                {
                name: "employeeLastNameForUpdate",
                  type: "input",
                  message: "What is the last name of the employee whose role is being updated?"
                },

                {
                name: "newRole",
                  type: "input",
                  message: "What would you like to update his/her role to?"
                },
                {
                  name: "newSalary",
                    type: "input",
                    message: "What would you like to update his/her salary to?"
                  }

              ])
                .then(function(answer) {
                
                  connection.query(
            "UPDATE employee_role SET ? WHERE ?",
            [
              {
                title: answer.newRole,
                salary: answer.newSalary
              },
              {
                first_name: answer.employeeFirstNameForUpdate,
                last_name: answer.employeeLastNameForUpdate
              }
            ],
            function(err,res) {
              if (err) throw err;
              console.log(res)
                  });
                  
              }

                )}
