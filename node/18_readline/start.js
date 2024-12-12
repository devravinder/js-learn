const readline = require('node:readline');
const { promisify } = require("node:util")


/* 
 inquirer: a third party package offer more features

*/


const ex1 = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(`What's your name? `, name => {
        console.log(`Hi ${name}!`);
        rl.close();
    });

}

const ex2 = () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = promisify(rl.question).bind(rl);

    question(`What's your name? `).then(name => {
        console.log(`Hi ${name}!`);
        rl.close();
    });
}


const ex3=async()=>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = promisify(rl.question).bind(rl);

    const name = await question(`What's your name? `);
    const city = await question(`What's your city? `);
    const dist = await question(`Hi ${name}!, how far your city from BLR? `)
    console.log({name, city, dist})
    rl.close();
}

const start = async() => {
    ex3()
}
start()