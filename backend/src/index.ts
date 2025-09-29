import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAuthRouter } from './routes/authRoute';

dotenv.config();

const app = express();

// CORS configuration - UPDATE THIS
const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
    'https://notestakers.netlify.app/'
].filter(Boolean); // Remove any undefined values

const corsOptions = {
    allowedOrigins:allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware BEFORE routes
app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
// Database connection
connectDB();

// Routes
app.use('/api/auth', createAuthRouter());
app.get('/api/test', (_req:any, res:any) => {
    res.send('Server is running and this is the new test endpoint is working and this is a new change!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Allowed origins:', allowedOrigins);
});
