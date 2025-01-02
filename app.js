require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./src/routes/quizRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', quizRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

module.exports = app;
