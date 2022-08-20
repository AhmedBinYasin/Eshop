const mongoose = require("mongoose")
const mongoURL="mongodb://localhost:27017/Eshop"
const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected")
    })
}

/*mongodb+srv://ahmed:abin1234@cluster0.nx2wul9.mongodb.net/Eshop?retryWrites=true&w=majority*/

module.exports=connectToMongo;