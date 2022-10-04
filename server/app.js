require("dotenv").config({ path: "./config.env" });
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const connectDB = require('./config/db');
const cors = require("cors");
var corsOptions = {
	origin: "http://localhost:3000"
};
const errorHandler = require("./middleware/error")

connectDB();
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

//app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('addUser');
});


app.post('/person', urlencodedParser, function (req, res) {
	res.send('Thank you!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);


	var Schema = mongoose.Schema;
	console.log("29");
	var personSchema = new Schema({
		firstname: String,
		lastname: String
	});
	console.log("34");

	var Person = mongoose.model('Person', personSchema);

	var newPerson = new Person({
		firstname: req.body.firstname,
		lastname: req.body.lastname,

	});
	console.log("43");

	newPerson.save(function (err) {
		if (err) throw err;

		console.log('person saved!');
	});
	console.log("50");


});

// ADMIN PANEL ROUTES 
app.use('/employee', require('./routes/Admin/employee'));
app.use('/group', require('./routes/Admin/group'));
app.use('/title', require('./routes/Admin/title'));
app.use('/openPosition', require('./routes/Admin/openPosition'));
app.use('/personalInformation', require('./routes/Admin/personalinformation'));
app.use('/education', require('./routes/Admin/education'));
app.use('/experience', require('./routes/Admin/experience'));
app.use('/experienceItem', require('./routes/Admin/experienceItem'));
app.use("/status", require("./routes/Admin/status"));
app.use('/adminAdditionalInfo', require('./routes/Admin/additionalInfo'));



// USER PANEL ROUTES 
app.use('/userGeneralInfo', require('./routes/User/userinfo'));
app.use('/userPersonalInformation', require('./routes/User/userPersonalInfo'));
app.use('/userEducation', require('./routes/User/userEducation'));
app.use('/userExperience', require('./routes/User/userExperience'));
app.use('/userExperienceItem', require('./routes/User/userExperienceItem'));
app.use('/additionalInfo', require('./routes/User/additionalInfo'));

//ADMIN PANEL AUTH ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));


//USER PANEL AUTH ROUTES
app.use("/client/auth", require("./routes/User/auth"));


app.use("/file", require("./routes/FileUpload/uploadCV"));
app.use("/image", require("./routes/FileUpload/profilePicture"));
app.use("/coverLetter", require("./routes/FileUpload/uploadCoverLetter"));
app.use("/otherFiles", require("./routes/FileUpload/uploadOther"));
app.use("/employeeCV", require("./routes/FileUpload/employeeCV"));
app.use("/employeeCoverLetter", require("./routes/FileUpload/employeeCoverLetter"));
app.use("/employeeOther", require("./routes/FileUpload/employeeOther"));





// Error Handler Middleware
app.use(errorHandler);


var port = process.env.PORT || 4000;
app.listen(port);


//mongoose.connect('mongodb+srv://burcudeneme:deneme@atlascluster.e16u7.mongodb.net/?retryWrites=true&w=majority');

