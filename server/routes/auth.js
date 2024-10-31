require('dotenv').config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const session = require('express-session');
const nodemailer = require('nodemailer');
const User = require("../models/User");
const express = require('express');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");  
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  
  },
});

const upload = multer({ storage });
 

let otpHolder = [];
 
router.post("/send-otp-email", async (req, res) => {
  try {
    const email = req.body.email;

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  
    req.session.otp = otp; // Store OTP in session

    otpHolder.push(req.session.otp)
  
    console.log("OTP generated:", otp);
    console.log("Session after setting OTP:", req.session);
 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });
 

    const mailOptions = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: "OTP for Registration",
      html: `<p>Hello,</p><p>Your OTP for registration is: <strong>${otp}</strong></p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});
 
router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  const sessionOtp = otpHolder[otpHolder.length-1]

  
  if (parseInt(otp) === sessionOtp) {
     req.session.otp  = null; 
    res.status(200).json({ success: true, message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});
 
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password,phone } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // Save the new User
    await newUser.save();
    res.status(200).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
