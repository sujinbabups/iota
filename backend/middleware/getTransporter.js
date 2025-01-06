import jwt from 'jsonwebtoken';

const verifyTransporter = (req, res, next) => {
  const token = req.cookies.AuthToken; 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
export default verifyTransporter;
