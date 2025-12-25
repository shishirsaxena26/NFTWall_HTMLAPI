// middleware/auth.js - small JWT auth helper for REST if you later enable user system
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'replace_me';

function generateToken(payload) {
  const exp = process.env.JWT_EXP || '7d';
  return jwt.sign(payload, secret, { expiresIn: exp });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function expressAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ ok: false, error: 'missing_token' });
  const parts = auth.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];
  try {
    req.user = verifyToken(token);
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: 'invalid_token' });
  }
}

module.exports = { generateToken, verifyToken, expressAuth };
