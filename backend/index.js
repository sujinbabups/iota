import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authWarehouse from './routes/warehouseRoutes/authWarehouse.js';
import userAuth from './routes/userRoutes/userAuth.js'
import trAuth from './routes/transporterRoutes/authTransporter.js'
import seedRoute from './routes/warehouseRoutes/seedRoutes.js'
import cookieParser from 'cookie-parser';
import path from 'path' 

dotenv.config();

const app = express();
app.use(cookieParser());

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use('/', authWarehouse);
app.use('/', userAuth);
app.use('/',trAuth);
app.use('/', seedRoute);



app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: 'GET, POST, PUT, DELETE', 
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, 
  })
);




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection failed", err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});