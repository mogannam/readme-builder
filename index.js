// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const str_outPath = "README.md";


// TODO: Create an array of questions for user input
const hashArrHash_questions = [
    {"varName": "str_gitUserName", "question":"Enter GitHub username? ","type": "input"},
    {"varName":"str_projectTitle", "question": "Enter your project title? ","type": "input"},
    {"varName":"str_projectDescrip", "question":"Enter Project Description? ","type": "input"},
    {"varName":"str_installInstruct", "question":"Enter Installation Instructions? ","type": "input"},
    {"varName":"str_usageInstruct", "question":"Enter Usage Instructions? ","type": "input"},
    {"varName":"str_contributors", "question":"Enter names of Contributors? ","type": "input"},
    {"varName":"str_refrences", "question":"Enter names of 3rd party refrences? ","type": "input"},
    {"varName":"str_license", "question":"Enter a License ","type": "list", choices: ['Apache', 'BSD', 'GNU', 'MIT']},

];

// TODO: Create a function to write README file
const func_writeToFile = (str_fileName, str_data)=> {
    return new Promise((resolve, reject) => {
        fs.writeFile(str_outPath, str_data, err => {
          if (err) {
            reject(err);
            return;
          }
    
          resolve({
            ok: true,
            message: 'File created!'
          });
        });
      });
}

//helper function that takes a question as a string and a variable name to store the answer in
// returns a hash of the question object, that gets passedd off to the inquire functions
const func_newInquireQuestion = (paramHash_questionObject) => {
  const paramStr_answerVar = paramHash_questionObject.varName
  const paramStr_question = paramHash_questionObject.question
  const paramStr_type = paramHash_questionObject.type
  if(paramStr_type === "list")
    return {
      type: 'list',
      name: paramStr_answerVar,
      message: paramStr_question, 
      choices: paramHash_questionObject.choices
    }
  return {
    type: 'input',
    name: paramStr_answerVar,
    message: paramStr_question 


  } // end return statement, return hash
}// end func_newInquireQuestion

const func_promptUser = () =>{

  //build an array of inquire hash objects, looping over each questions
  const arrHashInquirer_questions = [];
  // loop over an array of hashes, for each questionElement (aka a hash representing a question and a variablename)
  // call the function func_newInquireQuestion
  // push the results of the function into a hash calledarrHashInquirer_questions
  hashArrHash_questions.forEach(questionElement => arrHashInquirer_questions.push(func_newInquireQuestion(questionElement)))
  //console.log(arrHashInquirer_questions)
  return inquirer.prompt(
    arrHashInquirer_questions
  );// end of return, inquire.prompt 
} // end promptUser function


const func_writeAnswersFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile(str_outPath, fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  });
};

const func_generateReadMe = ParamHash_answers => {
  const str_projectTitle = `# ${ParamHash_answers.str_projectTitle} \n`
  const str_desc = `# Description \n\n ${ParamHash_answers.str_projectDescrip} \n`
  const str_tableContents = `
  ## Table of Contents \n
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license) \n`
  
  let str_licenseUrl = ''
  const str_license = ParamHash_answers.str_license
  //'Apache', 'BSD', 'GNU', 'MIT'
  switch(str_license){
    case'Apache':
      str_licenseUrl = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
      break;
    case'BSD':
      str_licenseUrl = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
      break;
    case'GNU':
      str_licenseUrl = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
      break;
    case'MIT':
      str_licenseUrl = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
  }
  str_licenseUrl += '\n'

  

  let str_installation = `# Installation \n ${ParamHash_answers.str_installInstruct} \n`



  const str_hr = '<hr>'
  const str_writeToFile = str_projectTitle +str_licenseUrl+ str_desc +str_hr+ str_tableContents + str_installation
  func_writeAnswersFile(str_writeToFile)

}

// TODO: Create a function to initialize app
function func_init() {
  func_promptUser()// call inquire function which passes a hash of answers into the next function
  .then((parm_answersPassedOff) => {func_generateReadMe(parm_answersPassedOff)})
}

// Function call to initialize app
func_init();
