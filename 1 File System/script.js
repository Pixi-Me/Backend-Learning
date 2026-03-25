const { error } = require('node:console');
const fs = require('node:fs/promises');

if (process.argv[2] === 'clear') {
    async function creatingFIle() {
        try {
            await fs.writeFile('file.json', "[]")
            console.log('Cleaned')
        }
        catch (err) {
            console.log(err);
        }
    }
    creatingFIle();
}

else if (process.argv[2] === 'add') {
    async function adding() {
        try {
            if (!process.argv[3] || !process.argv[4]) {
                throw new Error('Invalid Inputs')
            }
            let data = await fs.readFile("./file.json", "utf-8")
            data = JSON.parse(data)
            let x = {
                title: process.argv[3],
                data: process.argv[4],
            }
            data.forEach((e) => {
                if (e.title === x.title) {
                    throw new Error('Title Already Exists')
                }
            })
            data.push(x)
            let final = JSON.stringify(data);
            await fs.writeFile('./file.json', final);
            console.log('Added');
        }
        catch (e) {
            console.log(e)
        }

    }
    adding()
}
else if (process.argv[2] === 'remove') {
    async function remove() {
        try {
            let data = await fs.readFile('./file.json', 'utf-8')
            data = JSON.parse(data);
            data.forEach((e, i) => {
                if (e.title === process.argv[3]) {
                    data.splice(i, 1);
                }
                else{
                    throw new Error('Title Does note exist. Try node script.js list')
                }
            })
            data = JSON.stringify(data);
            
            await fs.writeFile('./file.json', data);
        }
        catch(err){
            console.log(err)
        }
       
    }
    remove()
}
else if (process.argv[2]==='list'){
    async function list() {
        try{
            let data = await fs.readFile('./file.json','utf-8')
            data = JSON.parse(data);
            console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }
    list()
}



