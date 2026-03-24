import express from 'express'

const app = express();
app.get('/',(req,res)=>{
    res.send('Heyyy there bitchesss')
})

app.listen(3000,()=>{
    console.log('Running')
})