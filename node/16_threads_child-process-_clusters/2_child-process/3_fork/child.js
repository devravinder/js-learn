// worker.js
const os = require('os');

process.on('message', async (msg) => {
    try {
        switch(msg.type) {
            case 'compute':
                const result = heavyComputation(msg.data);
                
                // Report progress
                for(let i = 0; i <= 100; i += 10) {
                    process.send({ 
                        type: 'progress', 
                        data: i 
                    });
                }
                
                // Send final result
                process.send({ 
                    type: 'result', 
                    data: result 
                });
                break;

            case 'terminate':
                  // console.log(" going to terminate pid ", process.pid) // we can't use console.log
                  process.send({
                      type: 'bye',
                      message: "going to terminate pid " + process.pid
                  })
                  process.exit(0);// if we don't exit..it'll be keep running in background          
                  break;          
               
        }
    } catch (error) {
        process.send({ 
            type: 'error', 
            error: error.message 
        });
    }
});

function heavyComputation(data) {
    console.log('Computing:', data);
    // Simulate complex calculation
    let result = 0;
    for(let i = 0; i < 1000000; i++) {
        result += Math.random();
    }
    return result;
}