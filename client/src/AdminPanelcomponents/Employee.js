import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link, createSearchParams } from 'react-router-dom';


function Employee(props) {
    const navigate = useNavigate();




    const userDetail = (id) => {
        navigate({
            pathname: '/userDetail',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };





    return (

        <React.Fragment>



            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Employee Detail</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {props.employeeList.map((employee, i) => (
                        <tr>
                            <td>{employee.name}</td>
                            <td>{employee.surname}</td>
                            <td>{employee.email}</td>
                            <td><Button className="" variant="outline-danger" onClick={userDetail.bind(this, employee.userId)}>Employee Detail</Button></td>
                            <td><Button className="" variant="outline-danger" onClick={props.remove.bind(this, employee.userId, i, employee.email)}>Delete Employee</Button></td>



                        </tr>
                    ))
                    }
                </tbody>
            </Table>

        </React.Fragment>


    )
}

export default Employee;



