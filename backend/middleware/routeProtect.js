import jwt from 'jsonwebtoken'; // Import the jsonwebtoken module

const verifyToken = (req, res, next) => {
    const token = req.cookies.AuthToken; // Access the token from cookies
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        req.user = decoded; // Attach the decoded user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default verifyToken;
