import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Navbarfnc from '../../Navbar';

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [experience, setExperience] = React.useState([]);
    const [experienceItem, setExperienceItem] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            //console.log(result.data);

        }
        FetchData();
    }, []
    )


    useEffect(() => {
        const FetchExperience = async () => {
            const result = await axios.get(`http://localhost:4000/userExperience/user/${searchParams.get("id")}`);
            setExperience(result.data[0]);
            //console.log(result.data);
            //console.log(experienceList);
        }
        FetchExperience();
    }, []
    )
    useEffect(() => {
        const FetchExperienceItem = async () => {
            const result = await axios.get(`http://localhost:4000/userExperienceItem/user/${searchParams.get("id")}`);
            setExperienceItem(result.data);
            setLoading(false)
            //console.log(result.data);
            //console.log(experienceItemList);
        }
        FetchExperienceItem();
    }, []
    )


    const navigate = useNavigate();


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

    const education = (id) => {
        navigate({
            pathname: '/applicationDetailsEducation',
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

    let exArray = [];
    let skills = []
    const showSkills = () => {
        if (experience.skills) {
            skills = experience.skills;
            exArray = skills.split("\n");
        }
    };
    showSkills();





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
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, searchParams.get("id"))} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Experiences</Nav.Link>
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
                                <td colSpan={3}>

                                    <h1 className="text-center mb-4">Experiences</h1>


                                </td>
                                <tr>
                                    <td >

                                        <>
                                            <div className="label">Current Status</div> :{" "}
                                            <div className="divField">{experience.currentStatus}</div>
                                        </>
                                        <br />
                                        <br />
                                        <>
                                            <div className="label">Skills</div>
                                            {experience.skills}
                                        </>



                                    </td>

                                </tr>

                            </tbody>
                        </table>




                        <Table striped bordered hover style={{ margin: "150px 0 0" }}
                        >


                            <thead>

                                <tr>
                                    <th>Company Name</th>
                                    <th>Start Year</th>
                                    <th>End year</th>
                                    <th>Industry</th>
                                    <th>Area</th>
                                    <th>Status In Company</th>


                                </tr>
                            </thead>
                            <tbody>
                                {experienceItem.map((ex, i) => (
                                    <tr>
                                        <td>{ex.companyName}</td>
                                        <td>{ex.startYear}</td>
                                        <td>{ex.endYear ? ex.endYear : "continue"}</td>
                                        <td>{ex.industry}</td>
                                        <td>{ex.area}</td>
                                        <td>{ex.statusInCompany}</td>




                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Col>





            </Row>

        </>


    )
}
export default UserDetail;


/*<tr>
                                    <td className="details-td">
                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="phone"> {name} {surname}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Current Status</div> :{" "}
                                            <div className="phone">{experience.currentStatus}</div>
                                        </>
                                        <br />
                                        <br />
                                        <>
                                            <div className="label">Skills</div>
                                            {exArray.map((ex, i) => (
                                                <>
                                                    <td className="lineHeightAdditional">{ex}</td>
                                                    <br />
                                                </>
                                            ))
                                            }

                                        </>
                                        <br />



                                    </td>

                                </tr>*/