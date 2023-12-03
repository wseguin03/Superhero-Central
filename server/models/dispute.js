const mongoose = require('mongoose');

const DisputeSchema = mongoose.Schema({
    dateRequestReceived: { type: Date, required: true },
    dateNoticeSent: { type: Date, required: true },
    dateDisputeReceived: { type: Date, required: true },
    notes: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Processed'], required: true },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', unique: true },
});

module.exports = mongoose.model('Dispute', DisputeSchema);