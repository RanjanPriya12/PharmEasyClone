const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=()=>{
    return mongoose.connect(process.env.ATLAS_URL);
    // return mongoose.connect('mongodb+srv://ayush:ayush@cluster0.1rqfr.mongodb.net/PharmEasyDB?retryWrites=true&w=majority');
}

module.exports=connectDB;