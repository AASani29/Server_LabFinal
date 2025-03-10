const express = require('express');
const multer = require('multer');
const { addPet, getPets, updateAdoption, deletePet } = require('../controllers/petController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage,
    limits: { fileSize: 5 * 1024 * 1024 } 
 });


router.post('/', upload.array('images'), addPet);
router.get('/', getPets);
router.put('/:id/adopt', updateAdoption);
router.delete('/:id', deletePet);

module.exports = router;
