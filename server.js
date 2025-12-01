import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Express app setup
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(() => { console.log('Error connecting to MongoDB:', err); });


const todo=mongoose.model('Todo',new mongoose.Schema({
    text:String
}));    


// Basic route
app.get('/todos', async(req, res) => {
    res.json(await todo.find());
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});