import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';



function EditEducation() {
    const [searchParams] = useSearchParams();
    const [id, setId] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [education, setEducation] = React.useState({});
    const [loading, setLoading] = React.useState(true);

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





    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/userEducation/education/${searchParams.get("educationId")}`)
                .then(result => {
                    setId(result.data[0].id)
                    setUserId(result.data[0].userId)
                    setEducation(result.data[0])
                    setLoading(false);
                    console.log(result.data);
                });

        }
        FetchData();

    }, []
    )
    const navigate = useNavigate();






    function updateUser() {
        if (checked) {
            axios.put(`http://localhost:4000/userEducation/${id}`, {
                "highestQualification": education.highestQualification,
                "specialization": education.specialization,
                "universityName": education.universityName,
                "startYear": education.startYear,
                "continueBool": checked,
                "endYear": null

            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setEducation(education)


                });
        }
        else {
            axios.put(`http://localhost:4000/userEducation/${id}`, {
                "highestQualification": education.highestQualification,
                "specialization": education.specialization,
                "continueBool": checked,
                "universityName": education.universityName,
                "startYear": education.startYear, "endYear": education.endYear,
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");
                    setEducation(education)

                });
        }

    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/userAppEducation',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const handleChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };




    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit Education  •</h1>
                <h1>{searchParams.get("id")}</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Qualification</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Qualification"
                            name="highestQualification"
                            value={education.highestQualification}
                            onChange={handleChange}
                            id="name_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Qualification Degree *</Form.Label>
                        <Form.Select aria-label="Default select example"
                            value={education.highestQualification}
                            name="highestQualification"
                            required={true}
                            onChange={handleChange}>
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
                            placeholder="Enter your Specialization"
                            name="specialization"
                            value={education.specialization}
                            onChange={handleChange}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    {!checkUniv ?
                        <Form.Group className="mb-3" >
                            <Form.Label>University/College Name * </Form.Label>
                            <Form.Select value={education.universityName}
                                name="universityName" onChange={handleChange}>
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
                                value={education.universityName}
                                onChange={handleChange}
                                id="name_input"
                                required={true} />
                        </Form.Group>
                        : ""}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Start Year"
                            name="startYear"
                            value={education.startYear}
                            onChange={handleChange}
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
                                        value={education.endYear}
                                        onChange={handleChange}
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