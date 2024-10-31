 
const mongoose = require('mongoose');

const promotedPropertySchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentStatus: { type: String, default: 'not done' },
  promotedDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  paymentDetails: {
    amount: Number,
    transactionId: String,
    paymentDate: Date,
  },
  isExpired: { type: Boolean, default: false },
});

module.exports = mongoose.model('PromotedProperty', promotedPropertySchema);
