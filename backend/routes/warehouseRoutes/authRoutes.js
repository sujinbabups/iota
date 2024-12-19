import express from 'express';
import bcrypt from 'bcrypt'
import wareHouse from '../../modals/warehouse.js'

const app = express();



app.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        warehouseName,
        address,
        password,
        agreeterms
    } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !warehouseName || !address || !password || agreeterms === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user already exists
    const existingUser = await wareHouse.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new wareHouse({
        firstName,
        lastName,
        email,
        phoneNumber,
        warehouseName,
        address,
        password: hashedPassword,
        agreeterms
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

export default app;
