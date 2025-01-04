import express from 'express';
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

    const cartItems = await Cart.find({ userId, paymentStatus: 'Not Paid' })
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


router.post('/addsOrder', async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }
    const newOrder = new Order({ userId, items });
    const savedOrder = await newOrder.save();

    return res.status(201).json({ message: 'Order saved successfully', order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

  

  
  export default router;