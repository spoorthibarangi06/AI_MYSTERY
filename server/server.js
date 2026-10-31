import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import mysteryRoutes from './routes/mysteryRoutes.js';
import evidenceRoutes from './routes/evidenceRoutes.js';
import accusationRoutes from './routes/accusationRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AI Mystery Room API Engine',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/mysteries', mysteryRoutes);
app.use('/api/mysteries', evidenceRoutes);
app.use('/api/mysteries', accusationRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] AI Mystery Room backend running on port ${PORT}`);
});
