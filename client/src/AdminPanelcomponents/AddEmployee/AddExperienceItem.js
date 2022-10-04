import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import './Add.css'


function Add(props) {

    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    const { experienceItems, handleChange, addExperienceFields, removeExFields } = props;
    return (

        <>
            <Navbarfnc />

            <Form onSubmit={continuefnc} >
                {experienceItems.map((experienceItem, index) => (
                    <div id="container" className="educationDiv">

                        <header className="head-form">
                            <h1>•  Add Past Job Experiences •</h1>
                            <p> If the employee doesn't have any job experience, just skip this page</p>

                            <div className="underline"></div>
                        </header>

                        <Form.Group className="mb-3" >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the Company Name "
                                name="companyName"
                                value={experienceItem.companyName}
                                onChange={e => handleChange(index, e)}
                                id="name_input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Duties in Company </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the duties in company"
                                name="statusInCompany"
                                value={experienceItem.statusInCompany}
                                onChange={e => handleChange(index, e)}
                                id="status_input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the industry"
                                name="industry"
                                value={experienceItem.industry}
                                onChange={e => handleChange(index, e)}
                                id="industry_input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Area the employee worked in the company </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the area"
                                name="area"
                                value={experienceItem.area}
                                onChange={e => handleChange(index, e)}
                                id="area_input"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Start Date </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="year-month-day"
                                name="startYear"
                                value={experienceItem.startYear}
                                onChange={e => handleChange(index, e)}
                                id="startYear_input"
                            />
                        </Form.Group>
                        <Row>
                            <Col lg={3} style={{
                                position: "relative",
                                top: "30px"
                            }}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Continue to work </Form.Label>
                                    <input
                                        aria-label={experienceItem.continue}
                                        id={index}
                                        defaultChecked={experienceItem.continue}
                                        name={"continue"}
                                        type="checkbox"
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </Form.Group>

                            </Col>
                            <Col lg={8}>

                                {!experienceItem.continue ?
                                    <Form.Group className="mb-3" >
                                        <Form.Label>End Date </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="year-month-day"
                                            name="endYear"
                                            value={experienceItem.endYear}
                                            onChange={e => handleChange(index, e)}
                                            id="end_input"
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
                                <Button onClick={() => removeExFields(index)}>Remove</Button>
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
                        bottom: "80px",
                        width: "200px"
                    }}
                    onClick={() => addExperienceFields()}>Add more Experience</Button>


                <Button
                    color="secondary"
                    variant="outline-danger"
                    id="form_button"
                    onClick={back}
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


