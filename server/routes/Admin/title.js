var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');

const Title = require('../../models/Title');

router.post('/',
    check('title', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title } = req.body;

        try {
            var newTitle = new Title({
                title,
            });

            await newTitle.save();
            res.send("Title added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const titles = await Title.find().sort({ date: -1 });
        res.json(titles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const title = await Title.findById(req.params.id);

        if (!title) {
            return res.status(404).json({ msg: 'title not found' });
        }

        await title.remove();

        res.json({ msg: 'title removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const title = await Title.findById(req.params.id);
        res.json(title);
        if (!title) {
            return res.status(404).json({ msg: 'title not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;