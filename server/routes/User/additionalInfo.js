var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');



const AdditionalInfo = require('../../models/User/AdditionalInfo');

router.post('/',
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { additional, userId } = req.body;

        try {
            var newAdditional = new AdditionalInfo({
                additional,
                userId
            });



            await newAdditional.save();
            res.send("newAdditionalInfo added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const additional = await AdditionalInfo.find().sort({ date: -1 });
        res.json(additional);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {

        var query = { userId: req.params.id };
        let additional;

        additional = await AdditionalInfo.findByIdAndRemove(query);



        if (!additional) {
            return res.status(404).json({ msg: 'group not found' });
        }



        res.json({ msg: 'additional removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});




router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const additional = await AdditionalInfo.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!additional) {
            return res.status(404).json({ msg: 'additional  not found' });
        }

        res.json({ msg: ' additional updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const additional = await AdditionalInfo.find(query);
        res.json(additional);
        if (!additional) {
            return res.status(404).json({ msg: 'additional not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.delete('/:userId/:status', async (req, res) => {
    try {
        var query = { userId: req.params.userId, status: req.params.status };
        const additional = await AdditionalInfo.deleteMany(query);


        if (!additional) {
            return res.status(404).json({ msg: 'additional not found' });
        }



        res.json({ msg: 'additional item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});



module.exports = router;