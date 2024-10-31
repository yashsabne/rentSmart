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

const app = express();
 
app.use(cors({
  origin: process.env.BASE_FRONTEND_URL || 'http://localhost:3000',  
  credentials: true, 
}));

app.use(express.json());
app.use(express.static("public"));  
 


// Set up session
app.use(session({
  secret: 'yourhuhhhohSecretfkfjsofkjsfiKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000 },
  secure: false,  
  sameSite: 'none'  
}));

 
 
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes); 
app.use("/users", userRoutes); 
app.use('/payment',razorpaymentOption)
 
const server = http.createServer(app);  
 
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017', {
  dbName: "Dream_Nest"
  })
  .then(() => {
     
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`Database connection error: ${err.message}`));

 
 