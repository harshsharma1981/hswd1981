const mongoose= require("mongoose")
const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    friendlist:[],
    requestfriendlist:[],
    sentrequestfriendlist:[]
})
const ChatRegister = new mongoose.model("ChatRegister", userschema)
module.exports = ChatRegister