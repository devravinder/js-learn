/* 
 child processes:-
    - api enables to spawn new processes to execute tasks independently 
         of the main Node.js event loop

    - these create a 'OS child processes'

    - These child processes can  
             - execute external commands 
             - execute executable scripts
             - run seperate node.js instance 

    - we can add listerns/callbacks to these child processes
          - to commmunicate with main Node.js process
          - or we can use IPC to communicate

    - parallel execution

    - useful for
        - CPU-intensive 
        - isolated tasks ( eg: to avoid security risk )
        - when need to interact with external programs / commands
        - to run long ruuning I/O tasks


 When to Use Child Processes:-
   - Executing External Commands:
        - commands, scripts, or programs outside Node.js ( ls, grep )

   - Isolated Task Execution:
       - to run program that not interferes with the main Node.js process
            eg: handling untrusted inputs
   - Scaling:
      - Distributing tasks across multiple cores of a machine 
            e.g. a simple load-balancing mechanism

   - I/O Bound Operations:
        - Offloading I/O-heavy tasks to a child process to avoid blocking the main event loop.
        
    
 When Not to Use Child Processes:-
   - Shared Memory Is Needed
        - these won't share memory
            Use worker threads instead

   - Frequent Small Tasks
        - spawning and managing child processes can be expensive than the task

   - Asynchronous Node.js APIs Are Sufficient:
        - For most (small) I/O-bound operations, Node.js's async model is already efficient
           without the need for child processes.

 Note:- 
        Worker threads are light waight when compared to child processes
         - they share same memory  space and are part of the same Node.js instance
   


   Methods of Child Process:
     - spawn: 
           - To spawn a new child process with the command as arg.

     - exec: 
           - To execute a shell command with a buffer for the output.

     - execFile: 
           - To execute a executable file directly (without a shell).

     - fork: 
           - To create a new Node.js instance with a dedicated communication channel.
                   - IPC (Inter Process Communication)

           - this a *spawn* with its own Node.js instance



 Method      | Use Case                              | Involves Shell | Security Risk | Buffer Output
-------------|---------------------------------------|----------------|---------------|---------------
 spawn       | Streaming large outputs               | No             | Low           | No
             |   or long-running tasks               |                |               |
-------------|---------------------------------------|----------------|---------------|---------------
 exec        | Running commands with shell features  | Yes            | Higher        | Yes
-------------|---------------------------------------|----------------|---------------|---------------
 execFile    | Running executable files/scripts      | No             | Low           | Yes
-------------|---------------------------------------|----------------|---------------|---------------
 fork        | Running Node.js processes             | No             | Low           | N/A (uses IPC)
-------------|---------------------------------------|----------------|---------------|---------------

*/