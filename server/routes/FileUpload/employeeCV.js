var express = require('express');
var router = express.Router();
const multer = require("multer");
const { check, validationResult } = require('express-validator');
const CV = require('../../models/File/EmployeeCV');

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
} = require("../../controllers/FileUpload/employeeCVupload");

router.post('/', upload.single('file'), cvUpload);
router.get('/', getCVs);
router.delete('/:id', removeCV);
router.get('/:id', getCVbyId);

router.post('/cv',
    check('fileName', 'fileName is required').notEmpty(),
    check('filePath', 'filePath is required').notEmpty(),
    check('fileType', 'fileType is required').notEmpty(),
    check('fileSize', 'fileSize is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fileName, filePath, fileType, fileSize, userId } = req.body;

        try {
            var newCV = new CV({
                fileName, filePath, fileType, fileSize, userId
            });

            await newCV.save();
            res.send("CV added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)


module.exports = router;