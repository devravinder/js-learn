const readline = require('readline');

/* 
 Promise.
    all
    race
    any
    allSettled
    resolve
    reject
    --- new--
    try
    withResolvers


*/

const readData = (successCallback, errorCallback) => {
    setTimeout(() => {
        if (error)
            errorCallback('Some error');
        else
            successCallback('some data');
    }, 1000)
}


const promiseAll = async () => {

    /* 
    If all promises resolve, it returns an array of resolved values.
    If any promise rejects, it immediately rejects with that error.
    
    */

    const pr1 = readData();
    const pr2 = readData();
    const pr3 = readData();
    try {
        const data = await Promise.all([pr1, pr2, pr3]); // retruns array of results
        console.log(data);
    } catch (error) {
        console.log(error); // single error
    }

    // Promise.all([p1, p2, p3]).then(values => console.log(values));


}


const promiseRace = async () => {

    /* 
     Returns a promise that resolves or rejects as soon as any of the promises resolves or rejects.
    */

    const pr1 = Promise.resolve(1);
    const pr2 = Promise.resolve(2);
    const pr3 = Promise.resolve(3);
    try {
        const data = await Promise.race([pr1, pr2, pr3]); // single result
        console.log(data);
    } catch (error) {
        console.log(error) // single error
    }


}


const promiseAny = async () => {

    /* 
     Returns the result of first resolved promise. 
     If all promises reject, it rejects with an AggregateError
    */

    const p1 = Promise.reject('Error 1');
    const p2 = Promise.reject('Error 2');
    const p3 = Promise.resolve('Success');

    try {
        const data = await Promise.any([p1, p2, p3])
        console.log(data);
    } catch (error) {
        console.log(error) // arry of errors
    }

}

const promseAllSettled = async () => {

    /* 
    Returns an array of objects containing the status and value of each promise.
    */

    const p1 = Promise.resolve('Success');
    const p2 = Promise.reject('Error');

    const data = await Promise.allSettled([p1, p2])
    console.log(data) // array of results ( both success and error )
    /* 
     [
         { status: 'fulfilled', value: 'Success' },
         { status: 'rejected', reason: 'Error' }
     ]
    */


}

const promiseTry = async () => {

    /* 
     Promse.try takes a fun as argument and returns a  promise.
     - it is for clean code ( enhancement )

    Syntax: Prmose.try(func, arg1, arg2)
     Returns
        A Promise that is:
        Already fulfilled, if func synchronously returns a value.
        Already rejected, if func synchronously throws an error.
        Asynchronously fulfilled or rejected, if func returns a promise.
    
    */

    async function doSomething(action) {
        try {
            const pr1 = Promise.try(action) // returns promise
            const result = await pr1;

            console.log(result)
        } catch (error) {
            console.log("=========error==")
        } finally {
            console.log("Done");
        }
    }

    doSomething(() => "Sync result");

    doSomething(() => {
        throw new Error("Sync error");
    });

    doSomething(async () => "Async result");

    doSomething(async () => {
        throw new Error("Async error");
    });


}

const promiseWithResolvers = async () => {

    /* 
      Promise.WithResolvers() returns promise, resolve & reject
       - it is for clean code ( enhancement )

       const { promise, resolve, reject } = Promise.withResolvers();

    */


    // Function to wait for user input
    // we can use the same logic in UI -> button click : reject on cancel click & resolve on approval click

    // for more examples search in AI tools -> chatgpt, perplexity
    function waitForUserInput() {
        const { promise, resolve, reject } = Promise.withResolvers();

        const rl = readline.createInterface({input: process.stdin, output: process.stdout });

        rl.question('Type "yes" to resolve or "no" to reject: ', (answer) => {
            if (answer.toLowerCase() === 'yes') {
                resolve('Promise resolved with "yes"!');
            } else if (answer.toLowerCase() === 'no') {
                reject('Promise rejected with "no".');
            } else {
                reject('Invalid input. Please type "yes" or "no".');
            }
            rl.close();
        });

        return promise;
    }

    try {
        console.log('Waiting for your input...');
        const result = await waitForUserInput();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

const start = async () => {

    await promiseWithResolvers()

}

start()