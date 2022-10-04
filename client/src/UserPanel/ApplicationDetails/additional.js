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
    const [additionalInfo, setAdditionalInfo] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const userId = searchParams.get("userId");


    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);
            // console.log(result.data);
            //console.log(email);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setStatus(result.data[0].status)
            setLoading(false);


            console.log(result.data);
        }
        FetchData();
    }, []
    )


    useEffect(() => {


        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/additionalInfo/user/${userId}`);
            //console.log(result.data);
            setAdditionalInfo(result.data[0].additional);
        }
        FetchData();

    }, [additionalInfo]
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
    const personalInformation = (id) => {
        navigate({
            pathname: '/userAppPersonalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const UpdateUser = (additionalInfo) => {
        navigate({
            pathname: '/editUserAdditional',
            search: createSearchParams({
                additionalInfo: additionalInfo,
                userId: userId
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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))}>User Detail</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this)} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, searchParams.get("id"))} >Education</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this)} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Additional Informations</Nav.Link>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <table className='userDetailTable'>
                        <tbody>
                            <tr>
                                <td>
                                    {status === "new" ?
                                        <Button variant="outline-dark" className="editForm"
                                            onClick={UpdateUser.bind(this, additionalInfo)}
                                            disabled={(status === "new") ? false : true}
                                            style={{
                                                position: "relative",
                                                top: "80px"
                                            }} >
                                            Edit the form
                                        </Button>
                                        :
                                        ""}
                                    <h1 className="text-center mb-4">Additional Information</h1>
                                </td>
                            </tr>

                            <tr>
                                <td> {additionalInfo}</td>
                            </tr>

                        </tbody>
                    </table>

                </Col>





            </Row>

        </>





    )
}
export default UserDetail;


/*
                <Col>
                    <Container>
                        <table className='userDetailTable'>

                            <tbody>
                                <tr>


                                    <td colSpan={3}>
                                        {status === "new" ?
                                            <Button variant="outline-dark" className="editForm"
                                                onClick={UpdateUser.bind(this, additionalInfo)}
                                                disabled={(status === "new") ? false : true}
                                                style={{
                                                    position: "relative",
                                                    top: "80px"
                                                }} >
                                                Edit the form
                                            </Button>
                                            :
                                            ""}                                        <h1 className="text-center mb-4">Additional Information</h1>



                                    </td>


                                </tr>
                                <tr>
                                    {additionalInfo ?
                                        <td className="details-td">

                                            <>


                                                {addArray.map((ex, i) => (
                                                    <>
                                                        <td className="lineHeightAdditional">{ex}</td>
                                                        <br />
                                                    </>
                                                ))
                                                }



                                            </>
                                            <br />

                                        </td>
                                        :
                                        "There is no additional information to show"
                                    }

                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Col>*/