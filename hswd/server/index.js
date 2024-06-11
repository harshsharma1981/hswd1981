// imported liberary
require('dotenv').config({ path: '.env.hswd' });
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require("cors");

// impoting routes here
const Signup = require("./routes/db/Signup")
const Login = require("./routes/db/Login");
const MyChatDetails = require('./routes/MyChatDetails');
const diary = require('./routes/diary');
const receiveaddfriend = require('./routes/receiveaddfriend');
const acceptreject = require('./routes/acceptreject');
const AuthControl = require('./routes/middleware/Authcontrol');
const GetDiary = require('./routes/GetDiary');
const deletediary = require('./routes/deletediary');
const FeedbackData = require('./routes/FeedbackData');
const app = express();
const PORT = process.env.PORT || 3001; // Choose any available port
require("./routes/db/conn")

// Middleware to parse JSON body
app.use(bodyParser.json());
// const option= cors({ origin: 'http://192.168.0.3:3000' })
app.use(cors({ origin: 'https://hswd1981.netlify.app' }))
// Route to handle signup POST requests
app.use("/api/signup" , Signup)
app.use("/api/diary" ,AuthControl, diary)
app.use("/api/getDiary" ,AuthControl, GetDiary)
app.use("/api/login" , Login)
app.use("/api/mychatdetails" ,AuthControl, MyChatDetails)
app.use("/api/receiveaddfriend" ,AuthControl, receiveaddfriend)
app.use("/api/acceptreject" ,AuthControl, acceptreject)
app.use("/api/deletediary" ,AuthControl, deletediary)
app.use("/api/feedbackdata" ,AuthControl, FeedbackData)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
