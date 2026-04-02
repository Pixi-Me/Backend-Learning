import mongoose from 'mongoose'

async function connectDB() {
    try {
        await mongoose.connect(
            'mongodb+srv://p1x3l5:Ary%40m%40n2005@testing-cluster.kazzfrf.mongodb.net/test?appName=Testing-cluster'
        );
        console.log('Connected to DB')
    }
    catch (err) {
        console.log(err)
    }

}

export default connectDB;