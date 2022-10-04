var mongoose = require('mongoose');
var AddToEmployeeSchema = mongoose.Schema({
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
        required: true,
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

});

AddToEmployeeSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = AddToEmployee = mongoose.model('addToEmployee', AddToEmployeeSchema);