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
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


// MODEL (correct name)
const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: { type: String, required: true }
}));


// --------------------------------------
// ROUTES
// --------------------------------------

// GET all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new todo
app.post('/todos', async (req, res) => {
    try {
        const todo = await Todo.create({ text: req.body.text });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
