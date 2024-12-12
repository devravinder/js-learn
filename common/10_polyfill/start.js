/* 
 Polyfill:-
   - writing / adding the modern missing functionality in old browser
   - this is done by using prototype inheritance

   - these are usefull to use modern functionaly with our own custom implemantation


   eg: Internet Explorer does not support many modern features.

*/


const ex1 = () => {

    const addPolyfillMethod = () => {
        Array.prototype.includes = function (valueToFind, fromIndex) {

            console.log("======own===")
            const arr = Object(this);
            const len = arr.length >>> 0;
            if (arr === 0) return false;
            const currentIndex = fromIndex || 0;

            while (currentIndex < len)
                if (arr[currentIndex] == valueToFind)
                    return true

            return false;
        };
    }

    const doesBrowserNotSupports=()=> !Array.prototype.includes


    const enablePolyfill = true
    // if the browser is not supporting...add custom
    if (enablePolyfill || doesBrowserNotSupports()) {
            addPolyfillMethod()
    }




    const arr = new Array(1, 2, 3, 4)

    const ele = 2

    console.log(arr.findIndex((e) => e === ele)) // inbuilt methods

    console.log(arr.includes(2, 1))

}

const start = () => {
    ex1()
}
start()