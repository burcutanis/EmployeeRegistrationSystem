import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [currentStatus, setCurrentStatus] = React.useState("");
    const [skills, setSkills] = React.useState("");
    const [experienceId, setExperienceId] = React.useState([]);
    const [experienceItemList, setExperienceItem] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const userId = searchParams.get("userId");
    const [personId, setpersonId] = React.useState("");


    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);
            // console.log(result.data);
            // console.log(email);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setStatus(result.data[0].status)
            setpersonId(result.data[0].userId)
            //console.log(result.data);
        }
        FetchData();

    }, [])

    useEffect(() => {
        const FetchExperience = async () => {
            const result = await axios.get(`http://localhost:4000/userExperience/user/${personId}`);
            setCurrentStatus(result.data[0].currentStatus)
            setSkills(result.data[0].skills)
            setExperienceId(result.data[0].experienceId)

            //console.log(result.data);

        }
        FetchExperience();
    })

    useEffect(() => {
        const FetchExperienceItems = async () => {
            const result = await axios.get(`http://localhost:4000/userExperienceItem/user/${personId}`);
            setExperienceItem(result.data);
            setLoading(false);

            //console.log(result.data);
            //console.log(experienceItemList);
        }
        FetchExperienceItems();
    })
    const navigate = useNavigate();







    let removeExperienceFields = async (i, id) => {

        try {
            var res5 = await axios.delete(`http://localhost:4000/userExperienceItem/${personId}/${id}`)
            let newExperienceValues = [...experienceItemList];
            newExperienceValues.splice(i, 1);
            setExperienceItem(newExperienceValues)
        }
        catch (err) {
            console.log("error")
        }
    }









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

    const education = (id) => {
        navigate({
            pathname: '/userAppEducation',
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
            pathname: '/editUserExperience',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const UpdateUser2 = (id, endYear) => {
        let checked = true;
        if (endYear) {
            checked = false
        }
        navigate({
            pathname: '/editUserExperienceItem',
            search: createSearchParams({
                id: id,
                status: status,
                checked: checked
            }).toString()
        })
    };






    const addMore = () => {
        navigate({
            pathname: '/addMoreExperienceApp',
            search: createSearchParams({
                userId: personId,

            }).toString()
        })
    };



    if (loading) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Loading ...</h1>

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
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this)} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Experiences</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this)}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable'>

                            <tbody>
                                <tr>
                                    <td>
                                        {status === "new" ?
                                            <Button variant="outline-dark" className="editForm"
                                                onClick={UpdateUser.bind(this, personId)}
                                                disabled={(status === "new") ? false : true} >
                                                Edit the form
                                            </Button>
                                            : ""
                                        }

                                        <h1 className="text-center mb-4">Experiences</h1>


                                    </td>
                                </tr>
                                <tr>
                                    <td >

                                        <>
                                            <div className="label">Current Status</div> :{" "}
                                            <div className="phone">{currentStatus}</div>
                                        </>
                                        <br />
                                        <br />
                                        <>
                                            <div className="label">Skills</div>
                                            {skills}
                                        </>



                                    </td>

                                </tr>
                            </tbody>
                        </table>




                        <>

                            <Table striped bordered hover style={{ margin: "150px 0px 0" }}

                            >




                                <thead>

                                    <tr>
                                        <th>Company Name</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Industry</th>
                                        <th>Area</th>
                                        <th>Position In Company</th>
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
                                            <td>
                                                {status === "new" ?
                                                    <Button className="" variant="outline-dark"
                                                        onClick={UpdateUser2.bind(this, ex.experienceId, ex.endYear)}
                                                        disabled={(status === "new") ? false : true}
                                                    >Edit
                                                    </Button>
                                                    : "You cannot edit anymore"}

                                            </td>
                                            <td>
                                                {status === "new" ?
                                                    <Button className="" variant="outline-danger"
                                                        onClick={removeExperienceFields.bind(this, i, ex.experienceId)}
                                                        disabled={(status === "new") ? false : true}
                                                    >Delete
                                                    </Button>
                                                    : "You cannot delete anymore"}
                                            </td>




                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </Table>
                        </>
                        {status === "new" ?
                            <Button className="" variant="outline-success"
                                onClick={addMore.bind(this)}
                                disabled={(status === "new") ? false : true}
                            >Add More Job Experiences
                            </Button>
                            : ""
                        }





                    </Container>
                </Col>





            </Row>

        </>






    )
}
export default UserDetail;
