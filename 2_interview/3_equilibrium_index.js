/* 
 find the index of an array where, the left elements sum is equal to right elememts sum
    - exlude the index elemenet
    - if not found return -1;

*/



const input = [-7, 1, 5, 2, -4, 3, 0];

const equilibriumIndex=(arr=[])=>{


    let rightSum = arr.reduce((p,c)=>p+c,0)

    let leftSum = 0;

    for( let i=0; i< arr.length; i++){

         rightSum = rightSum - arr[i];

         if(leftSum === rightSum){
            console.log({leftSum, rightSum})
            return i;
         }
         leftSum = leftSum + arr[i]
    }
    return -1;
}

const index = equilibriumIndex(input);

console.log("whs",{index})