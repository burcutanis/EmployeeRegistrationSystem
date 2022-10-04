
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

    useEffect(() => {
        (() => {
            const loggedIn = localStorage.getItem("authToken");
            if (loggedIn) setnavbarUserIsLogged(true);
        })();
    }, [navbarUserIsLogged]);




    const navigate = useNavigate();
    const [groups, setGroup] = useState([]);
    const [id, setId] = useState(null);
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/group');
            setGroup(result.data);
            //console.log(result.data);
        }
        FetchData();
    }, []
    );

    const groupDetail = (id) => {
        navigate({
            pathname: '/listEmpByGroup',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const logoutHandler = async () => {
        localStorage.removeItem("authToken");
        navigate({
            pathname: '/adminLogin',
        })
        const loggedIn = localStorage.getItem("authToken");
        if (loggedIn) setnavbarUserIsLogged(true);
        else setnavbarUserIsLogged(false);


    }

    const login = (id) => {
        navigate({
            pathname: '/adminLogin',
        })
    };

    const register = (id) => {
        navigate({
            pathname: '/adminRegister',
        })
    };
    return (navbarUserIsLogged ? (
        <Navbar bg="light" expand="lg" className="navigationBar">
            <Container>
                <Navbar.Brand className="navbarBrand" style={{ position: "relative", right: "50px", margin: "0" }} href="#home">Employee Registration System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <NavDropdown style={{ padding: "0 7px " }} title="Groups" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/addGroup">Add New Group</NavDropdown.Item>
                            <NavDropdown.Item href="/listGroup">List Groups </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown style={{ padding: "0 7px " }} title="Titles" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/addTitle">Add New Title</NavDropdown.Item>
                            <NavDropdown.Item href="/listTitle">List Titles </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown style={{ padding: "0 7px " }} title="Open Positions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/addOpenPosition">Add Open Position</NavDropdown.Item>
                            <NavDropdown.Item href="/listOpenPosition">List Open Positions </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown style={{ padding: "0 7px " }} title="Employees" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Add Employees</NavDropdown.Item>
                            <NavDropdown.Item href="/employees">List Employees </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown style={{ padding: "0 7px " }} title="Employees By Groups" id="basic-nav-dropdown">
                            {groups.map((group, i) => (
                                <Button className="navbarButton" variant="outline" onClick={groupDetail.bind(this, group.group)} >{group.group}</Button>
                            ))
                            }
                        </NavDropdown>
                        <NavDropdown style={{ padding: "0 15px " }} title="Applications" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/newApplications">New</NavDropdown.Item>
                            <NavDropdown.Item href="/underEvaluationApplications">Under Evalutation</NavDropdown.Item>
                            <NavDropdown.Item href="/arrangeInterviewApplications">Arrange Interview</NavDropdown.Item>
                            <NavDropdown.Item href="/rejectedApplications">Rejected</NavDropdown.Item>
                            <NavDropdown.Item href="/acceptedApplications">Accepted</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Button variant="outline-success" onClick={logoutHandler.bind(this)}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    ) :
        <Navbar bg="light" expand="lg" className="navigationBar">
            <Container>
                <Navbar.Brand className="navbarBrand" style={{ position: "relative", right: "50px", margin: "0" }} href="#home">Employee Registration System</Navbar.Brand>
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