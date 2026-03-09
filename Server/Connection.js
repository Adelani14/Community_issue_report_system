const mongoose = require('mongoose');
require('dotenv').config();
// const URI = process.env.MONGODB_URI;
const MONGO_URI = process.env.URI

mongoose.connect(MONGO_URI) 
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});