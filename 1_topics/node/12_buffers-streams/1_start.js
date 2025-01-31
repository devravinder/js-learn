const fs = require('fs');
const { PassThrough } = require("stream");
const zlib = require('zlib');


/* 
  Streams:-
    - continuous data flow is called stream.
       - one piece of data is called - chunk

    - useful for processing large data,
        without waiting for the entire data set to be available.

    - these are EvenEmitters internally


   Types:-
    - Readable Streams: Used to read data 
                    - e.g., fs.createReadStream for reading files
    - Writable Streams: Used to write data 
                    - e.g., fs.createWriteStream for writing files
    - Duplex Streams: Act as both readable and writable streams 
                    - e.g., sockets
    - Transform Streams: Duplex streams that can modify or transform data 
                    - e.g., zlib.createGzip for compressionn


    Methods & Events:
      
     - Readable Streams
        Methods:
            stream.read([size]): Reads data from the stream.
            stream.pipe(destination): Pipes the stream to a writable stream.

        Events:
            data: Fired when data is available to read.
            end: Fired when there’s no more data.
            error: Fired when an error occurs.

     - Writable Streams
        Methods:
            stream.write(chunk): Writes data to the stream.
            stream.end(): Signals that writing is complete.

        Events:
            drain: Indicates it's safe to write more data.
            finish: Fired when all data has been flushed.
            error: Fired when an error occurs.


============================

 Buffers:
    - A Buffer is a temporary storage area for *binary data*. 
    - It is used in Node.js to handle binary data directly, 
           such as files, streams, and other I/O operations. 
    - Buffers are especially useful when working with streams because data chunks are stored as buffers.

    - Buffers store raw binary data.
    - once the buffer size is fixed we can't resize.
    - Buffers are instances of the Buffer class

*/

// all the below example uses built in streams

const ex1 = () => {
    const readable = fs.createReadStream('./input.txt');
    readable.on('data', (buffer) => {
        //data is in binary format ( buffer )
        console.log(buffer.toString())
    })

    readable.on('end', () => {

        console.log("====================")
        console.log('Data read successfully!');
    });

}

const ex2 = () => {
    const writable = fs.createWriteStream('./output.txt');

    // Write data to the file
    writable.write('Hello, World!\n');
    writable.write('This is a writable stream example.\n');

    // Close the stream
    writable.end(() => {
        console.log('Data written successfully!');
    });
}

const ex3 = () => {
    const readable = fs.createReadStream('input.txt');

    const writable = fs.createWriteStream('output.txt');
    // Pipe the readable stream into the writable stream
    readable.pipe(writable);

    readable.on('end', () => {
        console.log('Data copied successfully!');
    });
}


// read & write through duplex
const ex4 = () => {

    const readable = fs.createReadStream('input.txt');

    const writable = fs.createWriteStream('output.txt');
    const passThrough = new PassThrough();



    let totalBytes = 0;

    passThrough.on("data", (chunk) => {
        // we can do somthing with the chunk
        totalBytes += chunk.length;
        console.log(`Bytes processed: ${totalBytes}`);

    });

    passThrough.on("end", () => {
        console.log(`Total bytes processed: ${totalBytes}`);
    });

    readable.pipe(passThrough).pipe(writable)
}


const ex5 = () => {


    const zipFile = (onFinishCb) => {
        const gzip = zlib.createGzip(); // zip transform

        const readStream = fs.createReadStream('./input.txt');
        const writeStream = fs.createWriteStream('./input.txt.gz');

        readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
            console.log('File compressed');

            onFinishCb()
        });
    }

    const unZipFile = () => {
        const gunzip = zlib.createGunzip(); // unzip transform

        const readStream = fs.createReadStream('./input.txt.gz')
        const decompressed = fs.createWriteStream('./unzip.txt');

        readStream.pipe(gunzip).pipe(decompressed).on('finish', () => {
            console.log('File decompressed');
        });

    }

    zipFile(()=>{
        unZipFile()
    })




}

const start = () => {
    ex5()
}

start()