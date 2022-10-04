var mongoose = require('mongoose');
var moment = require('moment');

var userInformationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "new"
    },
    userId: {
        type: String,
    },
    position: {
        type: String,
        required: true
    },



});

userInformationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.date = moment(object.date).format("DD/MM/YYYY");
    return object;
});

module.exports = UserGeneralInfo = mongoose.model('JobApplication', userInformationSchema);