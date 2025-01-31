
/* 
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