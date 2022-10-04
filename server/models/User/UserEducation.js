var mongoose = require('mongoose');
var moment = require('moment');
var userEducationSchema = mongoose.Schema({
    highestQualification: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    endYear: {
        type: Date,
    },
    universityName: {
        type: String,
        required: true,
    },
    startYear: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    educationId: {
        type: String,
        required: true,
    },
    continueBool: {
        type: Boolean,
    }

});

userEducationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.startYear = moment(object.startYear).format("YYYY");
    if (object.endYear) {
        object.endYear = moment(object.endYear).format("YYYY");
    }
    return object;
});


module.exports = UserEducation = mongoose.model('UserEducation', userEducationSchema);