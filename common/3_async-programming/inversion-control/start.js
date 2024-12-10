/* 
 ref: https://frontendmasters.com/courses/rethinking-async-js/callback-problems-inversion-of-control/#


  Inversion of Control (IoC):
    - IoC is a programming principle where the flow of control of a program is inverted
       compared to the traditional programming.

    - The control is handed over to a framework or another component,
        which determines the execution sequence and dependencies(args), 
        Instead of the programmer dictating the flow, 



  The IoC is the main cocept behind the async programming ( callback & promises ).  


*/

const ex1 = () => {


    // the main task
    const add = (num1, num2) => {
        return num1 + num2;
    }

    const doSomethingWithResult = (sum) => {
        console.log('result: ', sum);
    }


    const traditionalEx = () => {



        // programming is directing the flow
        const addAndPrintTraditional = (num1, num2) => {
            /* 
             think 'addAndPrintTraditional' is like frame work.
              
             - in this  
                 - we don't have control over how the task results are used.
                 - we can only control the task arguments

            */

            const sum = add(num1, num2); // task
            doSomethingWithResult(sum); // doing something with task results
        }

        // only we can control the args of frame work
        addAndPrintTraditional(1,2);
        addAndPrintTraditional(3,4)

    }

    const iocProgrammingEx = () => {

        // control of the programming is handed over to callback
        const addAndPrintAsync = (num1, num2, cb) => {
            // this can be any task
            // may be another asyn task (like http request)
            const sum = add(num1, num2); 
            cb(sum)
        };


        // here we can control the args  & how the task results are used
        addAndPrintAsync(2, 3, (sum) => {
            doSomethingWithResult(sum);
        })

        addAndPrintAsync(4,5,(sum)=>{
            doSomethingWithResult(sum);
            const double = sum * 2;
            console.log('double',double)
        })


    }

    traditionalEx();

    console.log("==========")

    iocProgrammingEx();


}

const start = async () => {
    ex1();
}

start();