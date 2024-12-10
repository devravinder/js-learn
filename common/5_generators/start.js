/* 
 Generator functions are special functions that exits & re-enters the execution context multiple times.
   - syntax: function*  (or)  function     *  [ spaces are allowed in between ]
   - Generator functions do not have arrow function counterparts.
   - not constructable  ( using new keyword )
   - hoisting is applicable for generator functions.
   - generator functions chaining is allowed


   - internaly:
     - when we declare a generator function (function*), it creates a 'GeneratorFunction' object.
     - when we call it, it returns a 'Generator' object, which is an iterable
          - we can retrun values from generator function using yield or return
          - when we call next():
                - it executes until the first yield statement

                - the yeild statement returns an 'GeneratorResult' object 
                    which contains yielded/returned value & status 
                    i.e GeneratorResult = { value: "Y", done: false }

                - if we call next(), it'll execute the statements till the next yield, 
                        and retruns 'GeneratorResult' object

                - we can pass arguments to next()

          - but we retrun ( normal return ) any value, the generator function will exit
             and returns 'GeneratorResult' with done is true ({ value: "X", done: true })

     - yeild is a keyword,
        - that is used to pause & resume the generator function execution
        - when we call next() on 'Generator' object
           the following tw0 things will happen at the same time
           - it retrurns 'GeneratorResult' object as *next() function call result*
           - and also retruns the * previous next() call arguments* to the generator function 
      

*/

const ex1 = () => {
    function* generator(i) {
        yield i;
        yield i + 10;
        // if we don't retrun, js resturn undefined
    }

    const genObj = generator(10);

    let result = genObj.next();
    console.log(result) // { value: 10, done: false }

    result = genObj.next(); 
    console.log(result); // { value: 20, done: false }

    result = genObj.next(); // this is may not required
    console.log(result); // { value: undefined, done: true }
  
}

const ex2 = () => {
    function* idMaker() {
        let index = 0;
        while (true) {
          yield index++;
        }
      }

      const genObj = idMaker();
      console.log(genObj.next().value); // 0
      console.log(genObj.next().value); // 1    
}

const ex3 = () => {
    function* yieldAndReturn() {
        yield "Y";
        return "R";
        yield "unreachable";
      }
      
      const gen = yieldAndReturn();
      console.log(gen.next()); // { value: "Y", done: false }
      console.log(gen.next()); // { value: "R", done: true }
      console.log(gen.next()); // { value: undefined, done: true }
      
}

const ex4 = () => {
    function* anotherGenerator(i) {
        yield i + 1;
        yield i + 2;
        yield i + 3;
      }
      
      function* generator(i) {
        yield i;
        yield* anotherGenerator(i); // generator chaining
        yield i + 10;
      }
      
      const gen = generator(10);
      
      console.log(gen.next().value); // 10
      console.log(gen.next().value); // 11
      console.log(gen.next().value); // 12
      console.log(gen.next().value); // 13
      console.log(gen.next().value); // 20
}


const ex5 = () => {
    function* exampleGenerator(){

        /* 
          we can't hold 1st next() arg, bcz yeild only gives the previous next() arg
          ...there is no next() call before the 1st next() 
         */

        // we can retrun(yield) without value

        let result = yield; // result is 2nd next() arg

        console.log('in generator:', result)

         result = yield 'from generator'

         console.log('in generator:', result)

         console.log('in generator:', yield)

         result = yield 'again from generator';

         return 'completed'
    }


    const genObj = exampleGenerator()

    let return1 = genObj.next()
    console.log(return1)

    return1 = genObj.next('from main')
    console.log(return1)

    return1 = genObj.next('gain from main')
    console.log(return1)

    return1 = genObj.next('one more time from main')
    console.log(return1)

    return1 = genObj.next('last time from main')
    console.log(return1)

    console.log("========after done====")
    return1 = genObj.next()
    console.log(return1)

}

const ex6 = () => {

    function* calculator() {
        const num1 = yield 'Enter first number'; // 2nd next() arg will be assinged to num1 (i.e 10)
        const num2 = yield 'Enter second number';
        yield `Sum: ${num1 + num2}`;
      }
      
      const gen = calculator();
      
      console.log(gen.next().value);    // Enter first number
      console.log(gen.next(10).value);  // Enter second number
      console.log(gen.next(20).value);  // Sum: 30
      
}

const start=async()=>{
  ex5()
}

start()