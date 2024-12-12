/* 
 pipeline:
  - utility  to simplify the chaining of multiple streams (readable, writable, or transform streams).
  - It ensures proper cleanup and error handling, making it easier to work with streams in a robust way.

  - it is internally a combination of .pipe() and .on('finish')

*/

const { pipeline } = require('stream');
const zlib = require('zlib');
const fs = require('fs');




const ex1 = () => {

  const readStream = fs.createReadStream('./input.txt');
  const writeStream = fs.createWriteStream('./input.txt.gz');
  pipeline(
    readStream,
    zlib.createGzip(),
    writeStream,
    (err) => {
      if (err) {
        console.error('Pipeline failed:', err);
      } else {
        console.log('Pipeline succeeded');
      }
    }
  );
}


const start = () => {
  ex1()
}
start()