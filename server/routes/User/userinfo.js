
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');


const UserGeneralInfo = require('../../models/User/UserApplication');


router.post('/',
    check('name', 'Name is required').notEmpty(),
    check('surname', 'Surname is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('status', 'status is required').notEmpty(),
    check('position', 'position is required').notEmpty(),


    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, surname, userId, status, position } = req.body;

        try {

            var employee = new UserGeneralInfo({
                name,
                surname,
                email,
                status,
                userId,
                position

            });



            await employee.save();
            console.log("49");
            res.send("Employee added to database");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const userGeneralInfo = await UserGeneralInfo.find().sort({ date: -1 });
        res.json(userGeneralInfo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userGeneralInfo = await UserGeneralInfo.findById(req.params.id);
        res.json(userGeneralInfo);
        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { email: req.params.id };
        const userGeneralInfo = await UserGeneralInfo.find(query);
        res.json(userGeneralInfo);
        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/userId/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const userGeneralInfo = await UserGeneralInfo.find(query);
        res.json(userGeneralInfo);
        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/emailandstatus/:email/:status', async (req, res) => {
    try {
        var query = { email: req.params.email, status: req.params.status };
        const userGeneralInfo = await UserGeneralInfo.find(query);
        res.json(userGeneralInfo);
        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});









router.delete('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const userGeneralInfo = await UserGeneralInfo.findOneAndRemove(query);

        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }



        res.json({ msg: 'userGeneralInfo removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userGeneralInfo = await UserGeneralInfo.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }

        res.json({ msg: 'userGeneralInfo updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.put('/emailput/:email/:status', async (req, res) => {
    try {/*
        var email = req.email;
        email = _.extend(email, req.body);
        email.save()*/
        const { status } = req.body
        var query = { email: req.params.email, status: req.params.status };
        //const { email } = req.params;
        const userGeneralInfo = await UserGeneralInfo.findOneAndUpdate(query, req.body, { useFindAndModify: false });
        /*
        userGeneralInfo.status = status;
        userGeneralInfo.save();*/
        /*
                const userGeneralInfo2 = await UserGeneralInfo.updateOne(userGeneralInfo, req.body, { useFindAndModify: false });
        */
        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }



        res.json({ msg: 'userGeneralInfo updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.delete('/:email/:status', async (req, res) => {
    try {
        var query = { email: req.params.email, status: req.params.status };
        const userGeneralInfo = await UserGeneralInfo.findOneAndRemove(query);


        if (!userGeneralInfo) {
            return res.status(404).json({ msg: 'userGeneralInfo not found' });
        }



        res.json({ msg: 'userGeneralInfo item removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});




module.exports = router;