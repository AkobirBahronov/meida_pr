const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema(
  {
    user_ID: { type: mongoose.Schema.ObjectId, ref: 'user', required: true },
    system: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    transaction_id: { type: String },
    pay_url: { type: String },
  },
  { timestamps: true }
);

JournalSchema.pre('save', async function (req, res, next) {
  const user = await this.model('user').findByIdAndUpdate(this.user_ID);
  if (this.status === 'PAID') {
    user.balance += this.amount;
  } else if (this.status === 'RETURNED') {
    user.balance -= this.amount;
  }
  user.save({ validateBeforeSave: false });
  next();
});
module.exports = mongoose.model('journal', JournalSchema);
