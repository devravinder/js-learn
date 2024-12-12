/* 

 
  Worker Threads:-
     - multi-threading within a Node.js application
     - a separate thread of execution (a worker) for certain tasks
     - runs in parallel with the main thread 
            - taking advantage of multi-core processors 
            - parallel tasking/programming 
            - without blocking the ( main thread ) event loop

     - runs in isolation from the main thread 
            - no shared memory by default 
               between the  main thread and the worker thread

     - Communication between the main thread and the worker happens 
          via message passing, using a structured clone algorithm to send data

     - these are part of the same Node.js instance
          


   When to Use Worker Threads:-
     - CPU-Intensive Tasks
        - image processing, cryptography, data compression
     
     - Parallel Processing
        - to process large amounts of data in parallel,

     - Non-blocking
        - to ensure that long-running tasks do not block the event loop 
           and cause your application to become unresponsive


   When Not to Use Worker Threads:-
     - I/O Operations:
         - For I/O-bound tasks (e.g., reading files, querying databases), 
             worker threads are unnecessary.
             Node.js handles I/O operations asynchronously using its event loop and libuv.
             so worker threads don’t provide a significant benefit in these scenarios

     - Simple Applications:
        - lightweight apps doesn't need worker thread
           creating worker threads may introduce unnecessary complexity

     - Small tasks with minimal impact:
        - creating and managing worker threads will create more performance issues.
        - If the task execution time is lesser than the time it takes to create a worker thread,
            - then better to not create the worker thread. 


*/