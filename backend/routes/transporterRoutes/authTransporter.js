import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transportation from '../../Models/transportation.js'
import verifyToken from '../../middleware/routeProtect.js'
import verifyTransporter from '../../middleware/getTransporter.js'
import Order from '../../Models/order.js'

const app = express();



app.post('/transportation-register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        TransportationName,
        address,
        password,
        agreeterms
    } = req.body;
    // console.log(req.body)

    if (!firstName || !lastName || !email || !phoneNumber || !TransportationName || !address || !password || agreeterms === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user already exists
    const existingUser = await Transportation.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Transportation({
        firstName,
        lastName,
        email,
        phoneNumber,
        TransportationName,
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

app.post('/transportation-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await Transportation.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'The Transportation not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { usrId: user._id, username: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('AuthToken', token, { httpOnly: true, secure: false }); 
        res.status(200).json({ message: 'Login Success', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/transporters', async (req, res) => {
    try {
      const transporters = await Transportation.find();
      res.status(200).json({ transporters });
    } catch (error) {
      console.error("Error fetching transporters:", error);
      res.status(500).json({ message: "Server error. Unable to fetch transporters." });
    }
  });

  app.get('/orders',verifyTransporter, async (req, res) => {
    try {
      const transporterId = req.user.transporterId;
  
      const orders = await Order.find({
        'transporter.transporterId': transporterId,
      })
        .populate('userId', 'fullName email') // Populate related user details if needed
        .populate('cartId') // Populate related cart details if needed
        .populate('seedId'); // Populate related seed details if needed
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  }); 

app.get('/transportationdashboard', verifyToken, (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to the Transportation Dashboard', 
        user: req.user 
    });
});

app.get("/transportation-logout", (req, res) => {
    res.clearCookie("AuthToken");
    res.status(200).json({ message: "Logout successful", redirect: "/" });
});

export default app;
 