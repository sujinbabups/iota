import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../../middleware/routeProtect.js'
import verifyUser from '../../middleware/getUserId.js'
import User from '../../Models/user.js';

const app = express();


app.post('/user-register', async (req, res) => {
    const {
        fullName,
        email,
        phoneNumber,
        password,
    } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

app.post('/user-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'The User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.email },
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

app.get('/userdashboard', verifyToken, (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to the User Dashboard', 
        user: req.user 
    });
});

app.put("/addProfile", verifyUser, async (req, res) => {
    try {
      const { userId } = req; 
      const { fullName, email, phoneNumber, address } = req.body;
  
      if (!fullName || !email || !phoneNumber || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, email, phoneNumber, address },
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.get("/getProfile", verifyUser, async (req, res) => {
    try {
      const { userId } = req; 
  
      const user = await User.findById(userId).select("-password"); 
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile retrieved successfully",
        user,
      });
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }); 

app.get("/warehouse-logout", (req, res) => {
    res.clearCookie("AuthToken");
    res.status(200).json({ message: "Logout successful", redirect: "/" });
});

export default app;
 