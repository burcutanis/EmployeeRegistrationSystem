var mongoose = require('mongoose');
var titleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
});

titleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = Title = mongoose.model('title', titleSchema);