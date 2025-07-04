const mongoose = require('mongoose');

const ConfirmationCodeSchema = new mongoose.Schema({
    userEmail: { type: String },
    code: { type: String, unique: true },
    requestDate: { type: Date, default: Date.now },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
        expires: 0
    },
    used: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ConfirmationCode', ConfirmationCodeSchema);
