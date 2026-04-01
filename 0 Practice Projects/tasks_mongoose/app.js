import express from 'express'
const app = express();
import path from 'path'
import { fileURLToPath } from 'url';
import users from './usermodel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/create', async(req,res)=>{

    let {name, domain, img} = req.body
    await users.create({
        name,
        domain,
        img,
    });
    res.redirect('/read')
})
app.get('/read', async (req,res)=>{
    let data = await users.find();
    res.render('data',{data})
})

app.get('/clear', async(req,res)=> {
    await users.deleteMany({})
})
app.get('/delOne/:id', async(req,res)=>{
    let id = req.params.id;
    await users.findOneAndDelete({_id : id});
    res.redirect('/read')
})
app.get('/edit/:id',async (req,res)=>{
    let id = req.params.id;
    let editData = await users.findOne({_id : id});
        res.render('edit', {data : editData});
})
app.post('/edited',async(req,res)=>{
    let {name, domain, img, _id} = req.body;
    await users.findOneAndUpdate({_id,},{
        name, domain, img,
    },{new:true})
    res.redirect('/read')
})
app.listen(3000);