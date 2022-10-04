
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
    imageUpload,
    getImagebyId,
    getallImages,
    removeImage,
    putImage
} = require("../../controllers/FileUpload/imageUpload");

router.post('/', upload.single('file'), imageUpload);
router.get('/:id', getImagebyId);
router.get('/', getallImages);
router.delete('/:id', removeImage);
router.put('/:id', putImage);

module.exports = router;