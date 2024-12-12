const { exec } = require('child_process');

/* 
 
https://stackoverflow.com/questions/48698234/node-js-spawn-vs-execute
https://www.hacksparrow.com/nodejs/difference-between-spawn-and-exec-of-node-js-child-rocess.html


Exec:-
  - all the features of spawn
  - it is complete shell process,
      *so we can use all shell features*
         like pipes, redirects or even more than one program at a time

  - the child process will get exit, once the task is completed



*/

const ex1=()=>{
    exec('ls -lh /usr', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(typeof stdout)
        console.log(`stdout: ${stdout}`);
    });
}

const start=()=>{
    ex1()
}
start()