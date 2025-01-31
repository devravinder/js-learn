
/* 
 Promises are a mechanism for handling asynchronous operations.
  
 Promise gives a future unknown result, it may be resolved or rejected.

 states:
     - pending
     - settled
        - fulfilled
        - rejected

 methods:
     - then
     - catch
     - finally

*/

const error = false;
const readData=(successCallback, errorCallback)=>{
    setTimeout(()=>{
        if(error)
            errorCallback('Some error');
        else
            successCallback('some data');
    },1000)
}


// 
const readDataPromise = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(error)
                reject('Some error');
            else
                resolve('some data');
        },1000)
    })
}

readDataPromise()
    .then((data)=>{
        console.log(`Promise.then ${data}`);
    })
    .catch((error)=>{
        console.log(error);
    })


console.log("==============aysn/await=====================")    

const readDataAsync = async ()=>{
    try{
        const data = await readDataPromise();
        console.log(`async/await: ${data}`);
    }catch(error){
        console.log(error);
    }
}

readDataAsync()

// ================ callback to promise ================

const callbackToPromise = ()=>{
    return new Promise((resolve, reject)=>readData(resolve, reject))
}
