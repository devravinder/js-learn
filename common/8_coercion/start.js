/* 

  ref: https://github.com/denysdovhan/wtfjs

  Coercion:- 
  - conversion of one data type to another data type while performing operations along with operators


  Note:- 
      - comparison operators (==, !=) operates on
           - numbers  ( high priority )
           - strings
           - boolean


      - arithmetic operators (+, -, *, /, %) operates on
         - numbers
            - so if parsable values are there...it converts
               eg:
                  '3' - 1 // 2

         
         - but '+' 
              - works on string as well ( concatenation happens )
              - high priority for stings over numbers  ***
              - for other than string, it calls toString() internally,
                 then performs concatenation

               so:
                 '3' + 1 
                  '3' + '1' // 31  

      - logical operators (&&, ||, !) operates on
         - boolean

      -  <,>, <=, >= operates on
         - numbers



 Note:-
     - Truthy values means not true
     - Falsy values means not false     
     
     - to check exact boolean value of Truthy/False value...do '==='
       eg: 
         1. [] === false  // false
         2. [] === true   // false

     - but when we do operations on Truthy/Falsy values, 
        thy will get coerced to their corresponding values depending on operator

        eg:  
            == works on number and boolean, numbers are high priority   

          1. [] == true   // false
             +[] == +true
             0 == 1     

          2. [] == false  // true
             +[] == +false
             0 == 0




 1. Arrays are truthy, but not true
     - toNumber([]) gives '0'
     - ![] gives false  , bcz '!' of truthy is false

     1. 
        false == []   // true

        explanation:
        +false == +[]       // '==' not '===' so coercion happens
        0 == 0


     2. ![] + []   => 'false'   // string

        explanation:
         ![] + [] 
         false + []
         false + ""
         "false"

  2. null is falsy, but not false
      +null // '0'
      !null // true, bcz '!' of falsy is true

  3. ''  (empty string) is falsy, but not false
      +'' // '0'
      !'' // true

  3. "b" + "a" + +"a" + "a"; // -> 'baNaNa'
     
      Explanation:
      ("b" + "a") + (+"a") + "a";
      ba + NaN + a
      baNaNa


  3. NaN === NaN; // -> false  // equal check

     ref: https://262.ecma-international.org/#sec-isstrictlyequal
     ref: https://262.ecma-international.org/#sec-numeric-types-number-equal

     Explanation:
       as per ECMA-262, 
       while performing '==' (equal check) on numbers,
       if any one of the number is NaN then result is false


     Note:-  equal check is different from  value check
             equal check (== or ===) , value check ( Object.is(arg, arg))


   4. Object.is(NaN, NaN) // true   // value check

   5. [1, 2, 3] + [4, 5, 6]; // -> '1,2,34,5,6'

      Explanation:
      [1, 2, 3] + [4, 5, 6]; // call to string()
      '1,2,3'+'4,5,6';
      '1,2,34,5,6'


   6.
      parseInt("f*ck"); // -> NaN   // in base 10
      parseInt("f*ck", 16); // -> 15  // in base 16

      Explanation:
        parseInt will continue parsing character-by-character until it hits a character it doesn't know.
        The f in 'f*ck' is the hexadecimal digit 15


        eg: parseInt("12*0")  // 12


    7. 
      10000000000000000 + 1.1; // -> 10000000000000002


     - JavaScript uses the IEEE 754 standard for representing numbers.
     - 64-bit floating-point values ( double floation )
     - This format can accurately represent integers up to 2^53 - 1
     - if the number is too large & has floating means
        it'll ignore the floating part & round ups to the nearest  even number

      so:
      
      Explanation:
      10000000000000000 + 1.1;
      10000000000000001.1
      10000000000000002  (round up)



      2. 
        a. 0.1 + 0.2; // -> 0.30000000000000004
        b. 0.1 + 0.2 === 0.3; // -> false


        - when we are doing math operations on floats... it converts to IEEE 754 (64-bit floating-point)

        - but for 0.2 the closest double is larger than 0.2
            for 0.1 the closest double is equal to 0.1

        Expanation for b:    
        so the result 
           - on left side is larger than 0.3
           - on the right it is rational number (0.3) // its just 0.3



    8. 
        1 < 2 < 3; // -> true
        3 > 2 > 1; // -> false

        Explanation:

        1 < 2 < 3
        true < 3
        +true < 3
        1 < 3  // true

        3 > 2 > 1 
        false > 1
        +false > 1
        0 > 1 // false


  9. we can any function with back ticks ``
     - the the arguments are passed as array

     - the the string is splitted with regex mathing ${}
     - all the string parts will be passed as array of strings at the 0th index of main array,
        and all the substitutions will be appended to the main array as elemenst
        
        
      eg:


    function f(...args) {
        console.log(args)
      }

      f`true is ${true}, false is ${false}, array is ${[1, 2, 3]}`;

      // the output
        [
            [ 'true is ', ', false is ', ', array is ', '' ],
            true,
            false,
            [ 1, 2, 3 ]
        ]


         

*/


const ex1=()=>{
    /* 
     -  Arrays are truthy
     -  empty arry is equal to
            - false  for boolean
            - 0 for number
           
    */
    const arr = [] 

    let bool = !arr
    console.log(bool, " ", typeof bool)

    let num = +arr
    console.log(num, " ", typeof num)

    let str = ![] + []
    console.log(str, " ", typeof str)

    bool = !null
    console.log(bool, " ", typeof bool)
    
    num = +null
    console.log(num, " ", typeof num)

    bool = !''
    console.log(bool, " ", typeof bool)
    
    num = +''
    console.log(num, " ", typeof num)
    console.log('' === false)
    console.log('' === true)

    console.log("================")
    console.log(parseInt('fuck'))
    console.log(parseInt('f*ck', 16))
    console.log(parseInt("12*0"))


    console.log("==============================")

    console.log(10000000000000000 + 1.1)
    console.log(0.2 + 0.1) // 0.30000000000000004

    function f(...args) {
        console.log(args)
      }

      f`true is ${true}, false is ${false}, array is ${[1, 2, 3]}`;
    
}


const start = async () => {

    ex1()
}

start()