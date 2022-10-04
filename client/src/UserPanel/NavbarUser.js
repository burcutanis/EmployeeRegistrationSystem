
import './Navbar.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, createSearchParams } from 'react-router-dom';




function Navbarfnc(props) {

    const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
    /*
        useEffect(() => {
            const loggedIn = localStorage.getItem("userAuthToken");
            if (loggedIn) setnavbarUserIsLogged(true);
    
        }, [navbarUserIsLogged]);*/

    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem("userAuthToken") || ""
    );




    const navigate = useNavigate();



    const logoutHandler = async () => {
        localStorage.removeItem("userAuthToken");
        setnavbarUserIsLogged(false);
        navigate({
            pathname: '/userLogin',
        })
        /*
        const loggedIn = localStorage.getItem("userAuthToken");
        if (loggedIn) setnavbarUserIsLogged(true);
        else setnavbarUserIsLogged(false);*/

    }

    const login = () => {
        navigate({
            pathname: '/userLogin',
        })
    };

    const register = () => {
        navigate({
            pathname: '/userRegister',
        })
    };
    return (authTokens ? (
        <Navbar bg="light" expand="lg" className="navigationBar">
            <Container>
                <Navbar.Brand className="navbarBrand" style={{ position: "relative", right: "50px", margin: "0" }} href="#home">Job Application System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="navbarDropdown " href="/userHome">Home</Nav.Link>
                        <Nav.Link className="navbarDropdown " href="/addApplication">Job Application Form</Nav.Link>


                    </Nav>
                    <NavDropdown className="navbarDropdown2 " title="My Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item className="dropdownItem " href="/myApplications">My Applications</NavDropdown.Item>


                    </NavDropdown>

                    <Button variant="outline-success" className="dropdownButton" onClick={() => logoutHandler()}>Logout</Button>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    ) :
        <Navbar bg="light" expand="lg" className="navigationBar">
            <Container>
                <Navbar.Brand className="navbarBrand" style={{ position: "relative", right: "50px", margin: "0" }} href="#home">Job Application System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav >
                        <Nav.Link>  <Button variant="btn btn-outline-success" onClick={login.bind(this)}>Login</Button> </Nav.Link>
                        <Nav.Link>  <Button variant="outline-success" onClick={register.bind(this)}>Register</Button> </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >

    )

}




export default Navbarfnc;

//<NavDropdown.Item href="/profile" className="dropdownItem">Profile</NavDropdown.Item>


/*<NavDropdown.Item href="/userInfo" className="dropdownItem">About Me</NavDropdown.Item>
    <NavDropdown.Item href="/userPersonalInfo" className="dropdownItem">My Personal Information</NavDropdown.Item>
    <NavDropdown.Item href="/userEducation" className="dropdownItem">My Education Informations</NavDropdown.Item>
    <NavDropdown.Item href="/userExperience" className="dropdownItem">My Job Experiences</NavDropdown.Item>
    <NavDropdown.Item href="/userAdditionalInfo" className="dropdownItem">Additional Informations</NavDropdown.Item>*/