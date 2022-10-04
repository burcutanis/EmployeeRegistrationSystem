const express = require("express");
const router = express.Router();

// Controllers
const {
    login,
    register,
    forgotPassword,
    resetPassword,
    completeRegistration
} = require("../../controllers/User/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router.route("/completeRegistration/:registerToken").put(completeRegistration);

router.get('/', async (req, res) => {
    try {
        const education = await UserEducation.find().sort({ date: -1 });
        res.json(education);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;