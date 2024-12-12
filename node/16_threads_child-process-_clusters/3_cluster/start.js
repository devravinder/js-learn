/* 
 Cluster:-
    - Clusters in Node.js allow you to create child processes that share the same server port
       effectively creating a load-balanced application that can utilize multiple CPU cores.
    - cluster.fork is implemented on top of child_process.fork


    - It is same like childProcess.fork 
           - specially for web servers


  Note:-
     - use cluster for web servsers
     - fork for workers


  Use Case:-
    Multi-Core Utilization: 
        Fully utilize all CPU cores for better performance.
    Load Balancing: 
        Distribute requests across multiple processes to prevent overloading a single instance.
    Fault Tolerance: 
        If one worker crashes, the master can restart it without bringing down the entire application.
    High-Concurrency Servers: 
        Suitable for scenarios with a large number of simultaneous connections.


*/

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle worker exits
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // Optionally, replace the dead worker
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    // In this example, it's an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}