// middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'your_secret_key_here');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;
