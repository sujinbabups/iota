import mongoose from "mongoose";

const TransportationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  TransportationName: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  agreeterms: { type: Boolean, required: true },
});

const Transportation = mongoose.model("Transportation", TransportationSchema);

export default Transportation;
