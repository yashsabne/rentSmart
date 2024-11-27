require('dotenv').config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const session = require('express-session');
const nodemailer = require('nodemailer');
const User = require("../models/User");
const express = require('express');
const UserProfileImages = require('../models/UserProfilePhotos')
  
const storage = multer.memoryStorage();
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
      const { firstName, lastName, email, password, phone } = req.body;
      const profileImage = req.file;


      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: "User already exists!" });
      }

      if (!profileImage) {
        return res.status(400).json({ message: "Profile image is required!" });
      }
      if (!["image/jpeg", "image/png"].includes(profileImage.mimetype)) {
        return res.status(400).json({ message: "Invalid image format. Only JPEG and PNG are allowed." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new User with binary image
      const newUser = new User({
          firstName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          profileImage: {
              data: profileImage.buffer,
              contentType: profileImage.mimetype,
          },
      });

      const newImageProfile = new UserProfileImages({
        userId: newUser._id, // Reference the newly created user's ID
        profileImage: {
          data: profileImage.buffer,
          contentType: profileImage.mimetype,
        },
      });
      await newImageProfile.save();

      // Save the new User
      await newUser.save();
      res.status(200).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

router.get('/get-profile-picture-user/:userId', async (req,res) => {

  const {userId} = req.params

  const userProfile = await UserProfileImages.findOne({userId:userId});

  

  if (!userProfile) {
    return res.status(404).send("User not found.");
  }

  if (!userProfile.profileImage) {
    return res.status(404).send("Photo not found.");
  }

  const photo = userProfile.profileImage;

  res.contentType(photo.contentType);
  res.send(photo.data);
})


// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1d' });
        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
 

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:3001/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try { 
//         const user = await User.findOne({ email: profile.emails[0].value });

//         console.log(user)

//         if (!user) {
//           // If the user doesn't exist, do not create a new user
//           return done(null, false, { message: 'User does not exist. Registration via Google is not allowed.' });
//         }
 
//         done(null, user);
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });


// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token (valid for 1 hour)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; 
        await user.save(); 
        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

        // Send reset email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>To reset your password, click the link below:</p>
                   <p><a href="${resetURL}">Reset Password</a></p>`,
        });

        res.status(200).json({ message: "Password reset link sent to email." });
    } catch (error) {
        console.error('Error processing forgot password:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({
            _id: decoded.id,
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },  
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
 
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;


module.exports = router;
