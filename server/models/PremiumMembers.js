const mongoose = require('mongoose');
const User = require('./User');  

const premiumUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  
  },
  subscriptionStart: {
    type: Date,
    default: Date.now, // Date when the user became a premium member
  },
  subscriptionEnd: {
    type: Date, // You can set this based on your subscription logic
  },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true }
});

const PremiumUser = mongoose.model('PremiumUser', premiumUserSchema);
module.exports = PremiumUser;
