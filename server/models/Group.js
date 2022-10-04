var mongoose = require('mongoose');
var groupSchema = mongoose.Schema({
    group: {
        type: String,
        required: true,
        unique: true
    },
});

groupSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = Group = mongoose.model('group', groupSchema);