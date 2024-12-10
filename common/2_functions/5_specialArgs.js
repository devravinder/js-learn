/* 
    - 'arguments' is an array of arguments passed to the function 
    - 'arguments.callee' reference to the function itself
    - new  & new.target
*/


function foo(){
    console.log(arguments.callee)
    console.log( "typeof arguments.callee:", typeof arguments.callee);
    console.log(arguments)
    console.log("typeof arguments:", typeof arguments);
    console.log(arguments.length)
    console.log("typeof arguments.length:", typeof arguments.length);
}

foo(1,2,4)


console.log("===============================")

// 0, 1, 1, 2, 3, 5, 8, 13
function fibonacci(index) {
    if (index <= 1) return index;
    return arguments.callee(index - 1) + arguments.callee(index - 2);
    // return fibonacci(n - 1) + fibonacci(n - 2);

}

console.log("fibonacci: ",fibonacci(2));

function fibonaccSeries(n) {
    return Array.from({ length: n }, (_, i) => fibonacci(i));
}

console.log('first10FibonacciNumbers:',  fibonaccSeries(10));


/* 
    

*/


function Person(name) {
    if(!new.target) 
        throw new Error("Must call with new keyword");
    this.name = name;
    this.sayHello = () => {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const person = new Person("Ramu");
person.sayHello();

person = Person("Bheemu")
person.sayHello();