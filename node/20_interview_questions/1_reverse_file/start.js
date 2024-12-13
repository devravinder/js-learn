
/* 
 Question:- Reverse a file which is very large
 
  Filde Descripters 
     - can read/write a file from a given position
          - takes args:
                buffer - to hold the data
                offset - how many bytes to skip from the given postion
                length - how many bytes to read
                position - where to start reading

 Logic:- 
     - let's say we are reading 1024 bytes at a time ( bytesToRead )
     - get the size of the file ( fileSize )
     - use pointer 'position' for traversing ( initial position is 'fileSize' )
     - open the file in read mode with file descriptor
         - at the pointer 'position'
         - with size 'bytesToRead'
         - once the reading is done
              - update the  'position' = 'position' - 'bytesToRead'

     - read the buffer & convert to string and process

      - Note:- 
          - while reading, the data may have partial line ('inCompleteLine')
          - store the 'inCompleteLine' & process this with the next chunk

      


*/


const fs = require('fs');


const ONE_TIME_TO_READ = 1024 // bytes

const offset = 0

const reverseFile = async(inputFile, outputFile, chunkSize)=>{

    const {promise, resolve, reject } = Promise.withResolvers()

    const fileStat = fs.statSync(inputFile);
    const fileSize = fileStat.size

    let position = fileSize;
    let inCompleteLine = ''

    const writeStream = fs.createWriteStream(outputFile)

    const writeToTheFile=(data)=>{
        writeStream.write(data)
    }

    const processData=(data)=>{
        data = data + inCompleteLine // append the prevois inCompleteLine
        let lines = data.split('\n')
        inCompleteLine = lines.shift()
        
        writeStream.write(lines.reverse().join('\n') + '\n') // keep the cursor to the next line
    }

    const readChunk=()=>{

        const bytesToRead = Math.min(position, chunkSize)
        position -= bytesToRead

        const fd = fs.openSync(inputFile,'r')

        const buffer = Buffer.alloc(bytesToRead);
        fs.readSync(fd, buffer, offset, bytesToRead, position);
        fs.closeSync(fd);


        const data = buffer.toString('utf8')
        processData(data)

        if(position > 0)
            setImmediate(readChunk)
        else{
            writeToTheFile(inCompleteLine) // write the remaining
            writeStream.end(()=>resolve('Reverse completed'))
        }



    }
    writeStream.on('error', reject)
    readChunk()


    return promise

}


const start = async () => {
  const result = await reverseFile('MOCK_DATA.csv', 'REVERSE_MOCK_DATA.csv', ONE_TIME_TO_READ)
  console.log({result})
}

start()