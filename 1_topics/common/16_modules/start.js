
/* 

  What is a Module in JavaScript?
  - A module is a reusable piece of code that is separated into its own file
    and can be imported into other files. 
   - It helps in code organization, reusability, and maintainability.

    In JavaScript, modules are required to:
    ✅ Avoid global scope pollution
    ✅ Enable code reuse and modularity
    ✅ Make debugging and testing easier
    ✅ Improve maintainability in large applications

  Types:-
   - CommonJs  (CJS)
   - EsModule  (ESM)
   - RequireJs (AMD) - Asynchronus Modules
   - Universal Module Definition (UMD)



  Commonjs vs EsModule
  ----------------------
    | Feature               | CommonJS (require)     | ES Modules (import)              |
    |-----------------------|------------------------|----------------------------------|
    | Syntax                | const x = require('x') | import x from 'x'                |
    | Export                | module.exports = x     | export default x or export { x } |
    | Import Time           | Synchronous            | Asynchronous                     |
    | File Extension        | .js (default)          | .mjs (or "type": "module")       |
    | Top-Level await       | ❌ Not supported       | ✅ Supported                     |
    | __dirname, __filename | ✅ Available           | ❌ Not available                 |
    | Works in Browser?     | ❌ No                  | ✅ Yes                           |



*/