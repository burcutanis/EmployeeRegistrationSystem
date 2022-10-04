var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');


const PersonalInformation = require('../../models/PersonalInformation');

router.post('/',
    check('dateOfBirth', 'dateOfBirth is required').notEmpty(),
    check('maritalStatus', 'maritalStatus is required').notEmpty(),
    check('address', 'address is required').notEmpty(),
    check('city', 'city is required').notEmpty(),
    check('mobile', 'mobile is required').notEmpty(),
    check('gender', 'gender is required').notEmpty(),
    check('userId', 'gender is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { dateOfBirth, maritalStatus, address, city, mobile, gender, userId } = req.body;

        try {
            var newPersonalInformation = new PersonalInformation({
                dateOfBirth, maritalStatus, address, city, mobile, gender, userId
            });



            await newPersonalInformation.save();
            res.send("Personal Information added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const personalInformations = await PersonalInformation.find().sort({ date: -1 });
        res.json(personalInformations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const personalInformation = await PersonalInformation.findOneAndRemove(query);

        if (!personalInformation) {
            return res.status(404).json({ msg: 'group not found' });
        }


        res.json({ msg: 'personalInformation removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const personalInformation = await PersonalInformation.findById(req.params.id);
        res.json(personalInformation);
        if (!personalInformation) {
            return res.status(404).json({ msg: 'personalInformation not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const personalInformation = await PersonalInformation.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!personalInformation) {
            return res.status(404).json({ msg: 'personal Information not found' });
        }

        res.json({ msg: 'personal Information updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const personalInformation = await PersonalInformation.find(query);
        res.json(personalInformation);
        if (!personalInformation) {
            return res.status(404).json({ msg: 'personalInformation not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;