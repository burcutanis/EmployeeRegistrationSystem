

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';

function Education() {
    const [searchParams] = useSearchParams();

    const [userId, setUserId] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [educationList, setEducationList] = React.useState([]);


    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);
            //console.log(result.data);
            //console.log(email);
            setUserId(result.data[0].userId)
            setStatus(result.data[0].status)


            console.log(result.data);
        }

        FetchData();
    }, [])

    useEffect(() => {
        const FetchEducation = async () => {
            const result = await axios.get(`http://localhost:4000/userEducation/user/${userId}`);

            //console.log(result.data);
            setEducationList(result.data);
            setLoading(false);
        }

        FetchEducation();
    }
    )








    const navigate = useNavigate();

    const personalInformation = (id) => {
        navigate({
            pathname: '/userAppPersonalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const userDetail = (id) => {
        navigate({
            pathname: '/userAppInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const experience = (id) => {
        navigate({
            pathname: '/userAppExperience',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const additionalInfo = (id) => {
        navigate({
            pathname: '/userAppAdditionalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const UpdateUser = (id) => {
        navigate({
            pathname: '/editUserEducation',
            search: createSearchParams({
                educationId: id,
                status: status,
            }).toString()
        })
    };

    let removeEducationItem = async (i, educationId) => {

        try {
            var res5 = await axios.delete(`http://localhost:4000/userEducation/${userId}/${educationId}`)
            let newEducationValues = [...educationList];
            newEducationValues.splice(i, 1);
            setEducationList(newEducationValues)
        }
        catch (err) {
            console.log("error")
        }
    }

    const addMore = () => {
        navigate({
            pathname: '/addMoreEducationApp',
            search: createSearchParams({
                userId: userId,
            }).toString()
        })
    };

    if (loading) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Loading...</h1>

                </div>
            </>
        )
    }











    return (
        <>
            <Navbarfnc />
            <Row>
                <Col xs={2} md={2} lg={2}>
                    <Nav variant="tabs" className="col-md-12 d-none d-md-block bg-light sidebar"
                        activeKey="/home"
                    >
                        <div className="sidebar-sticky"></div>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this)} >User Detail</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this)} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Education</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this)} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this)}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <h1 colSpan={3}
                        style={{
                            position: "relative",
                            top: "50px",
                            right: "30px"
                        }}
                    >Educations</h1>
                    {educationList.map((education, i) => (
                        <Container>
                            <table className='userDetailTable'>
                                <tbody>



                                    <tr>
                                        <td colSpan={3}>
                                            <Row>
                                                <Col xs={8} md={8} lg={8}>


                                                    {education.universityName}
                                                </Col>
                                                <Col xs={4} md={4} lg={4}>
                                                    {status === "new" ?
                                                        <>

                                                            {i ? <Button variant="outline-dark"
                                                                style={{
                                                                    position: "relative",
                                                                    left: "30px"
                                                                }}
                                                                disabled={(status === "new") ? false : true}
                                                                onClick={UpdateUser.bind(this, education.educationId)}
                                                            >Edit
                                                            </Button>
                                                                :
                                                                <Button
                                                                    style={{
                                                                        position: "relative",
                                                                        left: "120px"
                                                                    }}
                                                                    disabled={(status === "new") ? false : true}
                                                                    variant="outline-dark"
                                                                    onClick={UpdateUser.bind(this, education.educationId)}
                                                                >Edit
                                                                </Button>
                                                            }



                                                            {
                                                                i ?
                                                                    <Button className="" variant="outline-danger"
                                                                        onClick={removeEducationItem.bind(this, i, education.educationId)}
                                                                        disabled={(status === "new") ? false : true}
                                                                        style={{
                                                                            position: "relative",
                                                                            left: "50px"

                                                                        }}
                                                                    >Delete
                                                                    </Button>
                                                                    : null
                                                            }
                                                        </>
                                                        : ""
                                                    }





                                                </Col>
                                            </Row>
                                        </td>


                                    </tr>
                                    <tr>
                                        <td className="details-td">

                                            <>
                                                <div className="label">University/College Name</div> :{" "}
                                                <div className="phone">{education.universityName}</div>
                                            </>
                                            <br />
                                            <>
                                                <div className="label">Start Year</div> :{" "}
                                                <div className="mobile">{education.startYear}</div>
                                            </>
                                            <br />
                                            < >
                                                <div className="label">End Year</div> :{" "}
                                                <div className="mobile">{!education.endYear ? "continue" : education.endYear}</div>
                                            </>
                                            <br />
                                            < >
                                                <div className="label">Qualification</div> :{" "}
                                                <div className="mobile">{education.highestQualification}</div>
                                            </>
                                            <br />
                                            < >
                                                <div className="label">Specialization</div> :{" "}
                                                <div className="mobile">{education.specialization}</div>
                                            </>
                                            <br />





                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </Container>
                    ))}
                    {status === "new" ?
                        <Button className="" variant="outline-success"
                            style={{ position: "relative", top: "120px", left: "200px" }}
                            onClick={addMore.bind(this)}
                            disabled={(status === "new") ? false : true}
                        >Add More Education Informations
                        </Button>
                        : ""
                    }
                </Col>






            </Row>
        </>





    )
}
export default Education;
