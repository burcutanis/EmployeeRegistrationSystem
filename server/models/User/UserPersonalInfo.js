var mongoose = require('mongoose');
var moment = require('moment');
var userPersonalInfoSchema = mongoose.Schema({
    dateOfBirth: {
        type: Date,
        required: true,
    },
    maritalStatus: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },

});


userPersonalInfoSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.dateOfBirth = moment(object.dateOfBirth).format("MM/DD/YYYY");
    return object;
});

module.exports = UserPersonalInformation = mongoose.model('UserPersonalInformation', userPersonalInfoSchema);