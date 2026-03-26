import express from 'express'
const app = express();
import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addTask(obj) {
    try{
        let data = await fs.readFile('./file.json','utf-8')
    data = JSON.parse(data);
    data.push(obj);
    data = JSON.stringify(data);
    await fs.writeFile('file.json', data);
    return data;
    }
    catch(err){
        console.log(`addTask error: ${err}`)
    }
    

}
async function files(){
    try{
        let data = await fs.readFile('file.json','utf-8')
    data = JSON.parse(data);
    return data;
    }
    catch(err){
        console.log(`Files error ${err}`)
    }
    
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname,'public')));

app.get('/',async (req,res)=>{
    let data = await files();
    res.render('index',{tasks:data})
})
app.post("/submit",async (req,res)=>{
    await addTask(req.body)
    let data = await files()
    res.render('index',{tasks : data})
    res.redirect('/')
})

app.listen(3000)