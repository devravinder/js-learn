/* 
  Let vs Var
  -----------------

  ref: https://stackoverflow.com/questions/762011/what-is-the-difference-between-let-and-var

  SuGHaR
  ---
  S: Scoping
    - var has function scope (immediate function scope), 
    - let has block scope (immediate block scope)

  G: Global State
    - top level declaration
       - var is global scope in js ( but not in nodejs )
       - let is is not global scope

  H: Hoisting
     - var is hoisted & intialized to undefined
        - Accessing them before the initialization results in undefined
     - let is hoisted but not intialized ( said to be in Termporal Dead Zone)
        - Accessing them before the initialization results in a ReferenceError

  R: Redeclaration
     - var can be redeclared
     - let cannot be redeclared

*/