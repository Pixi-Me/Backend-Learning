import mongoose from 'mongoose'

let userSchema = mongoose.Schema({
    email: String,
    password:String
})

export default mongoose.model('user',userSchema)