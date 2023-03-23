const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];
// Manager's detail


let managerDetails = [
  {
    type: 'input',
    name: 'name',
    message: "Please provide the Managers name",
    default(){
        return 'NoName';
    }
  },
  {
    type: 'input',
    name: 'id',
    message: "Please enter your ID",
    default(){
        return 'NoID';
    }
  },
  {
    type: 'input',
    name: 'email',
    message: "Please enter your email",
    default(){
        return 'NoEmail';
    }
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "Please enter your Office Number",
    default(){
        return 'NoNum';
    }
  },

]
// Engineer's detail
function engineerPrompt() {
  

let engineerDetails = [{
  type: 'input',
  name: 'name',
  message: "Please enter the Engineers name",
  default(){
      return 'NoName';
  }
},
{
  type: 'input',
  name: 'id',
  message: "Please enter ID",
  default(){
      return 'NoID';
  }
},
{
  type: 'input',
  name: 'email',
  message: "Please enter email",
  default(){
      return 'NoEmail';
  }
},
{
  type: 'input',
  name: 'github',
  message: "Please enter your Github username",
  default(){
      return 'NoNum';
  }
}]
inquirer.prompt(engineerDetails).then(data =>{
  //console.log(team)
  team.push(new Engineer (data.name, data.id, data.email, data.github ));
  decision();
})
}

let employeeDetails = [{
  type: 'input',
  name: 'name',
  message: "Please enter the employee name",
  default(){
      return 'NoName';
  }
},
{
  type: 'input',
  name: 'id',
  message: "Please enter ID",
  default(){
      return 'NoID';
  }
},
{
  type: 'input',
  name: 'email',
  message: "Please enter email",
  default(){
      return 'NoEmail';
  }
},
]
// Intern's detail
function internPrompt() {  

let internDetails = [
  {
    type: 'input',
    name: 'name',
    message: "Please enter the intern's name",
    default(){
        return 'NoName';
    }
  },
  {
    type: 'input',
    name: 'id',
    message: "Please enter ID",
    default(){
        return 'NoID';
    }
  },
  {
    type: 'input',
    name: 'email',
    message: "Please enter email",
    default(){
        return 'NoEmail';
    }
  },
  {
    type: 'input',
    name: 'school',
    message: "Please enter school",
    default(){
        return 'NoNum';
    }
  }]
  inquirer.prompt(internDetails).then(data =>{
    //console.log(team)
    team.push(new Intern (data.name, data.id, data.email, data.school ));
    decision();
  })
  }

 function decision() { 
  let decision = [
    {
    type: 'list',
    name: 'typeOfMember',
    message: 'What you like to do? ',
    choices: ['1. Add an engineer', '2. Add an intern', '3. Finish building the team'],
    filter(val) {
      return val.charAt(0);
    }
  }]
  //console.log(team)
  inquirer.prompt(decision).then(data =>{

    switch (data.typeOfMember){
      case "1":
        engineerPrompt();      
        break;
        
      case "2":
        internPrompt();
          break;
      
      default:
        console.log("Thank you for using Team Generator!")
        //console.log(team)
        let htmlDoc = render(team)
        fs.writeFile(outputPath, htmlDoc)
        break;
    }
  }

  )

  
}

teamGenerator()
function teamGenerator() {  
    inquirer.prompt(managerDetails).then(data=>{
      team.push(new Manager (data.name, data.id, data.email, data.officeNumber ));  
    } ).then(()=> {
      decision()
    })
    // // type of employee selection 
    // // if manager go to managerGenerator?
    // // if engineer go to engineerGenerator?
    // // if intern go to internGenerator? 
    // // managerGenerator(){ is prompts for manager as below?}
       
  
 }