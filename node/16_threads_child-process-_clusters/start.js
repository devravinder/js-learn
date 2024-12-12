/* 


ref: https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop


ref: https://medium.com/@manikmudholkar831995/worker-threads-multitasking-in-nodejs-6028cdf35e9d

    T1        T2                       |                       T1         T2
    │        │                         │                       │          │ 
    │        │                         │                       │          │ 
    │        │                         │                       │          │
    │        │                         │                       │          │
    │        │                         │                       │          │
    │        │                         │                       │          │
    ⬇        ⬇                         |                       ⬇          ⬇
    ┌────────┐                         |                     ┌─────┐   ┌─────┐
    │   CPU  │                         |                     │ CPU │   │ CPU │
    └────────┘                         |                     └─────┘   └─────┘
                                       |
    Concurrency                        |                    Parallel Programming
                                       |

    Concurrency:- 
        - multiple tasks by one CPU/Thread
        - suitable for I/O intensive works

    Parallel Programming:- 
        - multiple tasks by multiple CPUs/Thread
        - suitable for CPU intensive works







   Process:- 
      - a process is a running program in the operating system 
      - have their own control flow
      - It has its own memory 
      - one task can be executed at a time
      - cannot see or access the memory of other running programs

       Note:- The OS can execute multiple process on single core concurrently


  Thread:-
    - like a process ( have their own control flow )
    - threads do not have their own memory (shared memory)
        Instead, they reside within a process’s memory

    - one task can be executed at a time 
    - threads can communicate with one another 
        through message passing or sharing data in the process’s memory

    - one process can have multiple threads
    - lightweight in comparison to processes
        bcz no extra memory not required, uses process memory 

 //======================================================================================

*/