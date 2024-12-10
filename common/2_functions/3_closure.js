/* 
Nested functions and closures
-----------------------------

In Nested functions, the nested function forms a closure, this means that a nested function can "inherit" the arguments and variables of its containing function.
In other words, the inner function contains the scope of the outer function.


This is a like encapsulation for the variables of the inner function.
i.e Outer function cannot access  the inner function scope & but the inner can acces outer's scope.

*/

//eg:1
function addSquares(a, b) {
    function square(x) {
      return x * x;
    }
    return square(a) + square(b);
  }
  
  console.log(addSquares(2, 3)); // 13
  console.log(addSquares(3, 4)); // 25
  console.log(addSquares(4, 5)); // 41

  //============
  function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}

const fnInside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
console.log(fnInside(5)); // 8
console.log(outside(3)(5)); // 8

//============


/* 
Name conflict,  More nested scopes take precedence
*/
function outside() {
  const x = 5;
  function inside(x) {
    return x * 2; // this x takes precedence
  }
  return inside;
}

console.log(outside()(10)); // 20 (instead of 10)

//==================

console.log("=======================Pet Object================")

const createPet = function(name, age, height) {

  // all the arguments are accessable by 'pet' from parent scope

  const pet = {
    name,
    age,

     // setHeight(newHeight){} = setHeight: function (newHeight){}
    setHeight(newHeight) {
      height = newHeight;
      // the height is like private variable
      //  height is not declared in pet, but it'll be accessed from parent function scope
    },
    getHeight(){
      return height;
    },
    logDetails(){
      console.log(`My name is ${name} and I am ${age} years old & my height is ${height}`);
    },

  };
  return pet;
};


const cat = createPet('cat', 2, '30cm');
cat.logDetails()
cat.setHeight('20cm');
cat.logDetails()

console.log(cat.age)
console.log(cat.name)
console.log(cat.height)// the height is like private variable
console.log(cat.getHeight())
cat.setHeight('40cm')
console.log(cat.getHeight())