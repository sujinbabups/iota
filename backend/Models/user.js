import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
