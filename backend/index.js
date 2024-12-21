import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authWarehouse from './routes/warehouseRoutes/authWarehouse.js';
import userAuth from './routes/userRoutes/userAuth.js'
import trAuth from './routes/transporterRoutes/authTransporter.js'
import cookieParser from 'cookie-parser';
import { Route } from 'react-router-dom';


dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/', authWarehouse);
app.use('/', userAuth);
app.use('/',trAuth);


app.use(
  cors({ 
    origin: "http://localhost:5173",
  })
);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection failed", err));



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});