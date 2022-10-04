const CV = require('../../models/File/EmployeeCV');

exports.cvUpload = ('/', async (req, res, next) => {
    try {
        let path = req.file.path;
        path = path.split("\\");
        console.log(path[1]);
        const { userId } = req.body;
        let name = req.file.originalname;
        //name.append(`*${userId}`)

        const file = new CV({
            fileName: name,
            filePath: path[1],
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            userId: userId // 0.00
        });
        await file.save();
        //const file = req.file;
        //console.log(file);
        res.status(201).send("File Uploaded Successfully")

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
);

exports.getCVs = async (req, res, next) => {
    try {
        const files = await CV.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }

}

exports.removeCV = ('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const cv = await CV.findOneAndRemove(query);

        if (!cv) {
            return res.status(404).json({ msg: 'group not found' });
        }


        res.json({ msg: 'cv removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

exports.getCVbyId = ('/:id', async (req, res, next) => {
    try {
        var query = { userId: req.params.id };
        const files = await CV.find(query);
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
)

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}