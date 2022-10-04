var mongoose = require('mongoose');
var config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {

        await mongoose.connect(db, {
            useNewUrlParser: true,

            useUnifiedTopology: true,

        });
        console.log("mongodb connected")

    }
    catch (err) {
        console.log(err.message);
        process.exit(1);

    }
}

module.exports = connectDB;