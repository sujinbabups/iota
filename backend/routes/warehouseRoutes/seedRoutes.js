import express from 'express';
import Seed from '../../Models/seed.js';
import multer from 'multer';
import verifyToken from '../../middleware/routeProtect.js'
import Order from '../../Models/order.js'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/addSeed', verifyToken, upload.single('seedImage'), async (req, res) => {
  const {
    seedName,
    seedType,
    seedPrice,
    seedQuantity,
    seedExpiryDate,
    farmerName,
    fLocation,
    fContact,
    seedMinTemperature,
    seedMaxTemperature,
  } = req.body;

  try {
    const newSeed = new Seed({
      seedName,
      seedType,
      seedPrice,
      seedQuantity,
      seedExpiryDate,
      seedImage: req.file ? req.file.filename : undefined, 
      farmerName,
      fLocation,
      fContact,
      seedMinTemperature,
      seedMaxTemperature,
    });

    await newSeed.save();
    console.log(newSeed);
    res.status(201).json({ message: 'Seed registered successfully.' });
  } catch (error) {
    console.error('Error saving seed:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/allseeds', verifyToken, async (req, res) => {
  try {
    const seeds = await Seed.find();
    if (seeds.length === 0) {
      return res.status(404).json({ message: 'No seeds found.' });
    }

    res.status(200).json({ success: true, data: seeds });
  } catch (error) {
    console.error('Error fetching seeds:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// recently added seeds
router.get('/recentActivities', async (req, res) => {
  try {
    const recentActivities = await Seed.find()
      .sort({ createdAt: -1 }) 
      .limit(5); 

      const activities = recentActivities.map(seed => ({
        activity: `${seed.seedName} - ${seed.seedType} added`,
        time: seed.createdAt ? seed.createdAt.toISOString() : null, // Handle missing `createdAt`
      }));

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Failed to fetch recent activities.' });
  }
});

// Total seeds

router.get('/totalSeeds', async (req, res) => {
  try {
    const totalSeeds = await Seed.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$seedQuantity" }, 
        },
      },
    ]);

    const total = totalSeeds.length > 0 ? totalSeeds[0].total : 0;
    res.status(200).json({ total });
  } catch (error) {
    console.error('Error fetching total seeds:', error);
    res.status(500).json({ message: 'Failed to fetch total seeds.' });
  }
});

router.get('/seedDistribution', async (req, res) => {
  try {
    const seedDistribution = await Seed.aggregate([
      {
        $group: {
          _id: '$seedType',
          totalQuantity: { $sum: '$seedQuantity' },
        },
      },
      {
        $project: {
          name: '$_id',
          value: '$totalQuantity',
          _id: 0,
        },
      },
    ]);

    if (!seedDistribution || seedDistribution.length === 0) {
      return res.status(404).json({ error: 'No seed distribution data found.' });
    }

    res.status(200).json(seedDistribution);
  } catch (error) {
    console.error('Error fetching seed distribution:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/seedTypes', async (req, res) => {
  try {
    const seedTypesCount = await Seed.distinct("seedType").countDocuments();

    res.status(200).json({ seedTypesCount });
  } catch (error) {
    console.error('Error fetching seed types:', error);
    res.status(500).json({ message: 'Failed to fetch seed types.' });
  }
});


router.put('/seeds/:id', upload.single('seedImage'), async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  if (req.file) {
    updatedData.seedImage = req.file.filename;
  }

  try {
    const updatedSeed = await Seed.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedSeed) {
      return res.status(404).json({ success: false, message: 'Seed not found' });
    }
    res.json({ success: true, data: updatedSeed });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update seed', error: err.message });
  }
});

// Delete seed
router.delete('/seeds/:id',verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeed = await Seed.findByIdAndDelete(id);
    if (!deletedSeed) {
      return res.status(404).json({ success: false, message: 'Seed not found' });
    }
    res.json({ success: true, message: 'Seed deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete seed', error: err.message });
  }
});

// View orders

router.get('/getOrder', async (req, res) => {
  try {
    const orders = await Order.find(); 
    res.json({ orderData: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// cancel order
router.patch("/orders/:orderId/cancel",verifyToken, async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    // Validate orderStatus
    if (orderStatus !== "Cancelled") {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Find the order and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// Total orders

router.get('/total-orders', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ totalOrders }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total orders', error });
  }
});

router.put('/updateOrderStatus/:orderId', verifyToken, async (req, res) => {
  const { orderId } = req.params;
  const { transporterId, name, phoneNumber } = req.body;

  if (!transporterId || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All transporter details are required.' });
  }

  try {
    // Update the order with status and transporter details
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: 'Dispatched',
        transporter: {
          transporterId,
          name,
          phoneNumber,
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order updated successfully.', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error. Unable to update order.' });
  }
});



export default router;