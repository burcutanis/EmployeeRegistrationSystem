import React, { useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Add.css'
import axios from 'axios';



function Add(props) {
    const [university, setUniversity] = React.useState([{}]);
    const [checkUniv, setCheckUniv] = React.useState(false);

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get("http://universities.hipolabs.com/search?&country=turkey&ref=morioh.com&utm_source=morioh.com");
            setUniversity(result.data);
            console.log(result.data);
        }
        FetchData();

    }, [university.value]
    )

    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    const [dateOfBirth, setdateOf] = React.useState([
    ]);

    let num;

    function ChangeDate2(date) {
        for (let i = 0; i < educations.length; i++) {
            let newdates = [...dateOfBirth];
            newdates[i] = date;
            setdateOf(newdates);

        }
    };
    console.log(dateOfBirth);

    const { educations, handleChange, addEducationFields, removeEducationFields } = props;
    return (

        <>
            <Navbarfnc />


            <Form onSubmit={continuefnc} >
                {educations.map((education, index) => (
                    <div id="container" className="educationDiv">

                        <header className="head-form">
                            <h1>•  Add Education  •</h1>

                        </header>
                        <Form.Group className="mb-3" >
                            <Form.Label>Qualification Degree *</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={education.highestQualification}
                                name="highestQualification"
                                required={true}
                                onChange={e => handleChange(index, e)}>
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
                                placeholder="Enter the specialization"
                                name="specialization"
                                value={education.specialization}
                                onChange={e => handleChange(index, e)}

                                required={true} />
                        </Form.Group>
                        {!checkUniv ?
                            <Form.Group className="mb-3" >
                                <Form.Label>University/College Name * </Form.Label>
                                <Form.Select value={education.universityName}
                                    name="universityName" onChange={e => handleChange(index, e)}>
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
                                id={index}
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
                                    value={education.universityName}
                                    onChange={e => handleChange(index, e)}

                                    required={true} />
                            </Form.Group>
                            : ""}
                        <Form.Group className="mb-3" >
                            <Form.Label>Start Year *</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the Start Year"
                                name="startYear"
                                value={education.startYear}
                                onChange={e => handleChange(index, e)}

                                required={true} />
                        </Form.Group>
                        <Row>
                            <Col lg={3} style={{
                                position: "relative",
                                top: "30px"
                            }}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Continue to education </Form.Label>
                                    <input
                                        aria-label={education.continueBool}
                                        id={index}
                                        defaultChecked={education.continueBool}
                                        name={"continueBool"}
                                        type="checkbox"
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={8}>

                                {!education.continueBool ?
                                    <Form.Group className="mb-3" >
                                        <Form.Label>End Year </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter the end year"
                                            name="endYear"
                                            value={education.endYear}
                                            onChange={e => handleChange(index, e)}

                                        />
                                    </Form.Group>
                                    : ""}
                            </Col>
                        </Row>



                        <header className="head-form">
                            <p> Please fill all the necessary fields with *.</p>
                        </header>
                        {
                            index ?
                                <Button className="button remove" onClick={() => removeEducationFields(index)}>Remove</Button>
                                : null
                        }
                    </div>
                ))
                }
                <Button className="button add success"
                    variant="success"
                    style={{
                        position: "relative",
                        left: "480px",
                        bottom: "120px",
                        width: "200px"
                    }}
                    onClick={() => addEducationFields()}>Add more Educations</Button>

                <Button
                    color="secondary"
                    variant="outline-danger"
                    onClick={back}
                    id="form_button"
                    style={{
                        position: "relative",
                        left: "170px",
                        width: "200px",
                        margin: "0 0 100px 0",
                        top: "50px"

                    }}

                >Back</Button>
                <input type="submit"
                    color="primary"
                    variant="outline-success"
                    id="form_button"
                    style={{
                        position: "relative",
                        left: "190px",
                        width: "200px",
                        margin: "0 0 100px 0",


                    }}
                    value="Continue" />

            </Form>





        </>


    )

}

export default Add;