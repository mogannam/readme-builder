// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const str_outPath = ".out/README.md";

// TODO: Create an array of questions for user input
const hashArrHash_questions = [
    {"varName": "str_gitUserName", "question":"Enter GitHub username? "},
    {"varName":"str_projectTitle", "question": "Enter your project title? "},
    {"varName":"str_projectDescrip", "question":"Enter Project Description? "},
    {"varName":"str_installInstruct", "question":"Enter Installation Instructions? "},
    {"varName":"str_usageInstruct", "question":"Enter Usage Instructions? "},
    {"varName":"str_contributors", "question":"Enter names of Contributors? "},
    {"varName":"str_refrences", "question":"Enter names of 3rd party refrences? "},
    {"varName":"str_license", "question":"Enter a License "},

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
  console.log(arrHashInquirer_questions)
  return inquirer.prompt(
    arrHashInquirer_questions
  );// end of return, inquire.prompt 
} // end promptUser function

// TODO: Create a function to initialize app
function func_init() {
  func_promptUser()
}

// Function call to initialize app
func_init();
