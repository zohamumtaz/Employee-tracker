USE wee;

INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("MARKETING");
INSERT into department (name) VALUES ("DESIGN");
INSERT into department (name) VALUES ("CONTENT");
INSERT into role (pages, sal, department_id) VALUES ("IT manager", 9866, 1);
INSERT into role (pages, sal, department_id) VALUES ("IT person", 5000, 1);
INSERT into role (pages, sal, department_id) VALUES ("Marketing ManageR", 100000, 2);
INSERT into role (pages, sal, department_id) VALUES ("content", 90000, 2);
INSERT into employee (firstname, lastname, roleid, managerid) VALUES ("oliy", "tty", 1, null);
INSERT into employee (firstname, lastname, roleid, managerid) VALUES ("sjal", "ali", 2, 1);
INSERT into employee (firstname, lastname, roleid, managerid) VALUES ("Dale", "Carnegie", 2, 1);
INSERT into employee (firstname, lastname, roleid, managerid) VALUES ("ahmed", "khan", 4, null);
INSERT into employee (firstname, lastname, roleid, managerid) VALUES ("alina", "alina", 4, 3);
