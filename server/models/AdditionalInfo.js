var mongoose = require('mongoose');

var additionalInfoSchema = mongoose.Schema({
    additional: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },


});

additionalInfoSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = AdditionalInfo = mongoose.model('AdminAdditionalInfo', additionalInfoSchema);