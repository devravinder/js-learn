/* 
Arrow functions: 
    - Functions with shorter syntax
    - does not have its own this, arguments, super, or new.target
    - are always anonymous functions


    refer: this.js

    - doesn't have their own this. they inherit 'this' from their lexical scope (the surrounding code).
    - lexical scope ( the function or context in which the arrow function is *defined* )

*/


// Arrow function example:

// 1. Shorter syntax
const add = (a, b) => a + b;
console.log(add(2, 3)); // Output: 5


console.log("=============example2===============")
var value=100
// 2. Does not have its own 'this'
const obj = {
  value: 10,
  regularFunction: function () {
    console.log(this)
    console.log('Regular Function:', this.value); // function is inside obj...so 'this' refers to obj
  },
  arrowFunction: ()=> {
      console.log(this)
      console.log('Arrow Function:', this.value); 
      // the arrow function is defined inside the top-level script or module, where 'this' refers to the global object (or undefined in strict mode).
    },
};

obj.regularFunction();
obj.arrowFunction();

console.log("====================Example3===========")

// 3. No 'arguments' object
function regularFunction() {
  console.log('Arguments in regular function:', arguments);
}

const arrowFunction = () => {
  // console.log(arguments); // This would throw an error as arrow functions do not have their own 'arguments'
  console.log('Arrow functions do not have an arguments object.');
};

regularFunction(1, 2, 3); // Outputs: [Arguments] { '0': 1, '1': 2, '2': 3 }
arrowFunction(1, 2, 3);


console.log("===========Example4===========")

// 4. Always anonymous (no self recongition)
// Arrow functions are anonymous and need to be assigned to a variable or passed directly
const greet = (name) => `Hello, ${name}!`;
console.log(greet('World')); // Output: Hello, World!


console.log("===========Example5  with setTimeout===========")

/* 

    - normal functions have their own this binding & that refers to object where the function is executed
    - arrow functions don't have their own this binding, but they inherit 'this' from their lexical scope (the surrounding code where it is defined).


    - setTimeout is a global function ( it is executed in global context )

        - in setTimeout
            - if a normal function is passed, due to its own 'this' binding, it'll point to the setTimeout executing context (global context or undefined in strcit mode)
            - if an arrow function is passed, due to its inherited 'this' from their lexical scope, it'll point to the obj where it is defined
  
*/


const person = {
  name: 'John',
  fun1: function() {
    setTimeout(function() {
        console.log(this) // setTimeout context = global context (undefined in non-strict mode)
      console.log(` function:  my name is ${this.name}`); 
    }, 1000);
  },
  fun2: function(){
    setTimeout(() => {
        console.log(this) // inherit 'this' from their lexical scope = this points to obj
      console.log(`arrow function: my name is ${this.name}`);
    }, 1000);
  }
}

person.fun1();
person.fun2();
