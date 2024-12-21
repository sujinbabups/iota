import mongoose from "mongoose";

const seedSchema = new mongoose.Schema({
  seedName: { type: String, required: true, trim: true },
  seedType: { type: String, required: true, trim: true },
  seedPrice: { type: Number, required: true, min: 0 },
  seedQuantity: { type: Number, required: true, min: 0 },
  seedExpiryDate: { type: Date, required: true },
  seedImage: { type: String, required: false, trim: true },
  farmerName: { type: String, required: true, trim: true },
  fLocation: { type: String, required: true, trim: true },
  fContact: { type: Number, required: true },
  seedMinTemperature: { type: Number, required: true },
  seedMaxTemperature: { type: Number, required: true },
  seedTemperature: { type: Number },
});

const Seed = mongoose.model("Seed", seedSchema);

export default Seed;
