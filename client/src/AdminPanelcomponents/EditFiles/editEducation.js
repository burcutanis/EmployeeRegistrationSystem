import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import './edit.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbarfnc from '../Navbar';


function EditEducation() {
    const [searchParams] = useSearchParams();
    const [highestQualification, setHighestQualification] = React.useState();
    const [specialization, setSpecialization] = React.useState("");
    const [endYear, setEndYear] = React.useState("");
    const [universityName, setUniversityName] = React.useState("");
    const [startYear, setStartYear] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [id, setId] = React.useState("");
    const [checked, setChecked] = React.useState(false);


    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/education/education/${searchParams.get("educationId")}`)
                .then(result => {
                    setHighestQualification(result.data[0].highestQualification)
                    setSpecialization(result.data[0].specialization)
                    setEndYear(result.data[0].endYear)
                    setUniversityName(result.data[0].universityName)
                    setStartYear(result.data[0].startYear)
                    setUserId(result.data[0].userId)
                    setId(result.data[0].id)
                    // console.log(result.data);
                });

        }
        FetchData();

    }, []
    )

    const [university, setUniversity] = React.useState([{}]);
    const [checkUniv, setCheckUniv] = React.useState(false);

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get("http://universities.hipolabs.com/search?&country=turkey&ref=morioh.com&utm_source=morioh.com");
            setUniversity(result.data);
            //console.log(result.data);
        }
        FetchData();

    }, [university.value]
    )
    const navigate = useNavigate();

    const onQualificationChanged = e => setHighestQualification(e.target.value)
    const onSpecializationChanged = e => setSpecialization(e.target.value)
    const onEndYearChanged = e => setEndYear(e.target.value)
    const onUniversityChanged = e => setUniversityName(e.target.value)
    const onStartYearChanged = e => setStartYear(e.target.value)


    function updateUser() {
        if (checked) {
            axios.put(`http://localhost:4000/education/${id}`, {
                "highestQualification": highestQualification,
                "specialization": specialization, "endYear": null,
                "universityName": universityName, "startYear": startYear,
                "continueBool": checked
            })

                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setHighestQualification(highestQualification)
                    setSpecialization(specialization)
                    setEndYear(endYear)
                    setUniversityName(universityName)
                    setStartYear(startYear)
                    setUserId(userId)

                });

        }
        else {
            axios.put(`http://localhost:4000/education/${id}`, {
                "highestQualification": highestQualification,
                "specialization": specialization, "endYear": endYear,
                "universityName": universityName, "startYear": startYear,
                "continueBool": checked
            })

                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setHighestQualification(highestQualification)
                    setSpecialization(specialization)
                    setEndYear(endYear)
                    setUniversityName(universityName)
                    setStartYear(startYear)
                    setUserId(userId)

                });
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/education',
            search: createSearchParams({
                id: userId,
            }).toString()
        })
    };




    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit Education Information  •</h1>
                <h1>{searchParams.get("id")}</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Qualification Degree *</Form.Label>
                        <Form.Select aria-label="Default select example"
                            value={highestQualification}
                            name="highestQualification"
                            required={true}
                            onChange={onQualificationChanged}>
                            <option value=""></option>
                            <option value={"Less than a high school diploma"}>Less than a high school diploma</option>
                            <option value={"High School Diploma"}>High School Diploma</option>
                            <option value={"Some College, No degree"}>Some College, No degree</option>
                            <option value={"Associate's degree"}>Associate's degree</option>
                            <option value={"Bachelor's degree"}>Bachelor's degree</option>
                            <option value={"Master's degree"}>Master's degree</option>
                            <option value={"Professional degree"}>Professional degree</option>
                            <option value={"Doctoral degree"}>Doctoral degree</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Specialization </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Specialization"
                            name="specialization"
                            value={specialization}
                            onChange={onSpecializationChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    {!checkUniv ?
                        <Form.Group className="mb-3" >
                            <Form.Label>University/College Name * </Form.Label>
                            <Form.Select value={universityName}
                                name="universityName" onChange={onUniversityChanged}>
                                <option value=""></option>
                                {university.map((univ, i) => (
                                    <option value={univ.name}>
                                        {univ.name}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        : ""
                    }

                    <Form.Group className="mb-3" >
                        <Form.Label>Other University/College </Form.Label>
                        <input
                            aria-label={checkUniv}
                            defaultChecked={checkUniv}
                            name={"checkUniv"}
                            type="checkbox"
                            onChange={() => setCheckUniv(!checkUniv)}
                        />
                    </Form.Group>
                    {checkUniv ?
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type="text"
                                placeholder="Enter your University/College Name"
                                name="universityName"
                                value={universityName}
                                onChange={onUniversityChanged}
                                id="name_input"
                                required={true} />
                        </Form.Group>
                        : ""}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Start Year"
                            name="startYear"
                            value={startYear}
                            onChange={onStartYearChanged}
                            id="email_input"
                            required={true} />
                    </Form.Group>
                    <Row>
                        <Col lg={3} style={{
                            position: "relative",
                            top: "20px"
                        }}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Continue to education </Form.Label>
                                <input
                                    name={"continueBool"}
                                    type="checkbox"
                                    defaultChecked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={8}>


                            {!checked ?
                                <Form.Group className="mb-3" >
                                    <Form.Label>End Year </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="year-month-day"
                                        name="endYear"
                                        value={endYear}
                                        onChange={onEndYearChanged}
                                        id="surname_input"
                                    />
                                </Form.Group>
                                : ""}
                        </Col>
                    </Row>

                    <input type="submit" id="form_button" value="SUBMIT" />
                </Form>

            </div>
        </>

    );
}
export default EditEducation;