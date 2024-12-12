//const EventEmitter = require('events');
const EventEmitter = require('node:events');



/* 
 Node.js
  
  Events:-
    - these are mechanism that enables 
              - triggering some actions
              - responding to some actions


            
    
              

    - browesers implements some events by default
       -like onClick, onHover...          

*/


class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();


const ex1 = () => {

    myEmitter.on('event', () => {
        console.log('an event occurred!');
    });

    myEmitter.emit('event');

    //=== with args

    myEmitter.on('argsEvent', function (a, b) {
        console.log("args", { a, b }) // this points myEmitter
        // but if we use arrow function... this won't point to myEmitter
    })

    myEmitter.emit("argsEvent", 1, 2)
}

const ex2 = () => {
    let m = 0

    // Once the event is emitted, the listener is unregistered 
    myEmitter.once('event', () => {
        console.log(++m);
    });
    myEmitter.emit('event');
    // Prints: 1
    myEmitter.emit('event'); // not triggers
}


const ex3 = () => {
    // if error listener is not there...it crashes the app 
    // ( Nodejs default listner: prints stacktrace & crashes)
    myEmitter.on('error', (err) => {
        console.error('whoops! there was an error');
    });

    myEmitter.emit('error', new Error('whoops!')); // like normal event triggering
}

const ex4 = () => {
    // https://nodejs.org/api/events.html
    // not working as per the doc

    class MyEmitter extends EventEmitter { }
    const myEmitter = new MyEmitter({ captureRejections: true }); // to capture errors
    myEmitter[Symbol.for('nodejs.rejection')] = console.log;


    myEmitter[Symbol.for('nodejs.rejection')] = function (err) {
        console.log("-------")
        console.log(err)
    }

    myEmitter.on('error', function (err) {
        console.log("============")
        console.log(err)
    });



    myEmitter.on('someOther', () => {
        throw new Error("kaboom")
    })

    myEmitter.emit("someOther")

    console.log("============")

}
const ex5 = () => {

    function cb1(info) {
        console.log(` Data received: ${info}`);
    }

    function cb2(info) {
        console.log(` 2 Data received: ${info}`);
    }
    // same as 'on'
    myEmitter.addListener('data', cb1);



    // Add another listener for the same event
    myEmitter.addListener('data', cb2);


    myEmitter.emit('data', 'Hello, World!'); // both listeners will get executed


    console.log("========remove=======")

    myEmitter.removeListener("data", cb1)


    myEmitter.emit('data', 'Hello00000000'); // only one will get executed


    console.log("==remove all ===")
    myEmitter.removeAllListeners("data")

    myEmitter.emit("data", "Bye") // no listeners
}

const start = () => {
    ex5()
}
start()