import express from 'express'
const app = express();
import users from './models/user.model.js'

app.get('/',async (req,res)=>{
    try{
        await users.create({
            email : 'Aryaman',
            password : 'Hellooo'
        })
        res.json({
            message:'Created',
        })
    }
    catch(err){
        console.log(err)
    }
})


export default app;