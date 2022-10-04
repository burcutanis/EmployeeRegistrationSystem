var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');



const UserExperienceItem = require('../../models/User/UserExperienceItem');

router.post('/',
    check('companyName', 'companyName is required').notEmpty(),
    check('statusInCompany', 'statusInCompany is required').notEmpty(),
    check('startYear', 'startYear is required').notEmpty(),
    check('industry', 'industry is required').notEmpty(),
    check('area', 'area is required').notEmpty(),
    check('experienceId', 'experienceId is required').notEmpty(),
    check('userId', 'userId is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { experienceId, companyName, endYear, statusInCompany, startYear, industry, area, userId } = req.body;

        try {
            var newExperience = new UserExperienceItem({
                experienceId, companyName, endYear, statusInCompany, startYear, industry, area, userId
            });



            await newExperience.save();
            res.send("Experience Item added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const experience = await UserExperienceItem.find().sort({ date: -1 });
        res.json(experience);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




router.delete('/:id2/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id2, experienceId: req.params.id };
        const experience = await UserExperienceItem.findOneAndRemove(query);


        if (!experience) {
            return res.status(404).json({ msg: 'group not found' });
        }



        res.json({ msg: 'experience item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});




router.delete('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        let experience;

        experience = await UserExperienceItem.deleteMany(query);


        if (!experience) {
            return res.status(404).json({ msg: 'experience not found' });
        }


        res.json({ msg: 'experience removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const experience = await UserExperienceItem.findById(req.params.id);
        res.json(experience);
        if (!experience) {
            return res.status(404).json({ msg: 'experience item not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const experienceItem = await UserExperienceItem.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!experienceItem) {
            return res.status(404).json({ msg: 'experienceItem  not found' });
        }

        res.json({ msg: 'experienceItem  updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const experienceItem = await UserExperienceItem.find(query);
        res.json(experienceItem);
        if (!experienceItem) {
            return res.status(404).json({ msg: 'experienceItem not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/experience/:id', async (req, res) => {
    try {
        var query = { experienceId: req.params.id };
        const experienceItem = await UserExperienceItem.find(query);
        res.json(experienceItem);
        if (!experienceItem) {
            return res.status(404).json({ msg: 'experienceItem not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:userId/:status', async (req, res) => {
    try {
        var query = { userId: req.params.userId, status: req.params.status };
        const experienceItem = await UserExperienceItem.deleteMany(query);


        if (!experienceItem) {
            return res.status(404).json({ msg: 'experienceItem not found' });
        }



        res.json({ msg: 'experienceItem item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});









module.exports = router;