import express from 'express';
import mongoose from 'mongoose';
import verifyToken from '../../middleware/getUserId.js'
import Cart from '../../Models/cart.js'
import Order from '../../Models/order.js'
import Seed from '../../Models/seed.js'


const router = express();


router.post('/addCart', verifyToken, async (req, res) => {
  try {
    const { userId } = req; 
    const { seedId } = req.body;

    const existingCartItem = await Cart.findOne({ userId, seedId });

    if (existingCartItem) {
      return res.status(409).json({ 
        message: 'This item is already in your cart.' 
      });
    }

    const newCartItem = new Cart({
      userId,
      ...req.body,
    });

    await newCartItem.save();
    res.status(201).json({ 
      message: 'Item added to cart successfully.', 
      cartItem: newCartItem 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/getCart', verifyToken, async (req, res) => {
  try {
    const { userId } = req; 

    const cartItems = await Cart.find({ userId })
      .populate('seedId', 'seedName seedImage seedPrice') 
      .exec();

    if (!cartItems) {
      return res.status(404).json({ message: 'No cart items found.' });
    }

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/addOrder', verifyToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req;
    const { orders } = req.body;

    if (!userId || !orders || !Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    for (const order of orders) {
      if (!mongoose.Types.ObjectId.isValid(order.seedId)) {
        throw new Error(`Invalid seed ID: ${order.seedId}`);
      }

      if (!order.seedQuantity || typeof order.seedQuantity !== 'number' || order.seedQuantity <= 0) {
        throw new Error(`Invalid quantity for seed ID: ${order.seedId}`);
      }
    }

    const newOrders = orders.map((order) => ({
      ...order,
      userId,
    }));

    const savedOrders = await Order.insertMany(newOrders, { session });

    for (const order of orders) {
      const { seedId, seedQuantity } = order;

      const seed = await Seed.findById(seedId).session(session);
      if (!seed) {
        throw new Error(`Seed with ID ${seedId} not found`);
      }

      if (seed.seedQuantity < seedQuantity) {
        throw new Error(`Insufficient stock for seed ID ${seedId}`);
      }

      await Seed.findByIdAndUpdate(
        seedId,
        { $inc: { seedQuantity: -seedQuantity } }, 
        { session }
      );

      await Cart.findByIdAndDelete(order.cartId, { session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Orders added successfully, seed quantities updated, and cart items removed.',
      orders: savedOrders,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error processing orders:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

router.get('/getOrder', verifyToken , async(req,res)=>{
  try {
    const { userId } = req; 

    const orderData = await Order.find({ userId })
      .populate('_id','seedId cartId seedName seedType seedPrice seedQuantity seedExpiryDate seedImage seedTemperature totalPrice orderStatus orderDate') 
      .exec();

    if (!orderData) {
      return res.status(404).json({ message: 'No Orders  found.' });
    }

    res.status(200).json({ orderData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getorder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Order ID" });
    }
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error fetching order:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




  

  
  export default router;