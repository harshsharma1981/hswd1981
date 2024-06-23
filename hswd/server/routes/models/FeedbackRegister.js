const mongoose= require("mongoose")
const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    feedback:[],
    
})
const FeedbackRegister = new mongoose.model("FeedbackRegister", userschema)
module.exports = FeedbackRegister