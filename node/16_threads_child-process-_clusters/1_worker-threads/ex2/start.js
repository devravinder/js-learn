const { Worker,workerData, isMainThread, parentPort } = require('worker_threads');


function fib(n) {
    if (n <= 1) return n;
    // two recursive calls are very expensive (exponential time)
    return fib(n - 1) + fib(n - 2);
}
const runInWorker = () => {
    console.log("in worker")

    const input = workerData; // inout form main thread

    console.log("in worker", { input }, typeof input)

    console.time("Fibonacci")
    const output = fib(input);
    console.timeEnd("Fibonacci")

    console.log("in worker", { output })
    parentPort.postMessage(output); // sending message to main thread
}

const runInMain = () => {
    const worker = new Worker(__filename, {workerData: 40}); // passing the same file

    worker.on('message', (result) => {
        console.log(`Received result from worker: ${result}`);
    });

    worker.on('error', (error) => {
        console.error('Worker error:', error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
    });
}

const ex1=()=>{
    if(isMainThread){
        console.log("======in main")
        runInMain()
    } else {
        console.log("======in worker")
        runInWorker()
    }
}

const start=()=>{
   ex1()
}
start()