import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import Navbarfnc from '../NavbarUser';



function Add(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const experienceId = uuid();
    const userId = searchParams.get("userId");

    const [experienceItems, setExperienceItems] = React.useState({ companyName: "", endYear: "", statusInCompany: "", industry: "", startYear: "", area: "" },
    );
    const { companyName, endYear, statusInCompany, startYear, industry, area, } = experienceItems;
    const [checked, setChecked] = React.useState(false);

    const onChange3 = (e) => {
        setExperienceItems({ ...experienceItems, [e.target.name]: e.target.value });

    }



    const onSubmit = async (e) => {
        e.preventDefault();
        let newExperienceItem = {};
        if (checked) {
            newExperienceItem = {
                experienceId, companyName, statusInCompany,
                startYear, industry, area,
                userId
            }
        }
        else {
            newExperienceItem = {
                experienceId, companyName, endYear, statusInCompany,
                startYear, industry, area,
                userId
            }
        }


        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.post('http://localhost:4000/userExperienceItem', newExperienceItem, config);
            setExperienceItems({ companyName: "", endYear: "", statusInCompany: "", industry: "", startYear: "", area: "" })

            navigate({
                pathname: '/userAppExperience',
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
                <h1>• Add Experience •</h1>
                <div className="underline"></div>

                <Form onSubmit={onSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Company Name "
                            name="companyName"
                            value={companyName}
                            onChange={onChange3}
                            id="name_input"
                            required="true" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Duties in Company </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your duties in company"
                            name="statusInCompany"
                            value={statusInCompany}
                            onChange={onChange3}
                            id="surname_input"
                            required="true" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Industry</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your industry"
                            name="industry"
                            value={industry}
                            onChange={onChange3}
                            id="surname_input"
                            required="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Area you worked in the company </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your area"
                            name="area"
                            value={area}
                            onChange={onChange3}
                            id="surname_input"
                            required="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Date </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your startYear"
                            name="startYear"
                            value={startYear}
                            onChange={onChange3}
                            id="surname_input"
                            required="" />
                    </Form.Group>
                    <Row>
                        <Col lg={3} style={{
                            position: "relative",
                            top: "30px"
                        }}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Continue to work </Form.Label>
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
                                    <Form.Label>End Date </Form.Label>
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




                    <input type="submit" variant="outline-danger" className="form-control" value="Add Experience" />

                </Form>

            </div>



        </>



    )

}
export default Add;