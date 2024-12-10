const fs = require('node:fs');

/* 
 - setTimeout vs setInterval
 - setTimeout vs setImmediate
 - process.nextTick? (nextTickQueue)
 - setImmediate vs process.nextTick
 - queueMicrotask [microtaskQueue] (Promise.then, & MutationObserver)


 [ MutationObserver: a special type of event listener that watches for changes to the DOM tree. ]

*/


/* 

    setTimeout vs setInterval

    // both are same 
    // setInterval is repeated setTimeout

*/
const ex1 = () => {
    function customSetInterval(callback, interval) {
        function repeat() {
            callback();
            setTimeout(repeat, interval);
        }

        // Start the first execution
        setTimeout(repeat, interval);
    }

    customSetInterval(() => {
        console.log('This will run repeatedly!');
    }, 1000);
}


/* 

    setTimeout vs setImmediate

    1. 
      - setTimeout call back is added to event loop's 'timer' queue
      - setImmediate call back is added to event loop's 'immediate' queue
    2. 
      - setImmediate callback is called just after event loops exits from 'poll' phase
      - setTimeout() callback is executed when a minimum threshold in ms has elapsed.

    3. order of execution
      - if the event loop not entered into 'poll phase'
         then the order *depends on performance of the process* (other running applications)
      - if the event loop entered into 'poll phase'
         then the setImmediate executed before setTimeout


*/

const ex2 = () => {


    // order depends on performance of the process
    const case1 = () => {
        setTimeout(() => {
            console.log("case1 setTimeout");
        }, 0);
        setImmediate(() => {
            console.log("case1 setImmediate");
        });
    }


    // setImmediate executed before setTimeout
    const case2 = () => {
        fs.readFile(__filename, () => {
            setTimeout(() => {
                console.log('case2 timeout');
            }, 0);
            setImmediate(() => {
                console.log('case2 immediate');
            });
        });
    }
    case1();
    case2()



}
/* 

    process.nextTick? (nextTickQueue)

    - *nextTickQueue will be processed after the current operation is completed*
       regardless of the current phase of the event loop
    - all callbacks passed to process.nextTick() will be resolved before the event loop continues
    - this is used to execute important tasks just after the current operation is completed
       eg: - throwing important errors 
                    like socket connection closed & Maximum call stack size exceeded
           - cleanup any unneeded resources
           - to run task after the call stack is empty, but before the event loop enters
               (below example)
*/
const ex3 = () => {
    const server = net.createServer(() => {}).listen(8080);

    // some other statements
    // -----------

    server.on('listening', () => {});

    /* 
      - listen(8080) binds port & emits 'listening' event
      - assume it emits the 'listening event' even before server.on('listening') listeners is executed (added)
        in this case, server.on('listening') will not be executed

      - so in listen(8080), the 'listening event' will be emitted using process.nextTick()
         so that the 'listening event' actually emitted after the current operation is completed,
           which is adding 'listening listener' [ server.on('listening') ]
    */

}

/* 
   Microtask Queue (Promise.then, & MutationObserver) is executed 
   just after the call stack is empty & before the event loop enters
   - less priority than nextTickQueue
*/
const ex4 = () => {

    /* 
     current operation is executing this function
       - adding the promise callback to microtask queue
       - setTimout & setInmediate callbacks to event loop queue
       - process.nextTick() callback to nextTick queue
    */

     new Promise((resolve, reject) => {
         resolve("promse")
     }).then(data => {
        // this is micro task
        console.log(data) // 2nd, after nextTick & before event loop
     })

     queueMicrotask(() => {
        console.log('microtask manually'); // 3rd
     })

     

     setTimeout(() => {
        console.log('timeout');
    })

    process.nextTick(() => { 
        console.log('nextTick'); // 1st // after the current operation
    });
    setImmediate(() => {
        console.log('setImmediate');
    })


}




const start=async()=>{
  ex4()
}
start()