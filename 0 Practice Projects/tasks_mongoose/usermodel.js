import mongoose from 'mongoose'
mongoose.connect(`mongodb://localhost:27017/database`)
const userSchema = mongoose.Schema({
    name : String,
    domain : String,
    img : String
})

export default mongoose.model("user", userSchema);