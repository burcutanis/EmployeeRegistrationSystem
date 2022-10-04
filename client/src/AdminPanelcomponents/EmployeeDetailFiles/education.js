import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../Navbar';

function EmployeeDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [id, setgroupId] = React.useState("");
    const [titleId, settitleId] = React.useState("");
    const [educationList2, setEducationList2] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);



    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employee/user/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setgroupId(result.data[0].group)
            settitleId(result.data[0].title)
            setLoading(false);
            //console.log(result.data);

        }
        FetchData();

    }, []
    )

    useEffect(() => {
        const FetchEducation = async () => {
            const result = await axios.get(`http://localhost:4000/education/user/${searchParams.get("id")}`);
            setEducationList2(result.data);
            //console.log(result.data);
            //console.log(educationList2);
            setLoading2(false);
        }
        FetchEducation();
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
    const experience = (id) => {
        navigate({
            pathname: '/experience',
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

    const UpdateUser = (id) => {
        navigate({
            pathname: '/editEducation',
            search: createSearchParams({
                educationId: id,
            }).toString()
        })
    };

    let removeEducationItem = async (i, userId, educationId) => {

        try {
            var res5 = await axios.delete(`http://localhost:4000/education/${userId}/${educationId}`)
            let newEducationValues = [...educationList2];
            newEducationValues.splice(i, 1);
            setEducationList2(newEducationValues)
        }
        catch (err) {
            console.log("error")
        }
    }

    const addMore = () => {
        navigate({
            pathname: '/adminAddMoreEducation',
            search: createSearchParams({
                userId: searchParams.get("id"),
            }).toString()
        })
    };




    if (loading && loading2) {
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
                            <Nav.Link href="/home" disabled >Education</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, searchParams.get("id"))} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this, searchParams.get("id"))} >Additional Info</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>


                        <h1 colSpan={3}
                            style={{
                                position: "relative",
                                top: "50px",
                                right: "30px"
                            }}
                        >Educations</h1>
                        {educationList2.map((education, i) => (
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
                                                        {i ? <Button variant="outline-dark"
                                                            style={{
                                                                position: "relative",
                                                                left: "30px"
                                                            }}
                                                            onClick={UpdateUser.bind(this, education.educationId)}
                                                        >Edit
                                                        </Button>
                                                            :
                                                            <Button
                                                                style={{
                                                                    position: "relative",
                                                                    left: "120px"
                                                                }}
                                                                variant="outline-dark"
                                                                onClick={UpdateUser.bind(this, education.educationId)}
                                                            >Edit
                                                            </Button>
                                                        }


                                                        {
                                                            i ?
                                                                <Button className="" variant="outline-danger"
                                                                    onClick={removeEducationItem.bind(this, i, education.userId, education.educationId)}
                                                                    style={{
                                                                        position: "relative",
                                                                        left: "50px"

                                                                    }}
                                                                >Delete
                                                                </Button>
                                                                : null
                                                        }




                                                    </Col>
                                                </Row>
                                            </td>


                                        </tr>
                                        <tr>
                                            <td className="details-td">

                                                <>
                                                    <div className="label">University/College Name</div> :{" "}
                                                    <div className="divFields">{education.universityName}</div>
                                                </>
                                                <br />
                                                <>
                                                    <div className="label">Start Year</div> :{" "}
                                                    <div className="divFields">{education.startYear}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">End Year</div> :{" "}
                                                    <div className="divFields">{!education.endYear ? "continue" : education.endYear}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">Qualification</div> :{" "}
                                                    <div className="divFields">{education.highestQualification}</div>
                                                </>
                                                <br />
                                                < >
                                                    <div className="label">Specialization</div> :{" "}
                                                    <div className="divFields">{education.specialization}</div>
                                                </>
                                                <br />





                                            </td>

                                        </tr>

                                    </tbody>
                                </table>

                            </Container>
                        ))}
                        <Button className="" variant="outline-success"
                            style={{ position: "relative", top: "120px", left: "200px" }}
                            onClick={addMore.bind(this)}
                        >Add More Education Informations
                        </Button>
                    </Container>
                </Col>





            </Row>

        </>





    )
}
export default EmployeeDetail;