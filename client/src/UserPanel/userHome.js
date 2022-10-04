import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Card, Form, Table, Row, Col, Nav } from 'react-bootstrap';
import Navbarfnc from './NavbarUser';
import './userHome.css';
import CardFunction from "./Card"
import { useNavigate, useSearchParams, createSearchParams, Link } from 'react-router-dom';

function UserHome(props) {

    const [openPositions, setOpenPositions] = useState([]);
    const [active, setActive] = useState(-1);
    const navigate = useNavigate();
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/openPosition');
            setOpenPositions(result.data);
            // console.log(result.data);
        }
        FetchData();
    }, []
    );


    const cardindex = (index) => {
        setActive(index)

    }


    return (
        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4">Welcome to Job Application System</h1>
                <>
                    <meta charSet="utf-8" />
                    {/* Google Fonts */}
                    <link
                        href="https://fonts.googleapis.com/css?family=Montserrat|Ubuntu"
                        rel="stylesheet"
                    />
                    {/* CSS Stylesheets */}
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                        crossOrigin="anonymous"
                    />
                    <link rel="stylesheet" href="css/styles.css" />
                    {/* Font Awesome */}
                    {/* Bootstrap Scripts */}



                    <section className="colored-section" id="testimonials">
                        <div id="testimonial-carousel" className="carousel slide" data-ride="false">
                            <div className="">
                                <div className="container-fluid">
                                    <h2 className="testimonial-text">
                                        Open Positions
                                    </h2>
                                    <h6 style={{
                                        textAlign: "center"
                                    }}>You have to login to apply for open positions </h6>
                                </div>
                                <div className="carousel-item container-fluid">
                                </div>
                            </div>

                        </div>
                    </section>
                    {/* Open Positions */}
                    <Row>

                        <Col xs={12} md={12} lg={12}>

                            <section className="white-section" id="features">
                                <div className="container-fluid">
                                    <Table striped bordered hover className="groupTable" >
                                        <tbody>
                                            {openPositions.map((pos, i) => (
                                                <tr>
                                                    <td><Button variant="outline" href='#about-section' onClick={cardindex.bind(this, i)}>{pos.positionName}</Button></td>

                                                    <Nav.Link className="applyButton "
                                                        style={{
                                                            backgroundColor: "#e3f7fa",
                                                            borderRadius: "40px"
                                                        }}
                                                        href={'/addApp/' + pos.positionName} >Apply</Nav.Link>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>





                                </div>
                            </section>
                        </Col>
                        <Col xs={12} md={12} lg={12}>
                            <section className="white-section" id="features">
                                <div className="container-fluid" id="about-section">
                                    <CardFunction index={active} />
                                </div>
                            </section>
                        </Col>
                    </Row>
                    {/* Footer */}

                </>


            </div >
        </>


    );
}

export default UserHome;
