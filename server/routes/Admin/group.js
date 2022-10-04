var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');


const Group = require('../../models/Group');

router.post('/',
    check('group', 'Name is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { group } = req.body;

        try {
            var newGroup = new Group({
                group,
            });



            await newGroup.save();
            res.send("Group added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find().sort({ date: -1 });
        res.json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'group not found' });
        }

        await group.remove();

        res.json({ msg: 'group removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        res.json(group);
        if (!group) {
            return res.status(404).json({ msg: 'group not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;