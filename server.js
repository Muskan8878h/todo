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
    .catch((err) => console.log('Error connecting to MongoDB:', err));


const todo=mongoose.model('todos',new mongoose.Schema({
    text:String
}));    


// Basic route
app.get('/todos', async(req, res) => {
    res.json(await todos.find());
});

app.post('/todos', async (req,res) => {
    const todo = await todos.create({ text : req.body.text });
    res.json(todo);
})

app.delete("/todo/:id", async (req, res) => {
    await todos.findByIdAndDelete(req.params.id);
    res.json({message : "Deleted"})
})


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
