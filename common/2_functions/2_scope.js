/* 
Function scope
----------------------
Variables defined inside a function cannot be accessed from anywhere outside the function, 
because the variable is defined only in the scope of the function. 

However, a function can access all variables and functions defined inside the scope in which it is defined.

*/

const num1 = 20;
const num2 = 3;
const name = "Chamakh";

function multiply() {
  return num1 * num2;
}

console.log(multiply());

function getScore() {
  const num1 = 2;
  const num2 = 3;

  function add() {
    
    return `${name} scored ${num1 + num2}`;
  }

  return add();
}

console.log(getScore()); // "Chamakh scored 5"
