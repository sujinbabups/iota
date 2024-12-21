import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authWarehouse from './routes/warehouseRoutes/authWarehouse.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/', authWarehouse);

app.use(
  cors({ 
    origin: "http://localhost:5173",
  })
);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection failed", err));



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});