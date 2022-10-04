import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../../Navbar';

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [educationList, setEducation] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let education = [];

    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setLoading(false)
            //console.log(result.data);

        }
        FetchData();
    }, [setName, setSurname, setEmail]
    )

    useEffect(() => {
        const FetchEducation = async () => {
            const result = await axios.get(`http://localhost:4000/userEducation`);
            setEducation(result.data);
            //console.log(result.data);
            //console.log(educationList);
        }
        FetchEducation();
    }, []
    )

    const navigate = useNavigate();

    function infoFnc() {
        educationList.map(ed => {
            if (ed.userId === searchParams.get("id")) {
                education.push(ed);
            }
        })
    }
    infoFnc();
    console.log(education);

    const personalInformation = (id) => {
        navigate({
            pathname: '/applicationDetailsPersonalInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const userDetail = (id) => {
        navigate({
            pathname: '/applicationDetailsGeneralInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };
    const experience = (id) => {
        navigate({
            pathname: '/applicationDetailsExperience',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };
    const additional = (id) => {
        navigate({
            pathname: '/applicationDetailsAdditional',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };


    if (loading) {
        return (
            <>
                <Navbarfnc />
                <h1 className="text-center mb-4">Loading...</h1>
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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))} >User Detail</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this, searchParams.get("id"))} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Education</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, searchParams.get("id"))} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additional.bind(this, searchParams.get("id"))}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable' style={{
                            margin: "20px 0"
                        }}>

                            <tbody>
                                <td >
                                    <h1 className="text-center mb-4">Education</h1>

                                </td>

                            </tbody>
                        </table>
                        {education.map((education, i) => (
                            <Container>
                                <table className='userDetailTable'>
                                    <tbody>

                                        <tr>
                                            <td colSpan={3}>
                                                <Row>
                                                    <Col xs={8} md={8} lg={8}>


                                                        {education.universityName}
                                                    </Col>
                                                </Row>
                                            </td>


                                        </tr>
                                        <tr>
                                            <td className="details-td">

                                                <>
                                                    <div className="label">University/College Name</div> :{" "}
                                                    <div className="divField">{education.universityName}</div>
                                                </>
                                                <br />
                                                <>
                                                    <div className="label">Start Year</div> :{" "}
                                                    <div className="divField">{education.startYear}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">End Year</div> :{" "}
                                                    <div className="divField">{education.continueBool ? "continue" : education.endYear}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">Qualification</div> :{" "}
                                                    <div className="divField">{education.highestQualification}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">Specialization</div> :{" "}
                                                    <div className="divField">{education.specialization}</div>
                                                </>
                                                <br />





                                            </td>

                                        </tr>

                                    </tbody>
                                </table>

                            </Container>
                        ))}
                    </Container>
                </Col>





            </Row>

        </>





    )
}
export default UserDetail;