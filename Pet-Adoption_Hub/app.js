const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UserDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(' MongoDB connection failed:', err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/pets', petRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
