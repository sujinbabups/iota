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
    seedImage,
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

router.put('/api/seeds/:id', upload.single('seedImage'), async (req, res) => {
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
router.delete('/api/seeds/:id', async (req, res) => {
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