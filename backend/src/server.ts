import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import networkRoutes from './routes/networkRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

connectDB();

// Use multer middleware for the signup route
app.use('/api/auth', (req, res, next) => {
  if (req.path === '/signup' && req.method === 'POST') {
    upload.single('profilePic')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error: ' + err.message });
      }
      next();
    });
  } else {
    next();
  }
}, authRoutes);

// Add new network routes
app.use('/api/network-connections', networkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});