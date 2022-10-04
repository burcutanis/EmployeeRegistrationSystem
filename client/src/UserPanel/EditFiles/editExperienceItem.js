import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';

function EditExperienceItem() {
    const [searchParams] = useSearchParams();
    const [userId, setUserId] = React.useState("");
    const [id, setId] = React.useState("");
    const [experienceItems, setExperienceItems] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [checked, setChecked] = React.useState(false);






    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/userExperienceItem/experience/${searchParams.get("id")}`)
                .then(result => {
                    setUserId(result.data[0].userId)
                    setId(result.data[0].id)
                    setExperienceItems(result.data[0])
                    setLoading(false);
                    //  console.log(result.data);
                });


        }
        FetchData();


    }, []
    )


    const navigate = useNavigate();



    function updateUser() {

        try {
            if (checked) {
                axios.put(`http://localhost:4000/userExperienceItem/${id}`, {
                    "companyName": experienceItems.companyName,
                    "statusInCompany": experienceItems.statusInCompany,
                    "industry": experienceItems.industry,
                    "startYear": experienceItems.startYear,
                    "area": experienceItems.area,
                    "endYear": null,
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        console.log("update");
                        setExperienceItems(experienceItems)
                    });
            }
            else {
                axios.put(`http://localhost:4000/userExperienceItem/${id}`, {
                    "companyName": experienceItems.companyName,
                    "statusInCompany": experienceItems.statusInCompany,
                    "industry": experienceItems.industry,
                    "startYear": experienceItems.startYear,
                    "endYear": experienceItems.endYear,
                    "area": experienceItems.area,
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        console.log("update");
                        setExperienceItems(experienceItems)
                    });

            }
        }
        catch (err) {
            console.error(err.response.data);
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/userAppExperience',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    };

    const handleChange = (e) => {
        setExperienceItems({ ...experienceItems, [e.target.name]: e.target.value });
    };



    if (loading) {
        return (
            <>
                <Navbarfnc />
                <h1>Loading...</h1>
            </>
        )
    }




    return (
        <>
            <Navbarfnc />

            <div id="container">
                <header className="head-form">
                    <h1>•  Add Job Experiences •</h1>
                    <p> If you don't have any job experience, just skip this page</p>
                    <div className="underline"></div>
                </header>
                <Form onSubmit={onSubmit}  >
                    <div className="form-inline">
                        <Form.Group className="mb-3" >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Company Name "
                                name="companyName"
                                value={experienceItems.companyName}
                                onChange={handleChange}
                                id="name_input"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Duties in Company </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your duties in Company"
                                name="statusInCompany"
                                value={experienceItems.statusInCompany}
                                onChange={handleChange}
                                id="surname_input"
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your industry"
                                name="industry"
                                value={experienceItems.industry}
                                onChange={handleChange}
                                id="surname_input"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Area you worked in the company </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your area"
                                name="area"
                                value={experienceItems.area}
                                onChange={handleChange}
                                id="surname_input"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Start Date </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your startYear"
                                name="startYear"
                                value={experienceItems.startYear}
                                onChange={handleChange}
                                id="surname_input"
                                required={true}
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
                                            value={experienceItems.endYear}
                                            onChange={handleChange}
                                            id="surname_input"
                                        />
                                    </Form.Group>
                                    : ""}
                            </Col>
                        </Row>

                    </div>
                </Form>
                <Button
                    color="primary"
                    variant="outline-success"
                    id="form_button"
                    onClick={onSubmit}
                    style={{
                        position: "relative",
                        left: "250px",
                        width: "200px",
                        margin: "0 0 100px 0",
                        top: "40px"
                    }}
                >SUBMIT</Button>


            </div>




        </>

    );
}
export default EditExperienceItem;


/*    <div id="container">
                <h1>• Edit Personal Information  •</h1>
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
                            required="true" />
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
                            required="true" />
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
                        <Form.Label>End Year </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your endYear"
                            name="endYear"
                            value={endYear}
                            onChange={onEndYearChanged}
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>yearsOfExperience</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your yearsOfExperience"
                            name="yearsOfExperience"
                            value={yearsOfExperience}
                            onChange={onYearsOfExperienceChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>


                    <input type="submit" variant="outline-danger" value="Edit" />

                </Form>


            </div> */