import express from 'express';
import Seed from '../../Models/seed.js';
import multer from 'multer';
import verifyToken from '../../middleware/routeProtect.js'

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
    // Aggregate the total quantity of seeds
    const totalSeeds = await Seed.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$seedQuantity" }, // Sum the seed quantities
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
    // Aggregating seed data by type and summing quantities
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
router.delete('/seeds/:id', async (req, res) => {
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

export default router;