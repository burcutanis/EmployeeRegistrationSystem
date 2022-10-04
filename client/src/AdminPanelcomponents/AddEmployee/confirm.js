import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import './Add.css'

function Confirm(props) {

    const { emp, experience, educations, personalInfo, experienceItems, singleFile,
        singleFileOptions, coverLetter, birthDate, otherFile, additionalInfo,
        startDate } = props;

    const unique_id = uuid();
    const unique_id2 = uuid();


    const continuefnc = async (e) => {
        e.preventDefault();
        const userId = unique_id;
        const experienceId = unique_id2;


        const newEmployee = {
            name: emp.name,
            surname: emp.surname,
            email: emp.email,
            group: emp.group,
            title: emp.title,
            startDate: startDate,
            userId,
        }

        const newPersonalInfo = {
            dateOfBirth: birthDate,
            maritalStatus: personalInfo.maritalStatus,
            address: personalInfo.address,
            city: personalInfo.city,
            mobile: personalInfo.mobile,
            gender: personalInfo.gender,
            userId
        }
        const newExperience = {
            currentStatus: experience.currentStatus,
            skills: experience.skills,
            userId,
            experienceId
        }

        const newAdditionalInfo = {
            additional: additionalInfo.additional,
            userId
        }

        const newAdditionalInfoEmpty = {
            additional: "",
            userId
        }


        const formData = new FormData();
        formData.append('file', singleFile);
        formData.append('userId', userId);

        const coverLetterData = new FormData();
        coverLetterData.append('file', coverLetter);
        coverLetterData.append('userId', userId);

        const otherFileData = new FormData();
        otherFileData.append('file', otherFile);
        otherFileData.append('userId', userId);






        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(newEmployee);
            const res = await axios.post('http://localhost:4000/employee', newEmployee, config);
            const res2 = await axios.post('http://localhost:4000/personalInformation', newPersonalInfo, config);
            const res4 = await axios.post('http://localhost:4000/experience', newExperience, config);
            let res5 = "no file";


            try {
                if (singleFile) {
                    res5 = await axios.post('http://localhost:4000/employeeCV', formData, singleFileOptions);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("cv error")
            }
            try {
                if (coverLetter) {
                    res5 = await axios.post('http://localhost:4000/employeeCoverLetter', coverLetterData);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("cover letter error")
            }
            try {
                if (otherFile) {
                    res5 = await axios.post('http://localhost:4000/employeeOther', otherFileData);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("other file error")
            }
            try {
                if (additionalInfo.additional) {
                    res5 = await axios.post('http://localhost:4000/adminAdditionalInfo', newAdditionalInfo, config);
                    console.log(res5.data);
                }
                else {
                    res5 = await axios.post('http://localhost:4000/adminAdditionalInfo', newAdditionalInfoEmpty, config);
                    console.log(res5.data);

                }
            }
            catch (err) {
                console.log("additional info error")
            }



            for (let i = 0; i < educations.length; i++) {
                console.log(educations[i]);
                const educationId = uuid();
                let newEducation = {};
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                    if (educations[i].continueBool) {
                        newEducation = {
                            highestQualification: educations[i].highestQualification,
                            specialization: educations[i].specialization,
                            universityName: educations[i].universityName,
                            startYear: educations[i].startYear,
                            continueBool: educations[i].continueBool,
                            userId,
                            educationId
                        }
                    }
                    else {
                        newEducation = {
                            highestQualification: educations[i].highestQualification,
                            specialization: educations[i].specialization,
                            continueBool: educations[i].continueBool,
                            endYear: educations[i].endYear,
                            universityName: educations[i].universityName,
                            startYear: educations[i].startYear,
                            userId,
                            educationId
                        }
                    }

                    const bodyitem = JSON.stringify(newEducation);
                    const res3 = await axios.post('http://localhost:4000/education', bodyitem, config);
                    console.log(res3.data);
                }
                catch (err) {
                    console.error(err.response.data);
                }

            }


            for (let i = 0; i < experienceItems.length; i++) {
                console.log(experienceItems[i]);
                console.log(experienceItems[i].companyName);
                const unique_id3 = uuid();
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    let newExperienceItem = {};
                    if (experienceItems[i].continue) {
                        newExperienceItem = {
                            companyName: experienceItems[i].companyName,
                            statusInCompany: experienceItems[i].statusInCompany,
                            startYear: experienceItems[i].startYear,
                            industry: experienceItems[i].industry,
                            area: experienceItems[i].area,
                            experienceId: unique_id3,
                            userId: userId

                        }
                    }
                    else {
                        newExperienceItem = {
                            companyName: experienceItems[i].companyName,
                            statusInCompany: experienceItems[i].statusInCompany,
                            startYear: experienceItems[i].startYear,
                            industry: experienceItems[i].industry,
                            area: experienceItems[i].area,
                            endYear: experienceItems[i].endYear,
                            experienceId: unique_id3,
                            userId: userId

                        }

                    }
                    const bodyitem = JSON.stringify(newExperienceItem);
                    const res6 = await axios.post('http://localhost:4000/experienceItem', bodyitem, config);
                    console.log(res6.data);
                }
                catch (err) {
                    console.error(err.response.data);
                }

            }

            console.log(res.data);
            console.log(res2.data);
            console.log(res4.data);
            console.log(res5.data);

        }
        catch (err) {
            console.error(err.response.data);

        }
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    let dateStr = "";
    const birthDateFunction = () => {
        birthDate.toString().split(" ").map((date, index) => {
            if (index < 4) {
                dateStr = dateStr + " " + date;
            }
        })
    }
    birthDateFunction();

    let startDateStr = "";
    const startDateFunction = () => {
        startDate.toString().split(" ").map((date, index) => {
            if (index < 4) {
                startDateStr = startDateStr + " " + date;
            }
        })
    }
    startDateFunction();


    return (

        <>
            <Navbarfnc />
            <table style={{ position: "relative", left: "255px", margin: "100px 10px 100px 0" }}>
                <tbody>

                    <tr>
                        <td colSpan={3}>
                            <h1 className="text-center mb-4">New Employee Informations</h1>
                        </td>
                    </tr>
                    <tr>
                        <td className="details-td">
                            <>
                                <div className="label">Name</div> :{" "}
                                <div className="divField">{emp.name}</div>
                            </>


                            <br />
                            <>
                                <div className="label">Surname</div> :{" "}
                                <div className="divField"> {emp.surname}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Email</div> :{" "}
                                <div className="divField">{emp.email}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Group</div> :{" "}
                                <div className="divField">{emp.group}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Title</div> :{" "}
                                <div className="divField" >{emp.title}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Start Date</div> :{" "}
                                <div className="divField">{startDate.toString()}</div>
                            </>
                            <br />
                            <>
                                <div className="label">Gender</div> :{" "}
                                <div className="divField">{personalInfo.gender}</div>
                            </>
                            <br />
                            <>
                                <div className="label">Marital Status</div> :{" "}
                                <div className="divField">{personalInfo.maritalStatus}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Address</div> :{" "}
                                <div className="divField">{personalInfo.address}</div>
                            </>
                            <br />
                            < >
                                <div className="label">City</div> :{" "}
                                <div className="divField">{personalInfo.city}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Date Of Birth</div> :{" "}
                                <div className="divField">{dateStr}</div>


                            </>
                            <br />
                            < >
                                <div className="label">Mobile</div> :{" "}
                                <div className="divField">{personalInfo.mobile}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Current Status</div> :{" "}
                                <div className="divField">{experience.currentStatus}</div>
                            </>
                            <br />




                        </td>

                    </tr>
                </tbody>

            </table>
            <table style={{ position: "relative", left: "255px", bottom: "100px" }} >
                <tbody >

                    <tr>
                        <div className="label">Skills</div>
                        <td> {experience.skills}</td>
                    </tr>


                </tbody>
            </table>
            {additionalInfo.additional ?
                <table style={{ position: "relative", left: "255px", bottom: "100px" }}>
                    <tbody>
                        <tr>
                            <div className="label">Additional Informations</div>
                            <td> {additionalInfo.additional}</td>
                        </tr>

                    </tbody>
                </table>
                : ""
            }

            <h4 style={{

                position: "relative",
                left: "55px",

            }}>Education Informations</h4>
            <Table striped bordered hover style={{
                width: "700px",
                position: "relative",
                left: "285px",
                bottom: "80px"
            }}
            >


                <thead>

                    <tr>
                        <th>Qualification</th>
                        <th>Specialization</th>
                        <th>University/College Name</th>
                        <th>Start Year</th>
                        <th>End Year</th>


                    </tr>
                </thead>
                <tbody>
                    {educations.map((ex, i) => (
                        <tr>
                            <td>{ex.highestQualification}</td>
                            <td>{ex.specialization}</td>
                            <td>{ex.universityName}</td>
                            <td>{ex.startYear}</td>
                            <td>{ex.continueBool ? "continue" : ex.endYear}</td>




                        </tr>
                    ))
                    }
                </tbody>
            </Table>

            {
                experienceItems[0].companyName ?
                    <>
                        <h4 style={{

                            position: "relative",
                            left: "85px",

                        }}>Job Experiences</h4>
                        <Table striped bordered hover style={{
                            width: "700px",
                            position: "relative",
                            left: "285px",
                            bottom: "80px"
                        }}
                        >


                            <thead>

                                <tr>
                                    <th>Company Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Industry</th>
                                    <th>Area</th>
                                    <th>Status In Company</th>


                                </tr>
                            </thead>
                            <tbody>
                                {experienceItems.map((ex, i) => (
                                    <tr>
                                        <td>{ex.companyName}</td>
                                        <td>{ex.startYear}</td>
                                        <td>{ex.continue ? "continue" : ex.endYear}</td>
                                        <td>{ex.industry}</td>
                                        <td>{ex.area}</td>
                                        <td>{ex.statusInCompany}</td>



                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </>
                    :
                    ""
            }

            <Button
                color="secondary"
                variant="danger"
                onClick={back}
                style={{ position: "relative", left: "375px", bottom: "80px", margin: "0 0 100px 0", width: "200px" }}
            >Back</Button>

            <Button
                color="primary"
                variant="success"
                onClick={continuefnc}
                style={{ position: "relative", left: "395px", bottom: "80px", margin: "0 0 100px 0", width: "200px" }}
            >Confirm & Submit </Button>




        </>


    )

}

export default Confirm;