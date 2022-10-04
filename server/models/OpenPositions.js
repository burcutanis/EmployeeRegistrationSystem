var mongoose = require('mongoose');
var openPositionsSchema = mongoose.Schema({
    positionName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    explanation: {
        type: String,
    },
});

openPositionsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = OpenPosition = mongoose.model('OpenPosition', openPositionsSchema);