const mongoose= require("mongoose")
const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    userid:{
        type: String,
        required: true,
        unique: true
    },
    messageslist:[]
})
const MessageRegister = new mongoose.model("MessageRegister", userschema)
module.exports = MessageRegister