import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import CardFunction from "../../UserPanel/Card"


function OpenPositions() {
    const [openPositions, setOpenPositions] = useState([]);
    const [id, setId] = useState(null);
    const [active, setActive] = useState(-1);
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/openPosition');
            setOpenPositions(result.data);
            // console.log(result.data);
        }
        FetchData();
    }, []
    );

    return (
        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4">Open Positions</h1>
                <div className="employee">
                    <React.Fragment>

                        <Row>

                            <Col >

                                <Table striped bordered hover className="groupTable" style={{ width: "900px" }}>

                                    <thead>
                                        <tr>
                                            <th>Open Positions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {openPositions.map((pos, i) => (
                                            <tr>
                                                <td><Button href='#about-section' variant="outline" onClick={() => setActive(i)}>{pos.positionName}</Button></td>

                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>
                                <div id="about-section">
                                    <CardFunction index={active} />
                                </div>
                            </Col>
                        </Row>
                    </React.Fragment>


                </div >
            </div>
        </>

    );
}
export default OpenPositions;