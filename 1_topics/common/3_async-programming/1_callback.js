
/* 
 A callback is a function passed as an argument to another function, 
 which is executed later within that function.
*/

const error = false;
const readData=(successCallback, errorCallback)=>{
    setTimeout(()=>{
        if(error)
            errorCallback('Some error');
        else
            successCallback('Data');
    },1000)
}


readData(
    (data)=>{
        console.log(data);
    },
    (error)=>{
        console.log(error);
    }
)


console.log("========callback hell=============")


const emailVerification = (successCallback, errorCallback) => {
  setTimeout(() => {
    if (error) errorCallback("Email verification failed");
    else successCallback("Email verified");
  }, 1000);
};

const mobileVerification = (successCallback, errorCallback) => {
  setTimeout(() => {
    if (error) errorCallback("Mobile verification failed");
    else successCallback("Mobile verified");
  }, 1000);
};

const twoStepAuth = (successCallback, errorCallback) => {
  setTimeout(() => {
    if (error) errorCallback("Two-step authentication failed");
    else successCallback("Two-step authentication completed");
  }, 1000);
};

// Callback hell example
emailVerification(
  (emailMessage) => {
    console.log(emailMessage);
    mobileVerification(
      (mobileMessage) => {
        console.log(mobileMessage);
        twoStepAuth(
          (authMessage) => {
            console.log(authMessage);
            console.log("User registration successful");
          },
          (authError) => {
            console.error(authError);
          }
        );
      },
      (mobileError) => {
        console.error(mobileError);
      }
    );
  },
  (emailError) => {
    console.error(emailError);
  }
);

// 
