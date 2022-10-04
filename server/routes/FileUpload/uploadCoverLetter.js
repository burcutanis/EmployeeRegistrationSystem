var express = require('express');
var router = express.Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

// Controllers
const {
    coverLetterUpload,
    getCoverLetters,
    removeCoverLetter,
    getCoverbyId
} = require("../../controllers/FileUpload/coverLetterUpload");

router.post('/', upload.single('file'), coverLetterUpload);
router.get('/', getCoverLetters);
router.delete('/:id', removeCoverLetter);
router.get('/:id', getCoverbyId);


module.exports = router;