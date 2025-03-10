const Pet = require('../models/petModel');

const addPet = async (req, res) => {
    try {
        let images = [];

        if (req.files && req.files.length > 0) {
            
            images = req.files.map(file => file.path);
        } else if (req.body.images) {
            
            images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
        }

        const petData = {
            ...req.body,
            images
        };

        const pet = await Pet.create(petData);
        res.status(201).json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getPets = async (req, res) => {
    const { species, breed, sortByAge } = req.query;
    const filter = {};
    if (species) filter.species = species;
    if (breed) filter.breed = breed;

    const pets = await Pet.find(filter).sort(
        sortByAge === 'asc' ? { age: 1 } :
        sortByAge === 'desc' ? { age: -1 } :
        {}
    );
    res.status(200).json(pets);
};

const updateAdoption = async (req, res) => {
    const { id } = req.params;
    const { adopterName, adoptionDate } = req.body;
    try {
        const pet = await Pet.findByIdAndUpdate(
            id,
            {
                adoptionStatus: 'Adopted',
                adopterName,
                adoptionDate
            },
            { new: true }
        );
        res.status(200).json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Pet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addPet, getPets, updateAdoption, deletePet };
