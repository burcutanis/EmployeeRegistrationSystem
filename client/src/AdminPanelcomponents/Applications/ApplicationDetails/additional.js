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
    const [additionalInfo, setAdditionalInfo] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/user/${currentEmail}`);
            //console.log(result.data);
            //console.log(email);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setStatus(result.data[0].status)
            setLoading(false);

            //console.log(result.data);
        }
        FetchData();
    }, []
    )


    useEffect(() => {


        const FetchData = async () => {
            const userId = localStorage.getItem("userId");
            const result = await axios.get(`http://localhost:4000/additionalInfo/user/${userId}`);
            //console.log(result.data);
            setAdditionalInfo(result.data[0].additional);
        }
        FetchData();

    }, []
    )



    const navigate = useNavigate();



    const userDetail = (id) => {
        navigate({
            pathname: '/applicationDetailsGeneralInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };


    const personalInformation = (id) => {
        navigate({
            pathname: '/applicationDetailsPersonalInfo',
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

    const experience = (id) => {
        navigate({
            pathname: '/applicationDetailsExperience',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };


    let addArray = [];
    const showAdditional = (additionalInfo) => {
        if (additionalInfo) {
            addArray = additionalInfo.split("\n");
        }
    };
    showAdditional(additionalInfo);



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
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this, searchParams.get("id"))} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, searchParams.get("id"))} >Education</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, searchParams.get("id"))} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Additional Informations</Nav.Link>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable'>

                            <tbody>
                                <tr>


                                    <td colSpan={3}>

                                        <h1 className="text-center mb-4">Additional Information</h1>


                                    </td>


                                </tr>
                                <tr>
                                    <td >
                                        {additionalInfo ?
                                            additionalInfo
                                            :
                                            "There is no additional information to show"
                                        }

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