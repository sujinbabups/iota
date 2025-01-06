import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  seedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed', required: true },
  seedName: { type: String, required: true },
  seedType: { type: String, required: true },
  seedPrice: { type: Number, required: true },
  seedQuantity: { type: Number, required: true },
  seedExpiryDate: { type: Date, required: true },
  seedImage: { type: String },
  seedTemperature: { type: Number },
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Order has placed','Dispached', 'In transit', 'Out for delivery', 'Cancelled', 'Delivered'],
    default: 'Order has placed',
  },
  transporter: {
    transporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transportation' },
    name: { type: String },
    phoneNumber: { type: String },
  },
  orderDate: { type: Date, default: Date.now },
});


const Order = mongoose.model('Order', orderSchema);

export default Order;


