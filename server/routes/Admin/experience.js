var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');



const Experience = require('../../models/Experience');

router.post('/',
    check('currentStatus', 'currentStatus is required').notEmpty(),
    check('experienceId', 'experienceId is required').notEmpty(),
    check('skills', 'skills is required').notEmpty(),
    check('userId', 'userId is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { currentStatus, skills, userId, experienceId } = req.body;

        try {
            var newExperience = new Experience({
                currentStatus, skills, userId, experienceId
            });


            await newExperience.save();
            res.send("Experience added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const experience = await Experience.find().sort({ date: -1 });
        res.json(experience);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const experience = await Experience.findOneAndRemove(query);

        if (!experience) {
            return res.status(404).json({ msg: 'group not found' });
        }



        res.json({ msg: 'experience removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        res.json(experience);
        if (!experience) {
            return res.status(404).json({ msg: 'experience not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const experience = await Experience.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!experience) {
            return res.status(404).json({ msg: 'experience  not found' });
        }

        res.json({ msg: 'experience  updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const experience = await Experience.find(query);
        res.json(experience);
        if (!experience) {
            return res.status(404).json({ msg: 'experience not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;