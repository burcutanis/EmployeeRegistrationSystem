import React, { Component, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import './add.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Confirm(props) {

    const { emp, experience, educations, personalInfo, experienceItems, singleFile, singleFileOptions, coverLetter, birthDate, otherFile, additionalInfo } = props;
    const [email, setEmail] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const unique_id = uuid();
    const unique_id2 = uuid();

    useEffect(() => {
        const currentEmail = localStorage.getItem("currentEmail");
        if (currentEmail) setEmail(currentEmail)
    }, [email]
    )




    const continuefnc = async (e) => {
        e.preventDefault();
        if (confirm) {
            const userId = unique_id;
            const experienceId = unique_id2;
            localStorage.setItem("userId", userId);
            console.log(localStorage.getItem("userId"));
            localStorage.setItem("experienceId", experienceId);
            console.log(localStorage.getItem("experienceId"));



            const newEmployee = {
                name: emp.name,
                surname: emp.surname,
                email: email,
                status: "new",
                userId,
                position: emp.position
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
                const res = await axios.post('http://localhost:4000/userGeneralInfo', newEmployee, config);
                const res2 = await axios.post('http://localhost:4000/userPersonalInformation', newPersonalInfo, config);
                const res4 = await axios.post('http://localhost:4000/userExperience', newExperience, config);
                let res5 = "no file";
                try {
                    if (singleFile) {
                        res5 = await axios.post('http://localhost:4000/file', formData, singleFileOptions);
                        console.log(res5.data);
                    }
                }
                catch (err) {
                    console.log("cv error")
                }
                try {
                    if (coverLetter) {
                        res5 = await axios.post('http://localhost:4000/coverLetter', coverLetterData);
                        console.log(res5.data);
                    }
                }
                catch (err) {
                    console.log("cover letter error")
                }
                try {
                    if (otherFile) {
                        res5 = await axios.post('http://localhost:4000/otherFiles', otherFileData);
                        console.log(res5.data);
                    }
                }
                catch (err) {
                    console.log("other file error")
                }
                try {
                    if (additionalInfo.additional) {
                        res5 = await axios.post('http://localhost:4000/additionalInfo', newAdditionalInfo, config);
                        console.log(res5.data);
                    }
                    else {
                        res5 = await axios.post('http://localhost:4000/additionalInfo', newAdditionalInfoEmpty, config);
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
                        const res3 = await axios.post('http://localhost:4000/userEducation', bodyitem, config);
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
                        const res6 = await axios.post('http://localhost:4000/userExperienceItem', bodyitem, config);
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
        }
        else {
            confirmAlert({
                title: 'Give your consent',
                message: 'You have to give your consent to processing of your personal data to submit your application',
                buttons: [
                    {
                        label: 'Ok',

                    },

                ]
            });

        }
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





    return (

        <>
            <Navbarfnc />
            <table style={{ position: "relative", left: "255px", margin: "100px 10px 100px 0" }}>
                <tbody>

                    <tr>
                        <td colSpan={3}>
                            <h1 className="text-center mb-4">Application Form</h1>
                        </td>
                    </tr>
                    <tr>
                        <td className="details-td">
                            <>
                                <div className="label">Name</div> :{" "}
                                <div className="phone">{emp.name}</div>
                            </>


                            <br />
                            <>
                                <div className="label">Surname</div> :{" "}
                                <div className="phone"> {emp.surname}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Position</div> :{" "}
                                <div className="mobile">{emp.position}</div>
                            </>
                            <br />
                            <>
                                <div className="label">Gender</div> :{" "}
                                <div className="phone">{personalInfo.gender}</div>
                            </>
                            <br />
                            <>
                                <div className="label">Marital Status</div> :{" "}
                                <div className="mobile">{personalInfo.maritalStatus}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Address</div> :{" "}
                                <div className="mobile">{personalInfo.address}</div>
                            </>
                            <br />
                            < >
                                <div className="label">City</div> :{" "}
                                <div className="mobile">{personalInfo.city}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Date Of Birth</div> :{" "}
                                <div className="mobile">{dateStr}</div>
                            </>
                            <br />
                            < >
                                <div className="label">Mobile</div> :{" "}
                                <div className="mobile">{personalInfo.mobile}</div>
                            </>


                            <br />
                            < >
                                <div className="label">Current Status</div> :{" "}
                                <div className="mobile">{experience.currentStatus}</div>
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
            {experienceItems[0].companyName ?
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
                : ""
            }
            <Form.Group className="mb-3"
                style={{
                    position: "relative",
                    left: "280px",
                    bottom: "60px"
                }}>

                <input
                    name={"confirm"}
                    type="checkbox"
                    onChange={() => setConfirm(!confirm)}
                />
                <Form.Label style={{ margin: "10px", fontWeight: "bold" }}>I hereby consent to the processing of my personal data for the selected purposes, and agree that the Job Application  </Form.Label>
                <br />
                <Form.Label style={{ fontWeight: "bold" }}> System   may collect, store, process and use the personal data I have provided. My data will only be processed for any  </Form.Label>
                <br />
                <Form.Label style={{ fontWeight: "bold" }}> purpose  beyond those specified if required by law.  </Form.Label>
            </Form.Group>


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
            >Confirm & Submit the application</Button>





        </>


    )

}

export default Confirm;