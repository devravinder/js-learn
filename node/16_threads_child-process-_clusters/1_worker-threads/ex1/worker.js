const { parentPort, workerData, isMainThread } = require('worker_threads');

// Simulate a CPU-heavy task (e.g., Fibonacci calculation)


    /* 
    40 - 2s
    41 - 3.5s
    42 - 5.080s
    43 - 8.31s
    44 - 14.650s
    
    */
function fib(n) {
    if (n <= 1) return n;
    // two recursive calls are very expensive (exponential time)
    return fib(n - 1) + fib(n - 2);
}

/* 
function fib(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
 */


const runInWorker = () => {
    console.log("in worker")

    const input = workerData; // inout form main thread

    console.log("in worker",{input}, typeof input)

    console.time("Fibonacci")
    const output = fib(input);
    console.timeEnd("Fibonacci")

    console.log("in worker", {output})
    parentPort.postMessage(output); // sending message to main thread
}

const runInMain = () => {
    console.log("in main thread")
    console.time("Fibonacci")
    const output = fib(44);
    console.timeEnd("Fibonacci")
    console.log({output})
}


const start = () => {

    if(isMainThread){
        runInMain()
    } else {
        runInWorker()
    }

}

start()