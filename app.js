// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://chidiralabharath208:Bharath100@cluster0.g7k3soh.mongodb.net/newdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Atlas connected successfully');
})
.catch((error) => {
  console.error('MongoDB Atlas connection error:', error);
});

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Not found middleware
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
