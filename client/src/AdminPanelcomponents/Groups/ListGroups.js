import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './group.css';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function Groups(props) {
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

    return (
        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4">Group List</h1>
                <div className="employee">
                    <React.Fragment>

                        <Row>

                            <Col >

                                <Table striped bordered hover className="groupTable" style={{ width: "900px" }}>

                                    <thead>
                                        <tr>
                                            <th>Group Name</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groups.map((group, i) => (
                                            <tr>
                                                <td>{group.group}</td>
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
export default Groups;