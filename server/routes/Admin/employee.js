
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');

const Employee = require('../../models/Employee');


router.post('/',
    check('name', 'Name is required').notEmpty(),
    check('surname', 'Surname is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, surname, group, title, userId } = req.body;

        try {

            var employee = new Employee({
                name,
                surname,
                email,
                group,
                title,
                userId
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


router.post('/addToEmployee',
    check('name', 'Name is required').notEmpty(),
    check('surname', 'Surname is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, surname, group, title, userId, startDate } = req.body;

        try {

            var employee = new Employee({
                name,
                surname,
                email,
                group,
                title,
                userId,
                startDate
            });

            await employee.save();
            console.log("49");
            res.send("Employee added to employee list");


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ date: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
        if (!employee) {
            return res.status(404).json({ msg: 'employee not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const employee = await Employee.find(query);
        res.json(employee);
        if (!employee) {
            return res.status(404).json({ msg: 'employee not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




router.delete('/:id', async (req, res) => {
    try {
        var query = { userId: req.params.id };
        const employee = await Employee.findOneAndRemove(query);


        if (!employee) {
            return res.status(404).json({ msg: 'employee not found' });
        }


        res.json({ msg: 'employee removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

        if (!employee) {
            return res.status(404).json({ msg: 'employee not found' });
        }

        res.json({ msg: 'employee updated' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});


router.delete('/', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.deleteMany({});

        if (!employee) {
            return res.status(404).json({ msg: 'employee not found' });
        }

        res.json({ msg: 'all employees deleted' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});


module.exports = router;
