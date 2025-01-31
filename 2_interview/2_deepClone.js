const input = {
    name:"whs",
    age: 20,
    address:{
        country:"India",
        
        home:{
            flat: 320,
            state: "KA"
        }
    }
}

const deepClone=(arg)=>{
  if(arg==null || arg==undefined || typeof arg !=='object')
    return arg;

  if(Array.isArray(arg))
     return arg.map(deepClone);

  const res = {}

  for( let key in arg){
    res[key] = deepClone(arg[key])
  }

  return res;

}

const cloneObject = deepClone(input);

console.log([cloneObject])