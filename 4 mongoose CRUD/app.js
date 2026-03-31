const express = require('express');
const app = express();
const userModel = require('./userModel')

app.get('/',(req,res)=>{
    res.send('Hey');
});

app.get('/create', async(req,res)=>{
    let created = await userModel.create({
        name : 'Aryaman',
        username : 'p1x1',
        email : 'harry@mail'
    })
    res.send(created);
})
app.get('/read',async(req,res)=>{
    let users = await userModel.find();
    res.send(users);
})
app.get('/update',async (req,res)=>{
    await userModel.findOneAndUpdate({username :'p1x1'}, {username:'p1x3l5'}, {new:true})
    res.redirect('/read')
})

app.get('/delete', async (req,res) =>{
    await userModel.findOneAndDelete({username : 'p1x3l5'});
    res.redirect('/read')
})

app.listen(3000);