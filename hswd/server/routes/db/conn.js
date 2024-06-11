const mongoose = require("mongoose")
mongoose.connect(`${process.env.MONURL}`, {

  // useCreateIndex: true // Use this to avoid deprecation warning for ensureIndex
}).then(()=>{console.log("successful")}).catch((e)=>{
  console.log(e);
})