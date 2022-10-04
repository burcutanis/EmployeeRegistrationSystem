import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [dateOfBirth, setBirth] = React.useState("");
    const [maritalStatus, setMaritalStatus] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [personId, setUserId] = React.useState("");
    const [id, setId] = React.useState("");
    const [status, setStatus] = React.useState("");;
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const currentEmail = localStorage.getItem("currentEmail");
    const userId = searchParams.get("userId");






    useEffect(() => {
        const FetchData = async () => {
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);
            //console.log(result.data);
            //console.log(email);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setStatus(result.data[0].status)
            setUserId(result.data[0].userId)
            setLoading(false);

            //console.log(result.data);
        }
        FetchData();
    },
    )


    useEffect(() => {
        const FetchPersonal = async () => {
            const result = await axios.get(`http://localhost:4000/userPersonalInformation/user/${searchParams.get("userId")}`);
            setBirth(result.data[0].dateOfBirth);
            setMaritalStatus(result.data[0].maritalStatus);
            setAddress(result.data[0].address);
            setCity(result.data[0].city);
            setMobile(result.data[0].mobile);
            setGender(result.data[0].gender);
            setId(result.data[0].userId)
            //console.log(result.data);
            setLoading2(false);
        }
        FetchPersonal();

    },
    )



    const navigate = useNavigate();



    const education = (id) => {
        navigate({
            pathname: '/userAppEducation',
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
            pathname: '/editUserPersonalInfo',
            search: createSearchParams({
                id: id,
                status: status
            }).toString()
        })
    };

    if (loading && loading2) {
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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))}>User Detail</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Personal Information</Nav.Link>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this)} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this)}>Experiences</Button>
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


                                    <td colSpan={3}>

                                        <h1 className="text-center mb-4">Personal Information</h1>
                                        {status === "new" ?
                                            <Button
                                                style={{
                                                    position: "relative",
                                                    top: "0"
                                                }} variant="outline-dark" className="editForm" disabled={(status === "new") ? false : true} onClick={UpdateUser.bind(this, id)}>
                                                Edit the form
                                            </Button>
                                            : ""}


                                    </td>


                                </tr>
                                <tr>
                                    <td className="details-td">

                                        <>
                                            <div className="label">Gender</div> :{" "}
                                            <div className="phone">{gender}</div>
                                        </>
                                        <br />
                                        <>
                                            <div className="label">Marital Status</div> :{" "}
                                            <div className="mobile">{maritalStatus}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Address</div> :{" "}
                                            <div className="mobile">{address}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">City</div> :{" "}
                                            <div className="mobile">{city}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Date Of Birth</div> :{" "}
                                            <div className="mobile">{dateOfBirth}</div>
                                        </>
                                        <br />
                                        < >
                                            <div className="label">Mobile</div> :{" "}
                                            <div className="mobile">{mobile}</div>
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