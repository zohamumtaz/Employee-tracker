DROP DATABASE IF EXISTS wee;
CREATE database wee;
USE wee;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(30));

CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id));
  
CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id));
