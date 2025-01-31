/* 
 video: https://www.youtube.com/watch?v=eiC58R16hb8&ab_channel=LydiaHallie
 ref: https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate
 ref: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick


Note:-
  Node.js has three main queues
     1. Next Tick Queue (process.nextTick).
     2. Microtask Queue (Promise.then, & MutationObserver).
     3. Macrotask Queue  ( Timers, I/O, TCP, Socket  )


     the control flow ( node execution )
           ┌───────────────────────────┐
        ┌─>│    Next Tick Queue        │<───┐
        │  └─────────────┬─────────────┘    │
        │  ┌─────────────┴─────────────┐    │
        │  │     Microtask Queue       │────┘
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        └──┤     Macrotask Queue       │
           └───────────────────────────┘

       - The 'nextTickQueue' and 'microtask' queue are processed before moving to the next event loop phase.

       - *nextTickQueue will be processed after the current operation is completed*
           - after any current process is completed
           - regardless of the current phase of the event loop
           - high priority queue


        - *microtaskQueue*
          - A microtask is a short function which is executed after 
             the function or program which created it exits
             - only if the call stack is empty
             
          - less priority than nextTickQueue


================= Event Loop in Node.js ================

ref: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick


When Node.js starts,
  - it initializes the event loop
  - then executes the provided input script ( stetements ) [ in the main thread ]
  - these stetements may call the following functions
        - async call ( file or network I/O ) 
        - timers
        - process.nextTick()

  - if the above functions are called, Node.js will push their callbacks to the event loop ( to the message queues ) 


    - the event loop contains the following message queues [ FIFO queue ] - called 'Phases'
          there are 8 queus: 
             - nextTickQue (high priority que)
             - micro-task-que ( 2nd priority que )
             - macro-task-queue ( node.js uses these 6 mostly )


           ┌───────────────────────────┐
        ┌─>│           timers          │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        │  │     pending callbacks     │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        │  │       idle, prepare       │
        │  └─────────────┬─────────────┘      ┌───────────────┐
        │  ┌─────────────┴─────────────┐      │   incoming:   │
        │  │           poll            │<─────┤  connections, │
        │  └─────────────┬─────────────┘      │   data, etc.  │
        │  ┌─────────────┴─────────────┐      └───────────────┘
        │  │           check           │
        │  └─────────────┬─────────────┘
        │  ┌─────────────┴─────────────┐
        └──┤      close callbacks      │
           └───────────────────────────┘
    

    -  when the event loop enters a given phase, 
         - it will perform any operations specific to that phase ( like checking the left time )
         - then executes the callbacks in that phase's queue 
         
     - event loop exits the phase
        - if the queue becomes empty
        - or callbacks execution limit is reached  [ callbacks execution limit  ]      
        
        

    Phases Overview
    ------------------
    - timers: 
       - executes callbacks scheduled by setTimeout() and setInterval() whose specified time has elapsed.
       - Technically, the 'poll' phase controls when timers are executed
          - bcz if waiting time not yet elapsed
             - then event loop will enter 'poll' phase & tries to executes the callbacks
             - in the mean time, even if the timers have elapsed,
               the call backs are not executed until the event loop exits the 'poll' phase.


    - pending callbacks: 
       -  executes I/O callbacks deferred to the next loop iteration.
       -  eg: if system wants to report TCP error 'ECONNREFUSED', 
           then that callback will be pushed to this queue and will be executed in the next iteration ( deferred callback ).

    - idle, prepare: 
       -  Used internally by Node.js for maintenance and preparation..

    - poll: 
       -  'polling' means repeatedly checking
       -  this is main I/O callback queue
       -  retrieves new I/O events; execute I/O related callbacks 
       -  almost all the callbacks are executed here, except 'close callbacks', timers, and setImmediate();
       -  node will block if required.
       -  this phase has two main functions:
            1. Calculating how long it should block and poll for I/O, then
            2. Processing events in the poll queue.

       -  event loop enters into this queue...when there are *no timers* are scheduled.

       -  event loop does two things after entering to this queue:

            1. if the poll queue is not empty, executes the callbacks *synchronously*
                - leaves the queue if queue becomes empty
                - or the *system-dependent* hard limit is reached.

            2. if the poll queue is empty, one of two more things will happen:
               1. if 'check' phase is not empty, enters to it & executes callback added to by setImmediate(),
               2. if 'check' phase is empty, the event loop will waits for new callbacks in the same poll queue, 
                    and then executes them immediately

    - check: 
       - setImmediate() callbacks are invoked here.
       - event loop enter this phase just after leaving 'poll' phase.

    - close callbacks: 
       - if a resource is closed *abruptly*, then it'll emit 'close' event & executes the callbacks
       - eg: If a socket or handle is closed abruptly (e.g. socket.destroy())
       - generally the 'close' callbacks are executed in *Next Tick Queue*
          - this is not part of event loop
          - callbacks are pushed *Next Tick Queue* by process.nextTick()




   ============== The order of event loop phases ================
    1. timers
    2. pending callbacks
    3. idle, prepare
    4. poll
    5. check
    6. close callbacks




    Note:- 
      Event loop doesn't use queues actually, 
       but it uses file descriptors wich acts like queues...
         when the operating system is monitiring them ( nodejs asks the OS to monotor )

      ref: https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop



*/