const { spawn } = require('child_process');

/* 
 Spawn:
   - to run the external commands
       - and the use the output in the application

   - it creates a child process with in the main Node.js process
        - this sub process can be created synchronously or asynchronously
            - synchronously - blocks the main thread of event loop
            - asynchronously - not blocks the main thread of event loop
            
   - Streams output, better for large processes

   - it is actaually as sub shell,
      - is more suitable for long-running processes with huge output
      - we can't use shell features like  pipes, redirects or even more than one program at a time
          - if we need full shell features ...use 'exec'

      - the child process will get exit, once the task is completed

*/

const ex1 = () => {

    // spawnSync
    const ls = spawn('ls', ['-lh', '/']); // Replace with a valid path

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // we can do anything with the data
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
}


const start = () => {
    ex1()
}

start()