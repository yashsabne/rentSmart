 
require('dotenv').config();
const Payment = require('../models/Payment');
const express = require('express');
const Razorpay = require('razorpay');
const Listing = require('../models/Listing');
const User = require('../models/User');
const nodemailer = require('nodemailer')
const router = express.Router();
const PromotedProperty = require('../models/PromotedProperties')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,

});
 

// Route to create an order
router.post('/create-order/:userIdSender', async (req, res) => {
  const { amount } = req.body;
  const { userIdSender } = req.params;

  try {
    // Find the user
    const user = await User.findById(userIdSender);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPremiumMember = user.premiumMember;

    if (!isPremiumMember) {
      if (user.hasReachedContactRevealLimit()) {
        return res.status(403).json({ message: "Contact reveal limit reached. Please upgrade to premium or try after a month." });
      }
    }

    // Set up order options for Razorpay
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
    };

    // Create the order with Razorpay
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});



router.post('/successful-payment/:orderId/:signature',async (req, res) => {
    const { orderId, signature } = req.params;
    const { propertyId, userId } = req.query;

    

    const property = await Listing.findById(propertyId).populate("creator");

    if (!property || !property.creator) {
        return res.status(404).json({ success: false, message: 'Property or creator not found.' });
    }
 
    const propertyCreator = property.creator;
    const { firstName, lastName, phone } = propertyCreator;

    const user = await User.findById(userId)

    const name = user.firstName;
   
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
        to: user.email,
        subject: "Successful Payment Confirmation & Contact Details Unveiled - RentSmart",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #f5f5f5; padding: 20px;">
                <h2 style="color: #4CAF50;">Congratulations on Your Successful Payment!</h2>
                <p>Dear ${name} ${user.lastName} ,</p>
                <p>Thank you for completing the payment with RentSmart. We are pleased to confirm that your transaction has been successfully processed. As part of your request, the property owner’s contact details have been securely shared with you.</p>
    
                <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
                    <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
                    <p><strong>Owner Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Contact Number:</strong> ${phone}</p>
                </div>
    
                <p>We encourage you to connect with the property owner at your earliest convenience to discuss further details.</p>
                <p>In case you have any questions or need support, feel free to reach out to our customer care team. We are here to ensure a smooth and seamless experience for you.</p>
    
                <p style="font-style: italic; color: #777;">
                    Please note: For security and privacy reasons, we recommend you refrain from sharing these details with others. This information has been shared solely for your authorized transaction with RentSmart.
                </p>
    
                <p>Thank you for choosing RentSmart. We look forward to serving you with excellence.</p>
                <p>Sincerely,</p>
                <p>The RentSmart Team</p>
                <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
                <p style="font-size: 0.8em; color: #555;">
                    RentSmart Inc. | Customer Support: yash@rentsmart.com | Phone: 7276462261
                </p>
                <p style="font-size: 0.8em; color: #555;">You are receiving this email as a confirmation of your recent transaction with RentSmart. If you did not initiate this transaction, please contact us immediately.</p>
            </div>
        </div>`};
  

        if (!user.premiumMember) {
          try {
            await user.incrementNumberReveal();
          } catch (error) {
            if (error.message === "Contact reveal limit reached.") {
              return res.status(403).json({ error: "Contact reveal limit reached." });
            }
            throw error;
          }
        }

      await transporter.sendMail(mailOptions); 

    try {
        // Save payment data to the database

        const payment = new Payment({
            orderId,
            signature,
            propertyId,
            userId,
            status: 'completed'
        });

        await payment.save();
    }
    catch(err) {
        console.log(err)
    }  

    res.redirect(`/payment/details?orderId=${orderId}`);
});

// Server Route to render the success page with the phone number
// Route to fetch payment details based on orderId
router.get('/details', async (req, res) => {
    const { orderId } = req.query;

    try {
        // Retrieve the payment details from the database
        const payment = await Payment.findOne({ orderId: orderId });

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found.' });
        }

        // Fetch property details with creator populated
        const property = await Listing.findById(payment.propertyId).populate("creator");

        if (!property || !property.creator) {
            return res.status(404).json({ success: false, message: 'Property or creator not found.' });
        }

        // Extract creator details
        const propertyCreator = property.creator;
        const { firstName, lastName, phone } = propertyCreator;



        // Respond with payment and property creator details
        res.json({
            success: true,
            payment: {
                propertyId: payment.propertyId,
                userId: payment.userId,
                orderId:payment.orderId,
                signature:payment.signature,
                timestamp:payment.timestamp,
                status: payment.status,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            }
        });
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).send("Failed to fetch payment details.");
    }
});

router.get('/get-payment-histroy/:userId',async (req,res) => {
    
    const {userId} = req.params;
    try {
        const paymentHis = await Payment.find({userId:userId})
       res.status(200).json(paymentHis)
    } catch (error) {
        console.log(error)
        console.error("Error fetching payment details:", error);
        res.status(500).send("Failed to fetch payment details.");
    }

} )
 

// Route to check if the property is already promoted
router.get('/check-promotion-status/:listingId', async (req, res) => {
    const { listingId } = req.params;
  
    try {
      const promotionExistAlready = await PromotedProperty.findOne({ listingId });
      if (promotionExistAlready) {
        return res.json({ promoted: true });
      }
      res.json({ promoted: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to check promotion status' });
    }
  });
  

router.post('/create-order/:listingId', async (req, res) => {
    const { listingId } = req.params;
  
    try {
      const order = await razorpay.orders.create({
        amount: 500 * 100,  // Example amount in smallest currency unit (paise)
        currency: 'INR',
        receipt: `${listingId}`,
        payment_capture: 1,
      });
  
      res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  });
  
  router.post('/promote-property', async (req, res) => {
    const { paymentResponse, listingId, userId } = req.body;
    const { razorpay_order_id } = paymentResponse;
  
    try {
      // Check if the property is already promoted
      const promotionExistAlready = await PromotedProperty.findOne({ listingId });
  
      if (promotionExistAlready) {
        return res.status(400).json({ message: 'Property is already promoted' });
      }
  
      const promotedDate = new Date();
      const expiryDate = new Date(promotedDate);
      expiryDate.setDate(promotedDate.getDate() + 7); 
  
      const promotionRecord = await PromotedProperty.create({
        listingId,
        userId,
        paymentStatus: 'Completed',
        promotedDate,
        expiryDate,
        paymentDetails: { amount: 500, transactionId: razorpay_order_id },
      });

      const user = await User.findById(userId)
  
      // Update property as promoted
      const property = await Listing.findById(listingId);
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
  
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
        to: user.email,
        subject: "Your Property Promotion Details",
        html: `
          <h2>Property Promotion Successful</h2>
          <p>Dear ${user.firstName},</p>
          <p>Your property has been successfully promoted on our platform. Here are the details:</p>
    
          <ul>
            <li><strong>Property ID:</strong> ${listingId}</li>
            <li><strong>Promotion Start Date:</strong> ${promotedDate.toDateString()}</li>
            <li><strong>Expiry Date:</strong> ${expiryDate.toDateString()}</li>
            <li><strong>Payment Amount:</strong> ₹500</li>
            <li><strong>Transaction ID:</strong> ${razorpay_order_id}</li>
          </ul>
  
          <p>This promotion will remain active until the expiry date mentioned above. After that, your property will no longer be listed as promoted unless renewed.</p>
          
          <p>Thank you for choosing our platform to promote your property. If you have any questions, feel free to contact our support team.</p>
          
          <p>Best regards,<br/>RentSmart Team</p>
        `
      };
  
      await transporter.sendMail(mailOptions);
  
      property.promoted = true;
      await property.save();
  
      res.json({ message: 'Property promoted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to promote property' });
    }
  });
  

  const cron = require('node-cron'); 
 
cron.schedule('0 0 * * *', async () => {
  const now = new Date();

  try { 
    const expiredPromotions = await PromotedProperty.find({
      expiryDate: { $lte: now },
      isExpired: false,
    });
 
    for (const promotion of expiredPromotions) {
      promotion.isExpired = true;
      await promotion.save();
 
      await Listing.updateOne(
        { _id: promotion.listingId },
        { $set: { promoted: false } }
      );
    }

    console.log(`Updated ${expiredPromotions.length} expired promotions.`);
  } catch (error) {
    console.error('Error updating expired promotions:', error);
  }
});

  
 
module.exports = router;
 