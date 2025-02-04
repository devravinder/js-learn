/* 
  Garbage Collection (GC):-
    - Garbage Collection (GC) is an automatic process in Node.js (V8 Engine) 
      - that frees up memory by removing objects no longer in use.
    - This prevents memory leaks and improves performance.


    -  Two Garbage Collection Phases:

        - Minor GC: 
            - Cleans Young Generation (fast & frequent)
                - short lived objects
                    
        - Major GC: 
            - Cleans Old Generation (slow & less frequent).
                - long lived objects


    - V8 uses three techniques to manage memory:

        - Reference Counting:
          -	Deletes objects when references drop to 0
            - used for: Short-lived objects

        - Mark and Sweep:
          -	Marks live objects & sweeps out unused ones
            - used for: Long-lived objects

        - Stop-the-World:
          -	Pauses execution during GC (slows performance)
            - used for:	Large memory cleanup


    - to acess gc
       - node --expose-gc start.js
*/

const trigger = () => {
  global.gc(); // Forces GC
  console.log("Garbage Collection Triggered!");
};


const start=()=>{
    trigger()
}

start()