const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: String,
    signature: String,
    propertyId: String,
    userId: String,
    amount: Number,
    status: { type: String, default: 'pending' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);

 