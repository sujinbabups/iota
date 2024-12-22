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

export default router;