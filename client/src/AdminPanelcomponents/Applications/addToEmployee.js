import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import Navbarfnc from '../Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function AddToEmployee(props) {
    const unique_id = uuid();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [groups, setGroups] = React.useState([{}]);
    const [titles, setTitles] = React.useState([{}]);
    const [date, setDate] = React.useState({});
    const userId = searchParams.get("userId");
    const [emp, setEmp] = React.useState({});
    const [education, setEducation] = React.useState([{}]);
    const [personalInfo, setPersonalInfo] = React.useState({});
    const [experience, setExperience] = React.useState({});
    const [experienceItem, setExperienceItem] = React.useState([{}]);
    const [generalInfoLoading, setGeneralInfoLoading] = React.useState(true);
    const [educationLoading, setEducationLoading] = React.useState(true);
    const [personalLoading, setPersonalLoading] = React.useState(true);
    const [experienceLoading, setExperienceLoading] = React.useState(true);
    const [experienceItemLoading, setExperienceItemLoading] = React.useState(true);
    const [additionalInfo, setAdditionalInfo] = React.useState("");
    const [singleFile, setSingleFile] = React.useState("");
    const [coverLetter, setCoverLetter] = React.useState("");
    const [otherFile, setOtherFile] = React.useState("");



    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/group');
            setGroups(result.data);
            //console.log(result.data);

        }
        const FetchTitle = async () => {
            const result = await axios.get('http://localhost:4000/title');
            setTitles(result.data);
            //console.log(result.data);

        }
        const FetchGeneralInfo = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);

            setEmp(result.data[0])
            //console.log(result.data);
            setGeneralInfoLoading(false);
        }
        FetchGeneralInfo();
        FetchData();
        FetchTitle();

    }, []
    )




    useEffect(() => {
        const FetchEducation = async () => {
            const result = await axios.get(`http://localhost:4000/userEducation/user/${searchParams.get("userId")}`);
            setEducation(result.data);
            //console.log(result.data);
            //console.log(education);
            setEducationLoading(false);
        }
        FetchEducation();
    }, []
    )

    useEffect(() => {
        const FetchPersonalInfo = async () => {
            const result = await axios.get(`http://localhost:4000/userPersonalInformation/user/${searchParams.get("userId")}`);
            setPersonalInfo(result.data[0]);
            //console.log(result.data);
            //console.log(personalInfo);
            setPersonalLoading(false);
        }
        FetchPersonalInfo();
    }, []
    )

    useEffect(() => {
        const FetchExperience = async () => {
            const result = await axios.get(`http://localhost:4000/userExperience/user/${searchParams.get("userId")}`);
            setExperience(result.data[0]);
            //console.log(result.data);

            setExperienceLoading(false);
        }
        FetchExperience();
    }, []
    )


    useEffect(() => {
        const FetchExperienceItem = async () => {
            const result = await axios.get(`http://localhost:4000/userExperienceItem/user/${searchParams.get("userId")}`);
            setExperienceItem(result.data);
            //console.log(result.data);
            setExperienceItemLoading(false);
        }
        FetchExperienceItem();
    }, []
    )

    useEffect(() => {


        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/additionalInfo/user/${searchParams.get("userId")}`);
            //console.log(result.data);
            setAdditionalInfo(result.data[0].additional);
        }
        FetchData();

    }, []
    )

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/file/${searchParams.get("userId")}`);
            setSingleFile(result.data[0]);
            //console.log(singleFile);
            //console.log(result.data);
        }
        FetchData();

    }, []
    )




    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/coverLetter/${searchParams.get("userId")}`);
            setCoverLetter(result.data[0]);
            //console.log(result.data);
        }
        FetchData();

    }, []
    )


    useEffect(() => {

        const FetchData = async () => {
            const currentUserId = localStorage.getItem("userId");
            const result = await axios.get(`http://localhost:4000/otherFiles/${searchParams.get("userId")}`);
            setOtherFile(result.data[0]);
            //console.log(result.data);

        }
        FetchData();


    }, []
    )





    const changeStatus = () => {

        axios.put(`http://localhost:4000/userGeneralInfo/${emp.id}`, { "status": "employee" })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");

            });
    };






    const onSubmit = async (e) => {
        e.preventDefault();
        const experienceId = unique_id;

        const newEmployee = {
            name: emp.name,
            surname: emp.surname,
            email: emp.email,
            group,
            title,
            startDate,
            userId: userId
        }

        const newPersonalInfo = {
            dateOfBirth: personalInfo.dateOfBirth,
            maritalStatus: personalInfo.maritalStatus,
            address: personalInfo.address,
            city: personalInfo.city,
            mobile: personalInfo.mobile,
            gender: personalInfo.gender,
            userId: userId
        }

        /*
                const newEducation = {
                    highestQualification: education.highestQualification,
                    specialization: education.specialization,
                    endYear: education.endYear,
                    universityName: education.universityName,
                    startYear: education.startYear,
                    userId: userId
                }*/
        const newExperience = {
            currentStatus: experience.currentStatus,
            skills: experience.skills,
            userId: userId,
            experienceId: experienceId
        }

        const newAdditionalInfo = {
            additional: additionalInfo,
            userId
        }

        const newCV = {
            fileName: singleFile.fileName,
            filePath: singleFile.filePath,
            fileType: singleFile.fileType,
            fileSize: singleFile.fileSize,
            userId
        }




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
                    res5 = await axios.post('http://localhost:4000/employeeCV/cv', newCV);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("cv error")
            }
            try {
                if (coverLetter) {
                    const newCoverLetter = {
                        fileName: coverLetter.fileName,
                        filePath: coverLetter.filePath,
                        fileType: coverLetter.fileType,
                        fileSize: coverLetter.fileSize,
                        userId
                    }
                    res5 = await axios.post('http://localhost:4000/employeeCoverLetter/cover', newCoverLetter);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("cover letter error")
            }
            try {
                if (otherFile) {
                    const newOtherFile = {
                        fileName: otherFile.fileName,
                        filePath: otherFile.filePath,
                        fileType: otherFile.fileType,
                        fileSize: otherFile.fileSize,
                        userId
                    }

                    res5 = await axios.post('http://localhost:4000/employeeOther/other', newOtherFile);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("other file error")
            }
            try {
                if (additionalInfo) {
                    res5 = await axios.post('http://localhost:4000/adminAdditionalInfo', newAdditionalInfo, config);
                    console.log(res5.data);
                }
            }
            catch (err) {
                console.log("additional info error")
            }


            for (let i = 0; i < education.length; i++) {
                console.log(education[i]);
                const educationId = unique_id;
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    const res5 = await axios.post('http://localhost:4000/education', {
                        highestQualification: education[i].highestQualification,
                        specialization: education[i].specialization,
                        endYear: education[i].endYear,
                        universityName: education[i].universityName,
                        startYear: education[i].startYear,
                        userId: userId,
                        educationId: educationId,
                        continueBool: education[i].continueBool

                    }, config);
                }
                catch (err) {
                    console.error(err.response.data);
                }

            }

            for (let i = 0; i < experienceItem.length; i++) {
                console.log(experienceItem[i]);
                const experienceId2 = unique_id;
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    const res5 = await axios.post('http://localhost:4000/experienceItem', {
                        experienceId: experienceId2,
                        companyName: experienceItem[i].companyName,
                        endYear: experienceItem[i].endYear,
                        statusInCompany: experienceItem[i].statusInCompany,
                        startYear: experienceItem[i].startYear,
                        industry: experienceItem[i].industry,
                        area: experienceItem[i].area,
                        yearsOfExperience: experienceItem[i].yearsOfExperience,
                        userId: userId
                    }, config);
                }
                catch (err) {
                    console.error(err.response.data);
                }

                console.log(res.data);
                console.log(res2.data);
                console.log(res4.data);

            }
            changeStatus();


            navigate({
                pathname: '/employees',

            })
            console.log(res.data);

        }
        catch (err) {
            console.error(err.response.data);

        }

    };

    const [employee, setEmployee] = React.useState({ group: "", title: "", startDate: "", },
    );
    const { group, title, startDate } = employee;




    const onChange = (e) =>
        setEmployee({ ...employee, [e.target.name]: e.target.value });


    if (generalInfoLoading && educationLoading && personalLoading && experienceLoading && experienceItemLoading) {
        return (
            <h1>Loading</h1>
        )

    }
    console.log(searchParams.get("userId"));




    return (
        <>
            <Navbarfnc />


            <div id="container">
                <h1>• Add to Employee List •</h1>



                <Form onSubmit={onSubmit}>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start to work date</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter start date "
                            name="startDate"
                            value={startDate}
                            onChange={onChange}
                            id="surname_input"
                            required="true" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Group name which employee is assigned *</Form.Label>
                        <Form.Select value={group} name="group" required="true" onChange={onChange}>
                            <option value=""></option>
                            {groups.map((groupName, i) => (
                                <option key={groupName.group} value={groupName.group}>
                                    {groupName.group}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Position which employee is assigned *</Form.Label>
                        <Form.Select value={title} name="title" required="true" onChange={onChange}>
                            <option value=""></option>
                            {titles.map((titleName, i) => (
                                <option key={titleName.title} value={titleName.title}>
                                    {titleName.title}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>

                    <input type="submit" id="form_button" value="Submit" />
                </Form>





            </div>
        </>



    )

}
export default AddToEmployee;

/*                {emp.name}
                {emp.surname}
                {emp.email}
                {personalInfo.maritalStatus}
                {searchParams.get("id")}

                {experience.skills}

                {experienceItem.map((ex, i) => (
                    <tr>
                        <td>{ex.companyName}</td>
                        <td>{ex.startYear}</td>
                        <td>{ex.endYear}</td>
                        <td>{ex.industry}</td>
                        <td>{ex.area}</td>
                        <td>{ex.statusInCompany}</td>




                    </tr>
                ))
                }

                {education.map((ex, i) => (
                    <tr>
                        <td>{ex.universityName}</td>

                    </tr>
                ))
                }
                {singleFile ? singleFile.fileName : "no cv"}
                {coverLetter ? coverLetter.fileName : "no cover letter"}
                {otherFile ? otherFile.fileName : "no other file"}
                {additionalInfo ? additionalInfo : "no additional"}
*/