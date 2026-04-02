import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path'
import { fileURLToPath } from 'url';
import users from './usermodel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/read', async (req,res)=>{
    let data = await users.find();
    res.send(data)
})
app.get('/clear', async (req,res)=>{
    await users.deleteMany({});
    res.redirect('/')
})
app.post('/signIn', async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await users.findOne({email});
        if(!user){
            let hashedPassword = await bcrypt.hash(password,10);
            await users.create({
                email,
                password : hashedPassword,
            });
            res.send('Created')
        }
        
        else{
            bcrypt.compare(password, user.password, function(err,result){
                console.log(user.password)
                if(result) {
                    let token = jwt.sign({email},'thisIsASecret',{expiresIn: '1h'})
                    res.cookie('token',token);
                    res.send(`Welcome Back ${email}`)
                }
                else res.send('Wrong Details')
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(3000)