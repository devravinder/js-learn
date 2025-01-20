
setTimeout(function() {
    console.log('1----Hello, World!');
}, 1000);

setTimeout(function() {
    console.log('2----Hello, World!');
    console.log(arguments)
}, 1000, "Hello", "HI");



function CreatePerson(name) {
    if(!new.target) throw new Error("Must call with new keyword");
    this.name = name;
    this.sayHello = function() {
        console.log(`3---Hello, my name is ${this.name}`);
    };
}

const person = new CreatePerson("John");

person.sayHello()
setTimeout(person.sayHello, 1000); // executing in global context
setTimeout(person.sayHello.bind(person), 1000); // Hello, my name is John

// ***
setTimeout.call(person, person.sayHello, 1000); // executing in global context //  Here we actually chaning the 'this' of setTimeout to 'person'



function fun(a, b){
    console.log({a,b})
}


setTimeout(fun, 1000, 1, 2) // passing args
