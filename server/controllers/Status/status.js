const crypto = require("crypto");
const ErrorResponse = require("../../utils/errorResponse");
const UserApplication = require("../../models/User/UserApplication");
const sendEmail = require("../../utils/sendEmail");




exports.sendAccepted = async (req, res, next) => {
    // Send Email to email provided but first check if user exists

    const { email, name } = req.body;

    try {
        const user = await UserApplication.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // HTML Message
        const message = `
        <p>Dear ${name},</p>
        <p>After the interview we made with you, we evaluated your application positively  </p>
        <p>Our HR group will contact you for further details </p>
        <p>Have a nice day</p>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Job Application Acceptance",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);
            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};


exports.sendRejected = async (req, res, next) => {
    // Send Email to email provided but first check if user exists

    const { email, name } = req.body;

    try {
        const user = await UserApplication.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // HTML Message
        const message = `
      <p>Dear ${name},</p>
      <p>Unfortunately, Your job application was rejected for this time</p>
      <p>Thank you for your application</p>
      <p>Have a nice day</p>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Job Application",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);
            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};


exports.sendArrangeInterview = async (req, res, next) => {
    // Send Email to email provided but first check if user exists

    const { email, name } = req.body;

    try {
        const user = await UserApplication.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // HTML Message
        const message = `
        <p>Dear ${name},</p>
        <p>Your job application was evaluated and we want to meet you </p>
        <p>Please call the Human Resources to arrange an interview with us</p>
        <p>Number of our HR group: 05324975049</p>
        <p>Have a nice day</p>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Job Application",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);
            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};
