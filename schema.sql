DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE database employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT auto_increment NOT NULL,
    department_name VARCHAR(30),
    primary key(id)
  
);
CREATE TABLE employee_role (
  id INT auto_increment NOT NULL,
  title VARCHAR(30),
  salary int,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN Key (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT auto_increment  NOT NULL,
  first_name VARCHAR (30),
  last_name VARCHAR(30),
  role_id INT,
 PRIMARY KEY (id),
 FOREIGN KEY (role_id) REFERENCES employee_role(id)

);
insert into department(department_name) values("coaching"), ("training"), ("assisting");
insert into employee_role (title,salary, department_id) values ("coach",10000, 1), ("trainer", 7000, 2), ("assistant", 4000,3);
insert into employee (first_name, last_name, role_id) values ("John", "Danaher", 1), ("Gordon", "Ryan",2), ("Gary", "Tonon",3);
select employee.first_name, employee_role.title from employee inner join employee_role on employee.role_id = employee_role.id where title = "coach";
select * from employee_role;
select * from department;
select * from employee;