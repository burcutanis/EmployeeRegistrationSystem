const express = require("express");
const router = express.Router();

// Controllers
const {
    sendAccepted,
    sendArrangeInterview,
    sendRejected
} = require("../../controllers/Status/status");

router.route("/sendAccepted").post(sendAccepted);
router.route("/sendRejected").post(sendRejected);
router.route("/sendArrangeInterview").post(sendArrangeInterview);


module.exports = router;