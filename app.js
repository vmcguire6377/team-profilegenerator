const generateSite = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    //deleted unnecessary code
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=====================
Add a New Team Member
=====================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your team member? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a team member name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: "What is the team  manager's name (Required)",
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter the name of the team manager!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: "What is your employee id? (Required)",
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter your employee id!");
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the team member's email address? (Required)",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the team member's email address!");
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'officenumber',
        message: "What is the team member's office number? (Required)",
        validate: ofc => {
          if (ofc) {
            return true;
          } else {
            console.log("Please enter the team member's office number!");
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'Is this team member a manager, engineer, or intern?',
        choices: ['Manager','Engineer', 'Intern']
      },
      {
        type: 'input',
        name: 'link',
        message: "Enter the team member's GitHub username. (Required)",
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log("You need to enter the team member's Github username!");
            return false;
          }
        }
      },
      
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another team member?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  })
 
  const fs = require('fs');

  const writeFile = fileContent => {
      return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
          // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
          if (err) {
            reject(err);
            // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
            return;
          }
    
          // if everything went well, resolve the Promise and send the successful data to the `.then()` method
          resolve({
            ok: true,
            message: 'File created!'
          });
        });
      });
    };
    const copyFile = fileContent => {
      return new Promise((resolve, reject) => {
        fs.copyFile('./dist/index.html', fileContent, err => {
          // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
          if (err) {
            reject(err);
            // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
            return;
          }
    
          // if everything went well, resolve the Promise and send the successful data to the `.then()` method
          resolve({
            ok: true,
            message: 'File created!'
          });
        });
      });
    };
    module.exports = {
      writeFile: writeFile,
      copyFile: copyFile
    };

