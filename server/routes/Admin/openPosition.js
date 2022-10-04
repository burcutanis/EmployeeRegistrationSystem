var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');

const OpenPosition = require('../../models/OpenPositions');

router.post('/',
    check('positionName', 'positionName is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { positionName, explanation } = req.body;

        try {
            var newOpenPosition = new OpenPosition({
                positionName, explanation
            });



            await newOpenPosition.save();
            res.send("newOpenPosition added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const openPosition = await OpenPosition.find().sort({ date: -1 });
        res.json(openPosition);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const openPosition = await OpenPosition.findById(req.params.id);

        if (!openPosition) {
            return res.status(404).json({ msg: 'openPosition not found' });
        }
        await openPosition.remove();

        res.json({ msg: 'openPosition removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});




module.exports = router;