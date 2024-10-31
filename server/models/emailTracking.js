const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    userIdSender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    propertyId: { type: String, required: true }, 
    receiverEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
 
const EmailRequest = mongoose.model('EmailRequest', emailSchema);

  module.exports = EmailRequest;