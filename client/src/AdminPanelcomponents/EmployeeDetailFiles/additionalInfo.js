import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../Navbar';

function EmployeeDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");




    const [id, setId] = React.useState("");
    const [additionalInfo, setAdditionalInfo] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [loading, setLoading] = React.useState(true);



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


        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/adminAdditionalInfo/user/${searchParams.get("id")}`);
            //console.log(result.data);
            setAdditionalInfo(result.data[0].additional);
            setLoading(false);
        }
        FetchData();

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





    const education = (id) => {
        navigate({
            pathname: '/education',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };



    const UpdateUser = (additionalInfo) => {
        navigate({
            pathname: '/editAdditional',
            search: createSearchParams({
                additionalInfo: additionalInfo,
                id: searchParams.get("id"),
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
                            <Button className="navbarButton" variant="outline" onClick={userDetail.bind(this, searchParams.get("id"))} >General Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this, searchParams.get("id"))} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, searchParams.get("id"))} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, searchParams.get("id"))} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >Additional Info</Nav.Link>
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
                                        <Button variant="outline-secondary" className="editFormPersonalInfo" onClick={UpdateUser.bind(this, additionalInfo)}>
                                            Edit the form
                                        </Button>


                                    </td>


                                </tr>
                                <tr>
                                    <td >

                                        {additionalInfo}


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
export default EmployeeDetail;