import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, username: decoded.username });
  } catch (err) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }
}
