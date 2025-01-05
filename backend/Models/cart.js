import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', required: true },
  seedName: { type: String, required: true, trim: true },
  seedType: { type: String, required: true, trim: true },
  seedPrice: { type: Number, required: true, min: 0 },
  seedQuantity: { type: Number, required: true, min: 0 },
  seedExpiryDate: { type: Date, required: true },
  seedImage: { type: String, trim: true },
  farmerName: { type: String, required: true, trim: true },
  fLocation: { type: String, required: true, trim: true },
  fContact: { type: Number, required: true },
  seedMinTemperature: { type: Number, required: true },
  seedMaxTemperature: { type: Number, required: true },
  seedTemperature: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
