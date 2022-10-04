const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OtherSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        unique: true

    }
}
);

module.exports = mongoose.model('OtherFile', OtherSchema);