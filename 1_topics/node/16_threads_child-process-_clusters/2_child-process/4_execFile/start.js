/* 
 execFile:-
   - execute an external executable file or command with specific arguments
   - More secure than exec()

   - we can run shell scripts, nodeJs scripts or any other executable file

*/

const { execFile } = require('child_process');
const path = require('path');

// Platform-specific executable
const executable = process.platform === 'win32' 
    ? path.join(__dirname, 'script.exe')
    : path.join(__dirname, 'script.sh'); 
        // make the file executable
        // chmod +x script.sh

const child = execFile(executable, ['arg1', 'arg2'], (error, stdout, stderr) => {
    // single ..single stdout will come here
    if (error) {
        console.error(`Execution error: ${error}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});

// Stream output in real-time
child.stdout.on('data', (data) => {
    console.log('Chunk received:', data); 
    // here the data is streamed
    // all the stdout are streamed here
});