// "use strict";

/* 
 Topics:-
   this
   call vs bind vs apply
   arrow functions
*/


// Note: run this js file in browser only ...not in node Enviroment

/* 
- In JavaScript, this is a keyword that refers to the object that is *currently executing* the code. 
- It is used to access the properties and methods of the current object.

- in functions, this refers 
     - to the object where the function is *currently executing* by deafult.
     - we can chnage 'this' reference by using call(), apply(), bind()
     - when we call function with 'new' keyword, 'this' points to new object  created by 'new' keyword

- in arrow functions doesn't have 'this' binding
    - doesn't have their own this. they inherit 'this' from their lexical scope (the surrounding code).
    - lexical scope ( the function or context in which the arrow function is *defined* )


 Note:- behavior of this in global context is defferent in node & browser enviroments

    - in non-strict mode
          - in browser, this points to window object
          - in node, this points to global object (empty object)

    - in strict mode
          - in browser, this points to undefined
          - in node, this points to empty object
     


*/



console.log("this", this)



var name = "ramu"; // it is part global obejct in js ( but not in nodejs )

console.log(this.name) // ramu ( if run in browser)

function foo() {
     // foo is in global(window) scope
     console.log(this.name)
}

foo()


function createPet(name, height) {

     console.log("==========before assigning name:", this.name)
     // 'createPet' function is in global scope...so this ponint global(window) object 
     this.name = name; // changing global(window).name


     const pet = {
          height: height,
          petName: name,

          // logDetails is in pet object, so this points to pet object
          logDetails() {
               console.log(`My name is ${this.petName} and my height is ${this.height}`)
               console.log(`this.name: `, this.name) // undefined // name is in createPet..not in pet
          }
     }
     return pet
}


console.log("========cat =======")
const pet = createPet('cat', '20cm');
pet.logDetails()

console.log(this.name, "after cat") // cat


console.log("=====dog======")
const dog = new createPet('dog', '30cm'); // will get new object
dog.logDetails()
console.log(this.name, "after dog") // still cat


console.log("============= call vs bind vs apply =============")

/* 
 
     call vs bind vs apply
     ref: https://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind

     call, bind, apply are used to change 'this' reference
      
     - all the accepts object as first argument & and chnages 'this' reference to the object passed as first argument

     - call & apply 
          - used to call the function imeediately
          - 'call' accepts the arguments as comma (,) separated values
          - 'apply' accepts the arguments as array values        // apply as array

     - 'bind' 
        - used to call the function at later point of time
        - it returns a new function whose 'this' points to the object passed as first argument
        - 'bind' accepts the arguments as comma (,) separated values


*/

function greet(message, punctuation) {
     console.log(`Hello ${this.name}, ${message} ${punctuation}`)
}

const person = { name: 'Ramu' }
const human = { name: 'Bheemu' }
const man = { name: 'Somu' }

greet.call(person, "Good Morning", "!")
greet.apply(human, ["Good Morning", "@"])
console.log("================bind===========")
const greetMan = greet.bind(man, "Good Morning", "!") // pass args
greetMan()

const greetAgainMan = greet.bind(man)
greetAgainMan("Good Evening", "!!") // pass args later

console.log("============= arrow functions===========")

const whish = () => {
     console.log(`Good Morning ${this.name}`)
}

function CreatePerson(name) {
     this.name = name
     const person = {
          personName: name,
          whish: () => {
               console.log(this) // 'this' points to the 'new' object created by 'new' keyword of 'CreatePerson'
               console.log(`Good Morning ${this.name}, personName: ${this.personName}`)
          }
     }
     return person
}

console.log("============person=======")
const goodPerson =  new CreatePerson('ramu')
goodPerson.whish()


console.log("==========eg2=======")

const obj = {
     name: "Alice",
     greet: () => {
         console.log(this.name);
        // undefined (in both Node.js and browsers) because `this` refers to the global context

     },
 };
 
 obj.greet(); 