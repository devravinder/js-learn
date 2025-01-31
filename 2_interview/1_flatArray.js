const input = [1,2,3,[4,[5,6,[7,8,[9,10]]]]]

// const output = [1,2,3,4,5,6,7,8,9,10]


const flat=(arr=[])=>{

    const res = []

    arr.forEach(e=>{
        if(typeof e ==='object'){
            res.push(...flat(e))
        }
        else res.push(e)
    })

    return res;

}

const output = flat(input);

console.log({output})