var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
var moment = require('moment');



const UserEducation = require('../../models/User/UserEducation');

router.post('/',
    check('highestQualification', 'highestQualification is required').notEmpty(),
    check('specialization', 'specialization is required').notEmpty(),
    check('universityName', 'universityName is required').notEmpty(),
    check('startYear', 'startYear is required').notEmpty(),
    check('userId', 'userId is required').notEmpty(),
    check('educationId', 'educationId is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { highestQualification, specialization, endYear, universityName, startYear, userId, continueBool, educationId } = req.body;


        try {
            var newEducation = new UserEducation({
                highestQualification, specialization, endYear, universityName,
                startYear,
                userId, educationId, continueBool
            });



            await newEducation.save();
            res.send("Education added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const education = await UserEducation.find().sort({ date: -1 });
        res.json(education);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {

        var query = { userId: req.params.id };
        let education;

        education = await UserEducation.deleteMany(query);



        if (!education) {
            return res.status(404).json({ msg: 'group not found' });
        }



        res.json({ msg: 'education removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.delete('/:userId/:educationId', async (req, res) => {
    try {
        var query = { userId: req.params.userId, educationId: req.params.educationId };
        const education = await UserEducation.findOneAndRemove(query);


        if (!education) {
            return res.status(404).json({ msg: 'education not found' });
        }



        res.json({ msg: 'education item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const education = await UserEducation.findById(req.params.id);
        res.json(education);
        if (!education) {
            return res.status(404).json({ msg: 'education not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const education = await UserEducation.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!education) {
            return res.status(404).json({ msg: 'education  not found' });
        }

        res.json({ msg: ' education updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const education = await UserEducation.find(query);
        res.json(education);
        if (!education) {
            return res.status(404).json({ msg: 'education not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});



router.get('/education/:id', async (req, res) => {
    try {
        var query = { educationId: req.params.id };
        const education = await UserEducation.find(query);
        res.json(education);
        if (!education) {
            return res.status(404).json({ msg: 'education not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:userId/:status', async (req, res) => {
    try {
        var query = { userId: req.params.userId, status: req.params.status };
        const education = await UserEducation.deleteMany(query);


        if (!education) {
            return res.status(404).json({ msg: 'education not found' });
        }



        res.json({ msg: 'education item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});


module.exports = router;