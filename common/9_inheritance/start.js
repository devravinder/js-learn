/* 
    Inheritance:
      - passing down characteristics from a parent to a child
      -  so that child can re-use the parent's characteristics to build new things


      - in js implements *prototypal inheritance* by using *objects*

      - in js, each object has an internal link to another object called *its prototype*
                - we can modify the *prototype obj* behaviour
                - we can modify the link also dynamically

                - only null does not have a prototype  ( doesn't have link to another object)

                - the prototype object can be access by
                    - obj.__proto__
                    - obj.[[Prototype]]
                    - Object.getPrototypeOf(obj)

                - by default evry object's prototype object is Object.prototype 
                     - i.e  
                         const obj = { name: "ramu"} 
                                'means'
                         const obj = { 
                            name: "ramu",
                            __proto__: Object.prototype
                          } 


                    Note:-
                        Object {
                            prototype: {
                                __proto__: null
                            }
                            __proto__: {}
                        }

                       -  Object.prototype is a object whose  __proto__ is null
                       - but Object.__proto__ is empty object



       - similarly, each constructor function has a *prototype* property
            - this is used inherit methods/function to the objects created using constructor function ( new Obj())
            - we can access it by
                - ConstructorFunction.prototype
                - obj.constructor.prototype

                 Note: obj.constructor points to the its ConstructorFunction




       - if we access any property / method of an object
           - first it looks in the object itself
           - if not found, it looks in its prototype
           - if not found, it looks in its prototype's prototype
           - it continues to go untill it reaches null or Object.prototype




   - class based inheritance is just a syntatic sugar of prototype based inheritance
           

*/

const ex1 = () => {
    const parent = {
        name: "Ramu",
        // __proto__: Object   // by deafult it points to Object.prototype
        greet: () => {
            console.log(`Hello, my name is ${this.name}`);
        }
    }

    const child = {
        age: 20,
        __proto__: parent
    }

    const anotherObj = {
        greet: () => {
            console.log(`greet form another`)
        },
        hello: () => console.log(`Hello world`)
    }

    console.log(child.greet())
    console.log(child.name)
    console.log(child.age)

    console.log("=============")
    console.log(parent.__proto__)
    console.log(parent.__proto__ === Object.prototype); // true
    console.log("====== chaining ======")
    console.log(child.__proto__) // parent
    console.log(child.__proto__.__proto__) // Object.prototype
    console.log(child.__proto__.__proto__.__proto__) // // Object.prototype.__proto__ is null

    console.log("======= not same ========")
    console.log(Object.prototype == Object.__proto__)


    console.log("==========chaning prototype=======")
    child.__proto__ = anotherObj

    child.greet()
    child.hello()



}

/* 
 inheritance 
    - with __proro__
    - with ConstructorFunction.prototype

    ***Important
*/
const ex2 = () => {
    const boxes = [
        { value: 1, getValue() { return this.value; } },
        { value: 2, getValue() { return this.value; } },
        { value: 3, getValue() { return this.value; } },
    ];


    boxes.forEach(e => console.log(e.getValue()))

    console.log("========= with __proro__ ============")

    const boxPrototype = {
        getValue() {
            return this.value;
        },
    };

    const newBoxes = [
        { value: 1, __proto__: boxPrototype },
        { value: 2, __proto__: boxPrototype },
        { value: 3, __proto__: boxPrototype },
    ];

    newBoxes.forEach(e => console.log(e.getValue()))


    console.log("========= with ConstructorFunction.prototype ============")

    // A constructor function
    function Box(value) {
        this.value = value;
    }

    // Properties all boxes created from the Box() constructor
    // will have
    Box.prototype.getValue = function () {
        return this.value;
    };

    Box.prototype.company = "Apple"

    const anotherBoxes = [new Box(1), new Box(2), new Box(3)];
    anotherBoxes.forEach(e => console.log(e.getValue()))
    anotherBoxes.forEach(e=> console.log(e.company))


    /*

    const nonProtoBoxes = [ Box(1),  Box(2),  Box(3)];// normal function call,[undefined, undefined, undefined]
    
    nonProtoBoxes.forEach(e => console.log(e.getValue()))
    */

}


const start = () => {
    ex2()
}
start()