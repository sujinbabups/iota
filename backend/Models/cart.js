import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      seedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      seedTemperature: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
