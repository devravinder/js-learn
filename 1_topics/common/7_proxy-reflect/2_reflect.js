/* 
  Reflect:-
    - Reflect is a global object
    - provides functions for inspecting and manipulating objects.
    - has all static methods of Object class
    - we can create object with 'new' keyword

*/


const ex1 = () => {
    const obj = {
        name: "Ramu"
    }

    console.log("======", obj)

    Reflect.set(obj, "name", "Bheemu")
    Reflect.set(obj, "age", 20)

    console.log(obj)


    console.log(Reflect.has(obj, "name"))

    console.log(Reflect.get(obj, "age"))
}


// Reflect with proxy

const ex2 = () => {
    const target = { name: "Alice", age: 30 };
    const handler = {
        get(target, property, receiver) {
            console.log(`get property: ${property}`);
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            console.log(`Set property ${property} to ${value}`);
            return Reflect.set(target, property, value, receiver);
        },
        deleteProperty(target, property) {
            console.log(`Deleted property: ${property}`);
            return Reflect.deleteProperty(target, property);
        },
    };

    const proxy = new Proxy(target, handler);
    proxy.name;       // Logs: Accessed property: name
    proxy.age = 35;   // Logs: Set property age to 35
    delete proxy.name; // Logs: Deleted property: name

}

const start = () => {
    ex2()
}

start()