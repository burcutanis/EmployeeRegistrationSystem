import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Navbarfnc from '../Navbar';

function EmployeeDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [experienceList, setExperienceList] = React.useState([{}]);
    const [experienceItemList, setExperienceItem] = React.useState([{}]);
    let experienceItem = [];
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [loading3, setLoading3] = React.useState(true);

    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employee/user/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setLoading(false);
            //console.log(result.data);

        }
        FetchData();



    }, []
    )

    useEffect(() => {
        const FetchExperience = async () => {
            const result = await axios.get(`http://localhost:4000/experience/user/${searchParams.get("id")}`);
            setExperienceList(result.data[0]);
            //console.log(result.data);
            //console.log(experienceList);
            setLoading2(false);
        }
        FetchExperience();

    },
    )
    useEffect(() => {
        const FetchExperienceItem = async () => {
            const result = await axios.get(`http://localhost:4000/experienceItem/user/${searchParams.get("id")}`);
            setExperienceItem(result.data);
            //console.log(result.data);
            //console.log(experienceItemList);
            setLoading3(false);
        }
        FetchExperienceItem();
    },
    )




    const navigate = useNavigate();




    const personalInformation = (id) => {
        navigate({
            pathname: '/personalInformation',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const userDetail = (id) => {
        navigate({
            pathname: '/userDetail',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const education = (id) => {
        navigate({
            pathname: '/education',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const additionalInfo = (id) => {
        navigate({
            pathname: '/adminAdditionalInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const UpdateUser = () => {
        navigate({
            pathname: '/editExperience',
            search: createSearchParams({
                id: searchParams.get("id"),
            }).toString()
        })
    };

    const UpdateUser2 = (experienceId, endYear) => {
        let checked = true;
        if (endYear) {
            checked = false
        }
        navigate({
            pathname: '/editExperienceItem',
            search: createSearchParams({
                experienceId: experienceId,
                checked: checked
            }).toString()
        })
    };

    const addMore = () => {
        navigate({
            pathname: '/adminAddMoreExperience',
            search: createSearchParams({
                userId: searchParams.get("id"),
            }).toString()
        })
    };



    let removeExperienceItem = async (i, userId, educationId) => {

        try {
            var res5 = await axios.delete(`http://localhost:4000/experienceItem/${userId}/${educationId}`)
            let newExperienceValues = [...experienceItemList];
            newExperienceValues.splice(i, 1);
            setExperienceItem(newExperienceValues)
        }
        catch (err) {
            console.log("error")
        }
    }

    let exArray = [];
    let skillsArray = []
    const showSkills = () => {
        if (experienceList.skills) {
            skillsArray = experienceList.skills;
            exArray = skillsArray.split("\n");
        }
    };
    showSkills();


    if (loading) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Loading...</h1>
                </div></>

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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))} >General Information</Button>
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
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this, searchParams.get("id"))} >Additional Info</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable'>

                            <tbody>
                                <td colSpan={3}>
                                    <Button variant="outline-secondary" className="editForm" onClick={UpdateUser.bind(this)}>
                                        Edit the form
                                    </Button>
                                    <h1 className="text-center mb-4">Experiences</h1>


                                </td>
                                <tr>
                                    <td >
                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="divFields"> {name} {surname}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Current Status</div> :{" "}
                                            <div className="divFields">{experienceList.currentStatus}</div>
                                        </>
                                        <br />
                                        <br />
                                        <>
                                            <div className="label">Skills</div>
                                            {experienceList.skills}
                                        </>



                                    </td>

                                </tr>

                            </tbody>
                        </table>



                        <h1 style={{
                            position: "relative",
                            top: "140px"
                        }}>Past Job Experiences</h1>
                        <Table striped bordered hover style={{ margin: "150px 0 " }}
                        >


                            <thead>

                                <tr>
                                    <th>Company Name</th>
                                    <th>Start Year</th>
                                    <th>End year</th>
                                    <th>Industry</th>
                                    <th>Area</th>
                                    <th>Status In Company</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>

                            </thead>
                            <tbody>
                                {experienceItemList.map((ex, i) => (
                                    <tr>
                                        <td>{ex.companyName}</td>
                                        <td>{ex.startYear}</td>
                                        <td>{ex.endYear ? ex.endYear : "continue"}</td>
                                        <td>{ex.industry}</td>
                                        <td>{ex.area}</td>
                                        <td>{ex.statusInCompany}</td>

                                        <td><Button className="" variant="outline" onClick={UpdateUser2.bind(this, ex.experienceId, ex.endYear)}>Edit</Button></td>
                                        <td><Button className="" variant="outline" onClick={removeExperienceItem.bind(this, i, ex.userId, ex.experienceId)}>Delete</Button></td>


                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                        <Button className="" variant="outline-success"
                            style={{ position: "relative", bottom: "120px", right: "20px" }}
                            onClick={addMore.bind(this)}
                        >Add More Job Experience
                        </Button>
                    </Container>
                </Col>






            </Row>

        </>






    )
}
export default EmployeeDetail;


/*<tr>
                                    <td className="details-td">
                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="phone"> {name} {surname}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Current Status</div> :{" "}
                                            <div className="phone">{experienceList.currentStatus}</div>
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