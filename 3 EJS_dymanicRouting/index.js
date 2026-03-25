import express, { request } from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs'); //Importing EJS
app.use(express.static(path.join(__dirname,'public'))); // Now can addd other files in public like css js and pictures

app.get('/',(req,res)=>{
    res.render('main');
});
app.get('/profile/:username',(req,res)=>{ //Dymanic routing :variable
    res.send(req.params.username)
})

app.listen(3000, ()=>{
    console.log('Running')
})