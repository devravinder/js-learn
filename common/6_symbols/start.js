/* 
 Symbols:-
   - Primitives
   - These are the only one object primitives
   - They are immutable
   - Symbols give always unique keys
   - Symbols are generally used as keys of object,
       - when we use like, these are typically hidden keys of object // but still accessable
       - acts like weak encapsulation  ( weak private property )


   - Symbols created for a given key are called 'Registered Symbols'
      - we need to call like: Symbol.for("name")
            Note: Symbol.for("name")  & Symbol("name") are not same

      - these are stored in *Global Symbole Registry*
      - for a given key... Symbols give always give the same 'symbol'
     
           Note:- *Global Symbole Registry* is not a internal data structure
                  - we can't access the registry
                  - this registry is arbitarly created by js engine anywhere
                  - so: 
                     - registered symbols can be arbitrarily created anywhere
                     - registered symbols are  not guaranteed to be unique 
                          and are not garbage collectable

                     - it is recommended not to use registered symbols



   - 

   - All the static variables of Symbol class/object are also symbols ( used for weak encapsulation )
   
   Syntax:- 
       let key1 = Symbol();
       let key2 = Symbol("name");
       let key3 = Symbol.for("name");

       // new Symbol(); // gives error  we can't use with new
   

*/


const ex1=()=>{
    let sym1 = Symbol();
    let sym2 = Symbol("name");
    let sym3 = Symbol.for("name"); // sym2 & sym3 are different
    let sym4 = Symbol.for("name"); // sym3 & sym4 are same
    console.log(sym1,sym2,sym3, sym4);
    console.log("============")
    console.log(sym1 === sym2);
    console.log(sym2 === sym3);
    console.log(sym3 === sym4); // the both are same
  
    console.log("============", typeof sym1) // 'symbol'
  
    const obj = Object(sym1)
    console.log(obj, "=========", typeof obj) // 'object'
  
    console.log("===================")
  
    let key3 = Symbol.keyFor(sym3) // to get key
    console.log(key3, "======", typeof key3)
  
  }
  
  const ex2=()=>{
  
      const obj = {
          "height":"165cm",
          [Symbol.for("age")]: 20,
          [Symbol.for("name")]: "ramu", // this is not recomonded  // *Registered Symbols*
          [Symbol("address")]: "Hyd",   // this is recomonded
  
          [Symbol()]: 'value' // we can't access this directly // weak encapsulation
                              // but we can access iterables
                              // Array.from(obj), Arrays.forEach
      }
  
      const name = obj[Symbol.for("name")]
      console.log({val: name}) // "ramu"
  
      const address = obj[Symbol("address")]
      console.log({address}) // 'Hyd'
  
      console.log(obj) // { [Symbol(name)]: 'ramu', [Symbol(age)]: 20, [Symbol()]: 'value' }
  
  
      console.log("=============loop over symbol keys===============")
      const arr = Object.getOwnPropertySymbols(obj) // gives all the symbol keys
      
      for( let key of arr){   
        console.log(obj[key])
      }
  
  
  
  }
  
  const start=async()=>{
    ex2()
  }
  
  start()