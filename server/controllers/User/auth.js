const crypto = require("crypto");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/User/User");
const sendEmail = require("../../utils/sendEmail");


exports.login = async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {

        const user = await User.findOne({ email }).select("+password");
        console.log(user);

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        if (!user.registerCompleted) {
            return next(new ErrorResponse("Registration is not completed", 400));
        }



        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        /*
        res.status(201).json({
            success: true,
            token: "4365639ef"
        })
*/
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};


exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        const registerToken = user.getRegisterToken();

        await user.save();


        const registerUrl = `http://localhost:3000/userCompleteRegister/${registerToken}`;


        const message = `
          <p>Click the following link to complete the registration:</p>
          <a href=${registerUrl} clicktracking=off>${registerUrl}</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Complete Registration",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);

            user.registerToken = undefined;
            user.registerExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }


        //sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};


exports.completeRegistration = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const registerToken = crypto
        .createHash("sha256")
        .update(req.params.registerToken)
        .digest("hex");


    try {
        const user = await User.findOne({
            registerToken,
            registerExpire: { $gt: Date.now() },
        });
        if (!user) {
            console.log(user);
            return next(new ErrorResponse("Invalid Token", 400));

        }


        user.registerCompleted = req.body.registerCompleted;
        user.registerToken = undefined;
        user.registerExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Registration completed",
            token: user.getSignedJwtToken(),

        });
    } catch (err) {
        next(err);
    }
};


exports.forgotPassword = async (req, res, next) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = user.getResetPasswordToken();

        await user.save();
        console.log(user);


        const resetUrl = `http://localhost:3000/userPasswordreset/${resetToken}`;


        const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};


exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");


    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: user.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({ success: true, token });
};