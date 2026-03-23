const fs = require('node:fs/promises');

let command = process.argv[2];
let arg2 = process.argv[3];
let arg3 = process.argv[4];


async function getGata(params) {
    
}

async function addNote() {
    let note = {
        title : arg2,
        data : arg3,
    };

    let adder = await fs.readFile("./notes.json",'utf-8');
    let data = JSON.parse(adder);
    data.push(note);
    data = JSON.stringify(data);
    await fs.writeFile('notes.json', data);
    console.log(data);

}

async function removeNote(){
    
}

if(command==='add'){
    addNote();
    
}

