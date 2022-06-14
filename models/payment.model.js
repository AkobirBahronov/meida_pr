const mongoose = require('mongoose');
const MySchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
        currency: { type: String, default: 'UZS' },
        paymentType: { type: String, required: true },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('payment', MySchema);
