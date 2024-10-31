require('dotenv').config();
const nodemailer = require('nodemailer'); 
const User = require("../models/User");
const Listing = require("../models/Listing");
const EmailRequest = require("../models/emailTracking");
const express = require('express');
const router = express.Router();



/* GET CONTACT PROPERTY OWNER */
router.get('/contact-property-owner', async (req, res) => {
  try {
    const { propertyId, userId } = req.query;

    // Fetch property listing by propertyId
    const propertyListing = await Listing.findById(propertyId).populate('creator');
    if (!propertyListing) {
      return res.status(404).json({ message: 'Property not found!' });
    }
    const receiverEmail = propertyListing.creator.email;

    // Fetch the user's email (sender's email) by userId
    const sender = await User.findById(userId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found!' });
    }
    const senderEmail = sender.email;

    res.status(200).json({ senderEmail, receiverEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching emails', error: err.message });
  }
});

/* POST REQUEST TO CONNECT */
router.post('/request-to-connect', async (req, res) => {
  const { receiverEmail, propertyId, nameofclient, userIdSender } = req.body;

  const emailRequest = new EmailRequest({
    userIdSender,
    receiverEmail,
    propertyId
  });
  await emailRequest.save();



  try {
    const propertyListing = await Listing.findById(propertyId).populate('creator');

    const firstNameOwner = propertyListing.creator.firstName;
    const lastNameOwner = propertyListing.creator.lastName;


    const emailOptions = {
      from: process.env.OWNER_EMAIL, // Client's email
      to: receiverEmail, // Property owner's email
      subject: "Phone Number Request for Your Property",
      html: `
        <p>Dear ${firstNameOwner} ${lastNameOwner},</p>
        <p>A potential buyer/renter, <strong> ${nameofclient} (${nameofclient})</strong>, is interested in your property <small>(id: ${propertyId})</small> listed on RentSmart.</p>
        <p><strong>Message from ${nameofclient}:</strong></p>
        <p>They have requested to connect and discuss further details, asking for your phone number.</p>
        <p>If you wish to share your phone number, please click the link below:</p>
        <p><a href="http://localhost:3001/users/approve-connect/${propertyId}/${userIdSender}">http://localhost:3001/approve-connect/${propertyId}/${userIdSender}</a></p>
        <p>Thank you,<br>The RentSmart Team</p>
      `,
    };

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    // Send the email
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Approve Connection Route
router.get('/approve-connect/:propertyId/:userIdSender', async (req, res) => {
  const { propertyId, userIdSender } = req.params;


  try {
    const propertyListing = await Listing.findById(propertyId).populate('creator');

    const propertyOwner = propertyListing.creator;

    console.log("propertyOwner", propertyOwner.email)

    const sender = await User.findById(userIdSender);


    console.log("sender", sender.email)

    if (!sender || !propertyOwner) {
      return res.status(404).json({ message: "User not found" });
    }

    // Email to Property Owner with Client's Contact
    const ownerEmailOptions = {
      from: process.env.OWNER_EMAIL,
      to: propertyOwner.email,
      subject: "Phone Number Request Approved",
      html: `
        <p>Dear ${propertyOwner.firstName} ${propertyOwner.lastName},</p>
        <p>You have approved the phone number request for your property (ID: ${propertyId}) to userId(${userIdSender}).</p>
        <p>Here is the contact information for the interested client:</p>
        <p>Name: ${sender.firstName} ${sender.lastName}</p>
        <p>Email: ${sender.email}</p>
        <p>Phone: ${sender.phone}</p>
        <p>Thank you for using RentSmart!</p>
      `,
    };

    // Email to Client with Property Owner's Contact
    const clientEmailOptions = {
      from: process.env.OWNER_EMAIL,
      to: sender.email,
      subject: "Phone Number Request Approved",
      html: `
        <p>Dear ${sender.firstName},</p>
        <p>The owner of the property (ID: ${propertyId}) has approved your phone number request.</p>
        <p>Here is the contact information for the property owner:</p>
        <p>Name: ${propertyOwner.firstName} ${propertyOwner.lastName}</p>
        <p>Email: ${propertyOwner.email}</p>
        <p>Phone: ${propertyOwner.phone}</p>
        <p>Thank you for using RentSmart!</p>
      `,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    await transporter.sendMail(ownerEmailOptions);
    await transporter.sendMail(clientEmailOptions);

    res.status(200).json({ message: "Contact information shared successfully" });
  } catch (error) {
    console.error("Error processing approval:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate("creator");
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Cannot find properties!", error: err.message });
  }
});

 
/* GET RECENT ACTIVITIES */
router.get('/:userId/recent-activities', async (req, res) => {
  const { userId } = req.params;
  try {
    const activities = await EmailRequest.find({ userIdSender: userId }).sort({ dateSent: -1 });
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

/* DELETE RECENT ACTIVITIES */
router.delete('/:userId/recent-activities-delete', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await EmailRequest.deleteMany({ userIdSender: userId });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'All recent activities deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'No activities found for this user.' });
    }
  } catch (error) {
    console.error('Error deleting activities:', error);
    return res.status(500).json({ error: 'Failed to delete activities' });
  }
});

/* SAVE PROPERTY */
router.post('/:userId/saved-property', async (req, res) => {
  try {
    const { listing } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the listing's _id already exists in savedProperties
    const isAlreadySaved = user.savedProperties.some(
      (savedProperty) => savedProperty._id.toString() === listing._id
    );

    if (isAlreadySaved) {
      return res.status(400).json({ message: 'Property already saved' });
    }

    user.savedProperties.push(listing);
    await user.save();

    res.status(200).json({ message: 'Property saved successfully!' });
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/* GET SAVED PROPERTIES */
router.get('/:userId/savedProperties', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const savedProperties = user.savedProperties;

    res.json({ savedProperties });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch saved properties' });
  }
});

router.delete('/:userId/savedProperties/:propertyId', async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    const user = await User.findById(userId)

    user.savedProperties = user.savedProperties.filter(
      (savedProperty) => savedProperty._id.toString() !== propertyId
    );


    await user.save()

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully', savedProperties: user.savedProperties });
  } catch (error) {
    console.error('Error deleting saved property:', error);
    res.status(500).json({ message: 'Server error while deleting property' });
  }
});


module.exports = router;
