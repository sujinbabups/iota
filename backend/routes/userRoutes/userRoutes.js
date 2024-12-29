import express from 'express';
import verifyToken from '../../middleware/getUserId.js'
import Cart from '../../Models/cart.js';
import Seed from '../../Models/seed.js';

const router = express();


router.post('/addCart', verifyToken, async (req, res) => {
  const { seedId } = req.body;
  const { userId } = req; // Extracted from verifyToken middleware

  try {
    const seed = await Seed.findById(seedId);
    if (!seed) return res.status(404).json({ error: 'Seed not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the seed already exists in the cart
    const existingItem = cart.items.find(item => item.seedId.toString() === seedId);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.items.push({ 
        seedId, 
        quantity: 1, 
        price: seed.seedPrice,
        seedTemperature: seed.seedTemperature, // If available
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

  
  export default router;