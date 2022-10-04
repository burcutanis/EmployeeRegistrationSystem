import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import './edit.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbarfnc from '../Navbar';

function EditExperienceItem() {
    const [searchParams] = useSearchParams();
    const [companyName, setCompanyName] = React.useState();
    const [statusInCompany, setStatusInCompany] = React.useState("");
    const [endYear, setEndYear] = React.useState("");
    const [industry, setIndustry] = React.useState("");
    const [area, setArea] = React.useState("");

    const [startYear, setStartYear] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [id, setId] = React.useState("");
    const [experienceId, setExperienceId] = React.useState("");


    const [checked, setChecked] = React.useState(false);






    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/experienceItem/experience/${searchParams.get("experienceId")}`)
                .then(result => {
                    setCompanyName(result.data[0].companyName)
                    setStatusInCompany(result.data[0].statusInCompany)
                    setEndYear(result.data[0].endYear)
                    setIndustry(result.data[0].industry)
                    setArea(result.data[0].area)
                    setStartYear(result.data[0].startYear)
                    setUserId(result.data[0].userId)
                    setId(result.data[0].id)
                    setExperienceId(result.data[0].experienceId)
                    //console.log(result.data);
                });

        }
        FetchData();

    }, []
    )
    const navigate = useNavigate();

    const onCompanyChanged = e => setCompanyName(e.target.value)
    const onStatusInCompanyChanged = e => setStatusInCompany(e.target.value)
    const onEndYearChanged = e => setEndYear(e.target.value)
    const onIndustryChanged = e => setIndustry(e.target.value)
    const onStartYearChanged = e => setStartYear(e.target.value)
    const onAreaChanged = e => setArea(e.target.value)


    function updateUser() {
        if (checked) {
            axios.put(`http://localhost:4000/experienceItem/${id}`, {
                "companyName": companyName,
                "statusInCompany": statusInCompany,
                "endYear": null, "industry": industry,
                "startYear": startYear, "area": area,
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setCompanyName(companyName)
                    setStatusInCompany(statusInCompany)
                    setIndustry(industry)
                    setArea(area)
                    setStartYear(startYear)


                });

        }
        else {
            axios.put(`http://localhost:4000/experienceItem/${id}`, {
                "companyName": companyName,
                "statusInCompany": statusInCompany,
                "endYear": endYear, "industry": industry,
                "startYear": startYear, "area": area,
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setCompanyName(companyName)
                    setStatusInCompany(statusInCompany)
                    setIndustry(industry)
                    setArea(area)
                    setStartYear(startYear)
                    setEndYear(endYear)


                });
        }

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
                <h1>• Edit Job Experience  •</h1>
                <h1>{searchParams.get("id")}</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Company Name "
                            name="companyName"
                            value={companyName}
                            onChange={onCompanyChanged}
                            id="name_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Status in Company </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your statusInCompany"
                            name="statusInCompany"
                            value={statusInCompany}
                            onChange={onStatusInCompanyChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Industry</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your industry"
                            name="industry"
                            value={industry}
                            onChange={onIndustryChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Area you worked in the company </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your area"
                            name="area"
                            value={area}
                            onChange={onAreaChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Year </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your startYear"
                            name="startYear"
                            value={startYear}
                            onChange={onStartYearChanged}
                            id="surname_input"
                            required={true} />
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
                                    defaultChecked={checked}
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
export default EditExperienceItem;