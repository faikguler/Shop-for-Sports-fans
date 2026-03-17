const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = '2h';

const authMiddleware = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim(); 
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data; 
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const signToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };