const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    personalityTraits: [String],
    images: [String],
    adoptionStatus: { type: String, default: 'Available' },
    adopterName: { type: String, default: '' },
    adoptionDate: { type: Date },
    dateOfArrival: { type: Date, required: true }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
