const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      seedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seed',
      },
      seedName: { type: String, required: true },
      seedType: { type: String, required: true },
      seedPrice: { type: Number, required: true },
      seedQuantity: { type: Number, required: true },
      availableStock: { type: Number, required: true },
      currentTemperature: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
