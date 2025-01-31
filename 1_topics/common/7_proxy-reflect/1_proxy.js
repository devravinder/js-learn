/* 
  Proxy:
    - Proxy creates a proxy for another object,
      using which we can customize the behavior of fundamental actions on that object.
          - fundamental actions:
                - are also called 'Handler functions'
                - these are actually form Object class ( gets inherited )
                - eg: get, set, delete, apply, construct ..etc


    - Handler functions of proxy object are called traps, 
       because they trap calls to the target object.

    - if are doing mutations with proxy handlers
          the final changes will be applied to the target object.


    - Proxy objects are commonly used 
        - to log property accesses, 
        - to validate, format, or sanitize inputs, and so on.



    
*/

const ex1 = () => {
  const target = {
    message1: "hello",
    message2: "everyone",
  };

  const handler1 = {}; // empty handler

  const proxy1 = new Proxy(target, handler1);

  console.log(proxy1.message1); // hello
  console.log(proxy1.message2); // everyone
}


// with objects, set, get, delete
const ex2 = () => {
  const target = {
    message1: "hello",
    message2: "everyone",
    message3: "world"
  };

  const handler = {
    get(target, prop, receiver) {
      // here the receiver is the proxyObject
      
      if (prop === "message1") {
        return "hi";
      }

      return "world";
    },

    set: (obj, prop, value) => {
      if (prop === "message2" && typeof value !== "number") {
        throw new TypeError("message2 must be a number");
      }
      obj[prop] = value; // Perform the assignment
      return true;       // Indicate success
    },

    deleteProperty(target, prop) {
      if (prop === "message3") {
        return false
      }
      delete target[prop];
      return true;
    },
  };

  const proxy = new Proxy(target, handler);


  console.log("===========get==========")
  console.log(proxy.message1); // hi
  console.log(proxy.message2); // world


  console.log("=============set==========")
  // proxy.message2="new" // gives error
  proxy.message2 = 10

  console.log("=====proxy", proxy)
  console.log("=======target", target)


  console.log("========== delete =====")
  console.log(proxy, "=========== before")
  delete proxy.message1
  console.log(proxy)
  delete proxy.message3 // won't delete
  console.log(proxy)

}

// proxy with functions
const ex3 = () => {

  const target = (x, y) => x + y;
  const handler = {
    apply: (fn, thisArg, args) => {
      console.log(`Called with arguments: ${args}`);
      return fn(...args) * 2; // Modify the result
    },
  };

  const proxy = new Proxy(target, handler);
  console.log(proxy(2, 3)); // Logs: Called with arguments: 2,3
  // Returns: 10

}

// with constructor
const ex4 = () => {
  class Person {
    constructor(name) {
      this.name = name;
    }
  }

  const handler = {
    construct: (target, args) => {
      console.log("actual args", args)
      args[0] = 'Doe'
      return new target(...args); // Standard construction
    },
  };

  const ProxyPerson = new Proxy(Person, handler);
  const john = new ProxyPerson("John");
  console.log(john.name); // Doe


}

// with arrays
const ex5 = () => {

  const arr = [];
  const arrayHandler = {
    get(target, property) {
      if (property === "length") {
        console.log(`Length accessed: ${target.length}`);
      }
      return target[property];
    },
    set(target, property, value, receiverProxy) {
      console.log(`index: ${property} value: ${value}`);
      target[property] = value;
      return true;
    },
  };

  const proxyArray = new Proxy(arr, arrayHandler);
  proxyArray.push(1); // Logs: Setting 0 to 1
  proxyArray.push(2); // Logs: Setting 1 to 2
  console.log(proxyArray.length); // Logs: Length accessed: 2

}

const start = async () => {
  ex5()
}

start()