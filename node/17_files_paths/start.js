const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');






// file stats
const ex1 = () => {

    const cb = () => {
        // fs.statSync
        fs.stat('./input.txt', (err, stats) => {
            if (err) {
                console.error(err);
            }
            console.log("=====in cb====")
            // we have access to the file stats in `stats`
            console.log(stats.isFile())
            console.log(stats.isDirectory())
            console.log(stats.isSymbolicLink())
            console.log(stats.size)

        });
    }

    const promise = () => {
        fsPromises.stat('./input.txt')
            .then((stats) => {
                console.log("======in promise=====")
                console.log(stats.isFile())
                console.log(stats.isDirectory())
                console.log(stats.isSymbolicLink())
                console.log(stats.size)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    cb()
    promise()
}


// path simple usage
const ex2 = () => {

    const usage1 = () => {

        const notes = 'folder/notes.txt'; // './folder/notes.txt';

        const dir = path.dirname(notes);
        const base = path.basename(notes);
        const ext = path.extname(notes);

        console.log({ dir, base, ext })

        console.log("===========")

        const baseName = path.basename(notes, path.extname(notes));
        console.log({ baseName })

        console.log("============")

        const joinResult = path.join('./', 'folder', 'notes.txt');

        console.log({ joinResult })

        const absPath = path.resolve('./folder', 'notes.txt'); // ('./folder/notes.txt')

        console.log({ absPath })


        // usefull when the path has relative path
        const normalizedPath = path.normalize('./folder/./notes.txt'); // removes . or .. after path calculation

        console.log({ normalizedPath })



    }
    usage1()

}


// file descriptors ( Imp )
const ex3 = () => {

    /* 

    Flags:-
    
     r = read only          
            - No file creation, if not exists

     w = write only
            - positions the stream at the *beginning of the file*

     a = append only
            - for writing only
            - positions the stream at the *end of the file*

     r+ = read and write
            - No file creation, if not exists

     w+ = write and read 
            - positions the stream at the *beginning of the file*
            - creates file, if not exists

     a+ = append and read
            - for reading and write
            - positions the stream at the *end of the file*
    */

    // fs.openSync
    // fsPromise.open
    fs.open('./folder/notes.txt', 'r', (err, fd) => {
        // fd is our file descriptor

        //  to store data
        const bufferSize = 1024;
        const buffer = Buffer.alloc(bufferSize);

        // based on the falg... we can do the allowed actions
        // Read from the file

        const readChunk = (position) => {

            fs.read(fd, buffer, 0, bufferSize, position, (err, bytesRead) => {
                if (err) {
                    console.error('Error reading file:', err);
                    fs.close(fd, () => { }); // Ensure the file is closed on error
                    return;
                }

                if (bytesRead > 0) {
                    const fileContent = buffer.toString('utf8', 0, bytesRead);

                    console.log(fileContent);

                    // Read the next chunk
                    readChunk(position + bytesRead);
                } else {
                    // End of file reached
                    console.log('=============completed');
                    // Close the file
                    fs.close(fd, (err) => {
                        if (err) console.error('Error closing file:', err);
                    });
                }
            });

        }

        // Start reading from the beginning
        readChunk(0);
    });

}


// reading file
const ex4=()=>{
        // fs.readFile, fs.readFileSync 
        fsPromises.readFile('./folder/notes.txt',{encoding:'utf8'})
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
}

// writing to file
const ex5=()=>{
    const content = 'Some content!';

    //  fs.writeFile, fs.writeFileSync
    fsPromises.writeFile('./folder/new.txt', content)
    .then(()=>{
        console.log('File written successfully');
    })
    .catch((err)=>{
        console.log(err)
    })
}

// is File
const isFile = fileName => fs.lstatSync(fileName).isFile()

// copy file

const copyFile = (src, dest)=> fsPromises.copyFile(src, dest)
const ex6=()=>{
    const src = './folder/notes.txt';
    const dest = './folder/notes_copy.txt';
    copyFile(src, dest)
    .then(()=>{
        console.log("copy done")
    })
    .catch((err)=>{
        console.log(err)
    })
}

// working with folders
const ex7=()=>{
        const dir = "./folder2/new";
        const access=()=>{
            fsPromises.access(dir)
            .then(()=>{
                console.log("folder exists")
            })
            .catch((err)=>{
                if(err?.message?.includes('no such file or directory')){
                    console.log("No dir: ", dir)
                    create()
                }
                else{
                    console.log(err)
                }
            })
        }

        const create=()=>{
            console.log("=======creating dir: ", dir)
            fsPromises.mkdir(dir,{recursive: true})
            .then(()=>{
                console.log("folder created")
            })
            .catch((err)=>{
                console.log(err)
            })
        }


        const read=()=>{
            const folderPath = "./folder";
            fsPromises.readdir(folderPath)
            .then((files)=>{
                const paths = files.map(fileName=> path.join(folderPath, fileName))
                const onlyFiles = paths.filter(isFile)
                console.log("========in read=======")
                console.log({onlyFiles})
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        const copy=()=>{
            
            // read the dir & loop over
            // if the file is a file, then copy to dest
            // else if it is dir...recursive call

        }
        const rename=()=>{
            const newName= `${dir}_renamed`
            fsPromises.rename(dir, newName)
            .then(()=>{
                console.log("=========in rename=========")
                console.log(`${dir} re-named to: ${newName}`)

                setTimeout(remove, 2000)
            }).catch((err)=>{
                console.log(err)
            })
        }

        const remove=()=>{
            const newName= `${dir}_renamed`
            fs.rm(newName, { recursive: true, force: true }, err => {
                console.log("=======in remove========")
                if (err) {
                  throw err;
                }
                console.log(`${newName} is deleted!`);
              });

        }

        access()
        //read()
        //rename()
}

const start = async () => {
    ex7()
}

start()