import mongoose from 'mongoose';


const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://itel:NWzbhUo7DjCHj9i0@cluster0.wcccf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

        await mongoose.connect(mongoURI);

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Handle connection events
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//     console.error('Mongoose connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });

// process.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log('MongoDB connection closed through app termination');
//     process.exit(0);
// });

export default connectDB;

