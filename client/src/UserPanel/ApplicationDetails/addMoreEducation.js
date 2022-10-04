import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import Navbarfnc from '../NavbarUser';




function Add(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const educationId = uuid();
    const userId = searchParams.get("userId");
    const [checked, setChecked] = React.useState(false);

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

    const [educationItem, setEducationItem] = React.useState({
        highestQualification: "", specialization: "", universityName: "",
        endYear: "", startYear: "", continueBool: checked
    },
    );
    const { highestQualification, specialization, universityName, endYear, startYear, continueBool } = educationItem;

    const onChange3 = (e) =>
        setEducationItem({ ...educationItem, [e.target.name]: e.target.value });


    const onSubmit = async (e) => {
        e.preventDefault();
        let newEducationItem = {};
        if (checked) {
            newEducationItem = {
                highestQualification, specialization,
                universityName, startYear, userId,
                educationId,
                continueBool: checked
            }
        }
        else {
            newEducationItem = {
                highestQualification, specialization,
                universityName, startYear, userId,
                educationId, continueBool: checked, endYear,
            }
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('http://localhost:4000/userEducation', newEducationItem, config);


            navigate({
                pathname: '/userAppEducation',
                search: createSearchParams({
                    userId: userId
                }).toString()
            })
            console.log(res.data);
        }
        catch (err) {
            console.error(err.response.data);

        }
    };



    return (
        <>
            <Navbarfnc />


            <div id="container">
                <h1>• Add Education •</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit} >

                    <Form.Group className="mb-3" >
                        <Form.Label>Qualification Degree *</Form.Label>
                        <Form.Select aria-label="Default select example"
                            value={highestQualification}
                            name="highestQualification"
                            required={true}
                            onChange={onChange3}>
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


                    <Form.Group className="mb-3">
                        <Form.Label>Specialization * </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Specialization"
                            name="specialization"
                            value={specialization}
                            onChange={onChange3}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    {!checkUniv ?
                        <Form.Group className="mb-3" >
                            <Form.Label>University/College Name * </Form.Label>
                            <Form.Select value={universityName}
                                name="universityName" onChange={onChange3}>
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
                                onChange={onChange3}
                                id="name_input"
                                required={true} />
                        </Form.Group>
                        : ""}
                    <Form.Group className="mb-3" >
                        <Form.Label>Start Year *</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your Start Year"
                            name="startYear"
                            value={startYear}
                            onChange={onChange3}
                            id="email_input"
                            required={true} />
                    </Form.Group>
                    <Row>
                        <Col lg={3} style={{
                            position: "relative",
                            top: "30px"
                        }}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Continue to Education </Form.Label>
                                <input
                                    name={"continueBool"}
                                    type="checkbox"
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
                                        onChange={onChange3}
                                        id="surname_input"
                                    />
                                </Form.Group>
                                : ""}
                        </Col>
                    </Row>


                    <header className="head-form">
                        <p> Please fill all the necessary fields with *.</p>
                    </header>
                    <input type="submit" variant="outline-danger" className="form-control" value="Add Education" />



                </Form>



            </div>



        </>



    )

}
export default Add;