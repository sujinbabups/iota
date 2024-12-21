import express from "express";
import Seed from "../../Models/seed.js";
import multer from "multer";
import verifyToken from "../../middleware/routeProtect.js";

const app = express();

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Make sure "uploads" directory exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });



app.post("/addSeed", verifyToken , upload.single("seedImage"), async (req, res) => {
    const {
        seedName,
        seedType,
        seedPrice,
        seedQuantity, // Fixed typo
        seedExpiryDate,
        farmerName,
        fLocation,
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
          seedImage: req.file ? req.file.filename : undefined, // Use uploaded file if present
          farmerName,
          fLocation,
          seedMinTemperature,
          seedMaxTemperature,
        });
  
        await newSeed.save();
        res.status(201).json({ message: "Seed registered successfully." });
      } catch (error) {
        console.error("Error saving seed:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
      }
    }
  );

export default app;
