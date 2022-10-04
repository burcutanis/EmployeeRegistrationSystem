var mongoose = require('mongoose');
var experiencesSchema = mongoose.Schema({
    currentStatus: {
        type: String,
        required: true,
    },
    skills: {
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

experiencesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = Experience = mongoose.model('experience', experiencesSchema);