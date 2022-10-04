var express = require('express');
var router = express.Router();
const multer = require("multer");
const { check, validationResult } = require('express-validator');
const CoverLetter = require('../../models/File/EmployeeCoverLetter');

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
    getCoverbyId,
    CoverLetterPost
} = require("../../controllers/FileUpload/employeeCoverUpload");

router.post('/', upload.single('file'), coverLetterUpload);
router.get('/', getCoverLetters);
router.delete('/:id', removeCoverLetter);
router.get('/:id', getCoverbyId);
//router.post('/', CoverLetterPost);


router.post('/cover',
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
            var newCover = new CoverLetter({
                fileName, filePath, fileType, fileSize, userId
            });

            await newCover.save();
            res.send("Cover letter added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)



module.exports = router;