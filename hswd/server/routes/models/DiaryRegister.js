const mongoose= require("mongoose")
const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    diaryEntry:[
      { title:{ 
       type: String,
        required: true},
        diary:{
            type: String
        },
        date:{
            type: String
        }
        }
    ]
    
})
const DiaryRegister = new mongoose.model("DiaryRegister", userschema)
module.exports = DiaryRegister