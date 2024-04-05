const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://yanzi14714:yanzi@aideny.0mz7t3y.mongodb.net/?retryWrites=true&w=majority&appName=AidenY', 
                { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log('Connected to MongoDB');
                })
                .catch(err => {
                    console.log('Error connecting to MongoDB', err);
                });

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
