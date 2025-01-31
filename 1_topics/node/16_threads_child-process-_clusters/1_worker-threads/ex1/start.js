const { Worker, isMainThread } = require('worker_threads');

function computeHeavyTask(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: data });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

function someOtherTask(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('some data')
        }, 1000)
    })
}
const ex1 = () => {

    console.log("isMainThread", isMainThread)
    // 40 = 2 secods
    // 41 = 3.5 seconds
    // 42 = 5.080 seconds
    computeHeavyTask(42)
        .then((result) => console.log('Computation result:', result))
        .catch((err) => console.error('Error:', err));

    someOtherTask()
        .then((result) => console.log('Other Task result:', result))
        .catch((err) => console.error('Other Task Error:', err));

        console.log(" main thred ended, waiting for callback to finish")
};

const start = async () => {
    ex1()
}

start()