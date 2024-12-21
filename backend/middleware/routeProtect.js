import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.AuthToken; 
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default verifyToken;
