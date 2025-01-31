const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');
/* 
 AbortController:-
    - api that allows us to control and cancel asynchronous operations
    - these are EventEmitters internally

 AbortSignal:- 
    -  is an object that can signal the cancellation of operations
       such as streams, fetch requests, or timers

    - part of AbortController


 AbortError:-
    - When an operation is aborted, it typically rejects with an AbortError


 ---
  this is available in js also
*/



// cancelling single operation
// works in js as well
const ex1 = async () => {


    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), 5000); // Abort after 5 seconds

     // controller.abort() actually trigger 'abort' event

    const fetchData = async () => {
        console.log("=============")
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
            const data = await response.json();
            console.log('Data fetched:', data);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error('Fetch aborted!');
            } else {
                console.error('Fetch error:', err);
                clearTimeout(timeoutId);
            }
        }
    }

    await fetchData()

}

// cancelling multiple operations
const ex2 = async () => {



    const readStream = fs.createReadStream('./input.txt')
    const writeStream = fs.createWriteStream('./input.txt.gz')

    const controller = new AbortController();
    const signal = controller.signal;
  
    setImmediate(() => controller.abort());


   try {
    await pipeline(
        readStream,
        zlib.createGzip(),
        writeStream,
        { signal },
      );
   } catch (error) {
    console.log("=====",error.message)
   }

}


// custom task cancellation
const ex3 = async () => {
    function wait(ms, signal) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, ms);
            if (signal) {
                signal.addEventListener('abort', () => {
                    clearTimeout(timer);
                    reject(new Error('Operation aborted'));
                });
            }
        });
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 2000); // Abort after 2 seconds

    wait(5000, signal)
        .then(() => console.log('Completed without aborting'))
        .catch((err) => console.error(err.message)); // Output: "Operation aborted"

}

const start = async () => {
    await ex2()
}

start()