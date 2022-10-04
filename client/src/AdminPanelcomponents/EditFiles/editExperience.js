import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import './edit.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbarfnc from '../Navbar';


function EditExperience() {
    const [searchParams] = useSearchParams();
    const [currentStatus, setCurrentStatus] = React.useState();
    const [skills, setSkills] = React.useState("");
    const [experienceId, setExperienceId] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [id, setId] = React.useState("");


    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/experience/user/${searchParams.get("id")}`)
                .then(result => {
                    setCurrentStatus(result.data[0].currentStatus)
                    setSkills(result.data[0].skills)
                    setExperienceId(result.data[0].experienceId)
                    setUserId(result.data[0].userId)
                    setId(result.data[0].id)
                    //console.log(result.data);
                });

        }
        FetchData();

    }, []
    )
    const navigate = useNavigate();

    const onCurrentStatusChanged = e => setCurrentStatus(e.target.value)
    const onSkillsChanged = e => setSkills(e.target.value)



    function updateUser() {
        axios.put(`http://localhost:4000/experience/${id}`, { "currentStatus": currentStatus, "skills": skills })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setCurrentStatus(currentStatus)
                setSkills(skills)

            });
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/experience',
            search: createSearchParams({
                id: userId,
            }).toString()
        })
    };




    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit Experience •</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CURRENT STATUS *</Form.Label>
                        <Form.Select aria-label="Default select example"
                            value={currentStatus}
                            name="currentStatus" required={true}
                            onChange={onCurrentStatusChanged}
                            placeholder="Enter your current status" >
                            <option value=""></option>
                            <option value={"Unemployed"}>Unemployed</option>
                            <option value={"Employed"}>Employed </option>
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> <span><h6>SKILLS *</h6>  <p>List any skills that the employee have related to her/his position </p></span> </Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea" rows={3}
                            placeholder="Enter the skills"
                            name="skills"
                            value={skills}
                            onChange={onSkillsChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>

                    <input type="submit" id="form_button" value="SUBMIT" />

                </Form>


            </div>
        </>

    );
}
export default EditExperience;