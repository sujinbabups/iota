import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/routeProtect.js';

const app = express();












app.get('/transporterdashboard', verifyToken, (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to the Warehouse Dashboard', 
        user: req.user 
    });
});


export default app;
