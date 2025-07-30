import mongoose from 'mongoose';
import { MONGODB_URL } from '$env/static/private';


export const connectDB = async () => {
    // Check if the database is already connected
    if (mongoose.connection.readyState === 1) {
        console.log('Database connection already established.');
        return true;
    }
    try {
        // Reuse existing connection if available
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URL);
            console.log('Connected to Database Successfully!');
        }
        return true;
    } catch (err) {
        console.error('Failed to Connect to Database: ', err);
        return false;
    }
};