import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
    enum: ['Out for delivery', 'In transit', 'Completed', 'Cancelled','Delivered'],
    default: 'Out for delivery',
  },
  orderDate: { type: Date, default: Date.now },
});


const Order = mongoose.model('Order', orderSchema);

export default Order;


