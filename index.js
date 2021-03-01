const inquirer = require("inquirer");
let Database = require("./async-db");
let cTable = require("console.table");
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "zoha",
    password: "zoha",
    database: "wee"});
 

// it will provide id of role//
async function idofrole(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}
// it will provide if of employee//

async function idofemployee(fullName) {
  
    let employee = name(fullName);

    let query = 'SELECT id FROM employee WHERE employee.firstname=? AND employee.lastname=?';
    let args=[employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}
// it will provide the name of the employee//
async function nameofemployee() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.firstname + " " + employee.lastname);
    }
    return employeeNames;
}
// it will provide showrole //
async function showrole() {
    console.log("");
   
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}
// it will show department //
async function showdepartment() {
   

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}
// it will shot employee//
async function showemployee() {
    console.log("");

   
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}
// it will show department of employee//
async function showempdepartment() {
  
    console.log("");
    let query = "SELECT firstname, lastname, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

// it will provide full name //
function name( fullName ) {
    
    let employee = fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
        firstname = firstname + employee[i] + " ";
    }
    return [firstname.trim(), lastname];
}
// it will will provide change of the employee role//
async function changeemployeerole(employeeInfo) {
    
    const roleId = await idofrole(employeeInfo.role);
    const employee = name(employeeInfo.employeeName);

    let query = 'UPDATE employee SET roleid=? WHERE employee.firstname=? AND employee.lastname=?';
    let args=[roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}
// it will add employee //
async function addEmployee(employeeInfo) {
    let roleId = await idofrole(employeeInfo.role);
    let managerId = await idofemployee(employeeInfo.manager);

    
    let query = "INSERT into employee (firstname, lastname, roleid, managerid) VALUES (?,?,?,?)";
    let args = [employeeInfo.firstname, employeeInfo.lastname, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.firstname} ${employeeInfo.lastname}.`);
}
// it will remove employee //
async function removeEmployee(employeeInfo) {
    const employeeName = name(employeeInfo.employeeName);
    
    let query = "DELETE from employee WHERE firstname=? AND lastname=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}
// it will add department //
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}
// it will add role //
async function addRole(roleInfo) {
    
    const departmentId = await idofdepartment(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (pages, sal, department_id) VALUES (?,?,?)';
    let args = [pages, sal, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${title}`);
}
// it will add main prompt//

async function mainPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What your choice please select ?",
                name: "action",
                choices: ["Add department","Add employee", "Add role","Remove employee","Update employee role","View all departments","View all employees","View all employees by department","View all roles","Exit" ]
            }])}
// it will add employee information //
async function getAddEmployeeInfo() {
    const managers = await nameofmanager();
    const roles = await showrole();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "Enter employee first name"
            },
            {
                type: "input",
                name: "lastname",
                message: "Enter employee last name"
            },
            {
                type: "list",
                message: "Enter role of employee",
                name: "role",
                choices: [
                    
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Enter employee manager name",
                name: "manager",
                choices: [
                  
                    ...managers
                ]
            }
        ])
}
// it will get remove employee information //
async function getRemoveEmployeeInfo() {
    const employees = await nameofemployee();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Enter employee name which you want to remove",
            name: "employeeName",
            choices: [
               
                ...employees
            ]
        }
    ])
}
// it will get department info//
async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter department name",
            name: "departmentName"
        }
    ])
}
// it will get role info //
async function getRoleInfo() {
    const departments = await nameofdepartment();
    return inquirer
    .prompt([
        {
            type: "input",
            message: "Enter title role",
            name: "roleName"
        },
        {
            type: "input",
            message: "Enter salary of role",
            name: "salary"
        },
        {
            type: "list",
            message: "Enter department use role",
            name: "departmentName",
            choices: [
                
                ...departments
            ]
        }
    ])
}
// it will get update employee role infor//
async function getUpdateEmployeeRoleInfo() {
    const employees = await nameofemployee();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {type: "list",
                message: "Update employee infomation",
                name: "employeeName",
                choices: [
                   
                    ...employees
                ]},
            {type: "list",
                message: "Enter employee new role",
                name: "role",
                choices: [   ...roles]}])}

async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await mainPrompt();switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;}case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;}case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;}case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
                break;}case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await changeemployeerole(employee);
                break;}case 'View all departments': {
                await showdepartment();
                break;}case 'View all employees': {
                await shoeemployee();
                break;}case 'View all employees by department': {
                await shoeempdepartment();
                break; }case 'View all roles': {
                await showrole(); break;}case 'Exit': {
                exitLoop = true;
                process.exit(0); 
                return;}}}}


process.on("exit", async function(code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();

