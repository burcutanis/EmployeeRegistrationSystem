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
    otherFileUpload,
    getOtherFiles,
    removeOther,
    getOtherbyId
} = require("../../controllers/FileUpload/otherUpload");

router.post('/', upload.single('file'), otherFileUpload);
router.get('/', getOtherFiles);
router.delete('/:id', removeOther);
router.get('/:id', getOtherbyId);

module.exports = router;