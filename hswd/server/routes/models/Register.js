const mongoose= require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userschema = new mongoose.Schema({
    devices:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
       
    },
   confirmpassword:{
        type: String,
        required: true,
     
    }
})
//gennerating token
userschema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRETKEY,{ expiresIn: '72h' })
        // this.tokens = this.tokens.concat({token:token})
      
        // console.log("this is token at register ", token)
        return token
    } catch (error) {
        console.log("  this error belongs to register authentication",error,"end here")
    }
}


//pass hash
userschema.pre("save", async function(next){
    try {
        
        if (this.isModified("password")){
    
    this.password = await bcrypt.hash(this.password,10)
    
    this.confirmpassword= this.password
    next()
        }
    } catch (error) {
        
    }
})

const Register = new mongoose.model("Register", userschema)
module.exports = Register