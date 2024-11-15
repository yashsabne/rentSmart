const express = require("express");
const session = require("express-session");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors"); 
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const userRoutes = require("./routes/user.js"); 
const razorpaymentOption = require('./routes/razorpayment.js')
// const passport = require('passport');
 


const app = express();
 
app.use(cors({
  origin: process.env.BASE_FRONTEND_URL || 'http://localhost:3000',  
  credentials: true, 
}));

app.use(express.json());
app.use(express.static("public"));  
 
app.use(session({
  secret: 'hsfbgshdfbsdfbshdhfsdhbfhfbsdsfbsdfbdsfbdsfbdsjfbdfbdfbdjfbdjfbdbf',
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport and session
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', passport.authenticate('google', {
//   successRedirect: 'http://localhost:3000/dashboard',
//   failureRedirect: '/',
// }));

 
 
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes); 
app.use("/users", userRoutes); 
app.use('/payment',razorpaymentOption)
 
const server = http.createServer(app);  
 
const PORT = process.env.PORT || 3001;
 

mongoose.connect(process.env.MONGO_URI  || 'mongodb://localhost:27017',   { //'mongodb://localhost:27017',
  dbName: "Dream_Nest"
  })
  .then(() => {
     
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`Database connection error: ${err.message}`));

 
 
