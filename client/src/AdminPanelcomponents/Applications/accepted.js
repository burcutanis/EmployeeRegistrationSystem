import React, { Fragment, useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import './applications.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navbarfnc from '../Navbar';
import { useNavigate, Link, createSearchParams } from 'react-router-dom';


function Applications(props) {
    const navigate = useNavigate();
    const [applicationList, setApp] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/userGeneralInfo');
            setApp(result.data);
            //console.log(result.data);
            setLoading(false);
        }
        FetchData();
    },
    );




    const userDetail = (id) => {
        navigate({
            pathname: '/applicationDetailsGeneralInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const addToEmployee = (userId) => {
        navigate({
            pathname: '/addToEmployee',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    };



    var newApplications = applicationList.filter(item => item.status === "accepted")

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
            <div className="style" >
                <h1 className="text-center mb-4">Accepted Applications</h1>
                <div className="app">
                    <Table striped bordered hover>

                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Application Detail</th>
                                <th>Add to Employee List</th>

                            </tr>
                        </thead>
                        <tbody>
                            {newApplications.map((app, i) => (
                                <tr>
                                    <td>{app.name}</td>
                                    <td>{app.surname}</td>
                                    <td>{app.email}</td>
                                    <td><Button className="" variant="outline-danger" onClick={userDetail.bind(this, app.userId)}>Application Detail</Button></td>
                                    <td><Button className="" variant="outline-danger" onClick={addToEmployee.bind(this, app.userId)}>Add To Employee List</Button></td>



                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div >
            </div></>


    );
}
export default Applications;