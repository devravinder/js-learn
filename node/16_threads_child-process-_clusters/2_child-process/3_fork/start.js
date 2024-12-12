/* 
 Fork:-
   - it is 'spawn' with its own NodeJs instance
   - all the features of spawn

   - spawning a child process with its own NodeJs instance.

   - IPC - Inter Process Communication  between parent and child process

  - the child process won't get exit even afer the task is completed.
        - we have to exit the process manually from the child process / main process


*/

// this is from Main Nodej Process
// parent.js
const { fork } = require('child_process');
const path = require('path');

function createWorker() {
  const child = fork(path.join(__dirname, 'child.js'), [], {
    // Additional options
    execArgv: [], // Node.js arguments
    stdio: 'pipe', // Standard I/O configuration
    env: { ...process.env, WORKER_ID: Date.now().toString() }
  });

  child.on('message', (msg) => {
    switch (msg.type) {
      case 'progress':
        console.log(`Progress: ${msg.data}%`);
        break;
      case 'result':
        console.log('Computation result:', msg.data);
        child.send({ type: 'terminate' });
        break;
      case 'bye':
        console.log('Worker stopped pid:', msg.message);
        break;
      case 'error':
        console.error('Worker error:', msg.error);
        break;
    }
  });

  child.on('error', (err) => {
    console.error('Fork error:', err);
  });

  child.on('exit', (code) => {
    console.log(`Worker exited with code:${code} with pid:${child.pid}`);
  });

  return child;
}



const ex1 = () => {
  // Create multiple workers
  
  const child1 = createWorker()
  const child2 = createWorker()

  console.log("child1 process id", child1.pid)
  console.log("child2 process id", child2.pid)
  console.log("main process id", process.pid)


  // Send tasks to workers
  child1.send({
    type: 'compute',
    data: { task: 'heavy calculation' }
  });

  child2.send({
    type: 'terminate',
  });


}

const start = () => {
  ex1()
}

start()