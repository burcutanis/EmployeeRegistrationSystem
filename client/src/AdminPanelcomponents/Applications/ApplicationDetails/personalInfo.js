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
    const [empid, setId] = React.useState("");
    const [id, setgroupId] = React.useState("");
    const [titleId, settitleId] = React.useState("");
    const [personalInfo, setPersonalInfo] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setId(result.data[0].id)
            setgroupId(result.data[0].group)
            settitleId(result.data[0].title)
            //console.log(result.data);

        }
        FetchData();
    }, []
    )

    useEffect(() => {
        const FetchPersonalInformation = async () => {
            const result = await axios.get(`http://localhost:4000/userPersonalInformation/user/${searchParams.get("id")}`);
            setPersonalInfo(result.data[0]);
            setLoading(false)
            console.log(result.data);
        }
        FetchPersonalInformation();
    }, []
    )

    const navigate = useNavigate();

    const education = (id) => {
        navigate({
            pathname: '/applicationDetailsEducation',
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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))}>User Detail</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Personal Information</Nav.Link>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, searchParams.get("id"))} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, searchParams.get("id"))}>Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additional.bind(this, searchParams.get("id"))}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable'>

                            <tbody>
                                <tr>


                                    <td colSpan={3}>

                                        <h1 className="text-center mb-4">Personal Information</h1>


                                    </td>


                                </tr>
                                <tr>
                                    <td className="details-td">
                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="divField"> {name} {surname}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Gender</div> :{" "}
                                            <div className="divField">{personalInfo.gender}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Marital Status</div> :{" "}
                                            <div className="divField">{personalInfo.maritalStatus}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Address</div> :{" "}
                                            <div className="divField">{personalInfo.address}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">City</div> :{" "}
                                            <div className="divField">{personalInfo.city}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Date Of Birth</div> :{" "}
                                            <div className="divField">{personalInfo.dateOfBirth}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Mobile</div> :{" "}
                                            <div className="divField">{personalInfo.mobile}</div>
                                        </>



                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Col>





            </Row>
        </>





    )
}
export default UserDetail;