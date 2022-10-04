var mongoose = require('mongoose');
var moment = require('moment');
var userExperienceSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    endYear: {
        type: Date,

    },
    statusInCompany: {
        type: String,
        required: true,
    },
    startYear: {
        type: Date,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    experienceId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },

});


userExperienceSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.startYear = moment(object.startYear).format("DD/MM/YYYY");
    if (object.endYear) {
        object.endYear = moment(object.endYear).format("DD/MM/YYYY");
    }


    return object;
});

module.exports = UserExperienceItem = mongoose.model('UserExperienceItem', userExperienceSchema);