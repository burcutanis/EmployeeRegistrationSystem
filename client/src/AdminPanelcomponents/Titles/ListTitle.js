import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './title.css'
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function Titles(props) {
    const [titles, setTitle] = useState([]);
    const [id, setId] = useState(null);
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/title');
            setTitle(result.data);
            //console.log(result.data);
        }
        FetchData();
    }, []
    );

    return (
        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4">Title (Position) List</h1>
                <div className="employee">
                    <React.Fragment>

                        <Row>

                            <Col >

                                <Table striped bordered hover className='titleTable' style={{ width: "900px" }}>

                                    <thead>
                                        <tr>
                                            <th>Title Name</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {titles.map((title, i) => (
                                            <tr>
                                                <td>{title.title}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </React.Fragment>


                </div >
            </div>
        </>

    );
}
export default Titles;