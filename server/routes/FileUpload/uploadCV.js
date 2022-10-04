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
    cvUpload,
    getCVs,
    removeCV,
    getCVbyId
} = require("../../controllers/FileUpload/cvUpload");

router.post('/', upload.single('file'), cvUpload);
router.get('/', getCVs);
router.delete('/:id', removeCV);
router.get('/:id', getCVbyId);


module.exports = router;