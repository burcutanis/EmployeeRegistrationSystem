var mongoose = require('mongoose');
var moment = require('moment');

var employeeSchema = mongoose.Schema({
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
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String,
    },
    title: {
        type: String,
    },
    userId: {
        type: String,
    },

    startDate: {
        type: Date,
        default: Date.now
    }


});

employeeSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    object.startDate = moment(object.startDate).format("DD/MM/YYYY");
    return object;
});



module.exports = Employee = mongoose.model('employee', employeeSchema);