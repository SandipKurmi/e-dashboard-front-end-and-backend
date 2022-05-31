const mongoose= require('mongoose');

MONGO_URL = "mongodb://localhost:27017/e-com";

mongoose.connect(MONGO_URL, () => {
    console.log('Connected to MongoDB ');
})