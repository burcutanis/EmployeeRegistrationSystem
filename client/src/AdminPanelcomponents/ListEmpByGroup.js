import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Link, createSearchParams } from 'react-router-dom';
import Navbarfnc from './Navbar';


function ListEmpByGroup() {
    const navigate = useNavigate();
    const [empList, setEmp] = useState([]);
    const [groups, setGroups] = React.useState([]);
    const [group, setGroup] = React.useState([]);

    const [emps, setEmployees] = useState([]);
    let employees = []

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/employee');
            setEmp(result.data);
            //console.log(result.data);
        }
        FetchData();
    }, []
    );

    useEffect(() => {
        const FetchGroup = async () => {
            const result = await axios.get(`http://localhost:4000/group`);
            setGroups(result.data);
            //console.log(result.data);
        }
        FetchGroup();
        function groupFnc() {
            groups.map((info, i) => {
                if (info.group === searchParams.get("id")) {
                    setGroup(info);

                }
            })
        }
        groupFnc();
    }, []
    );






    function empFnc() {
        empList.map((employee, i) => {
            if (employee.group === searchParams.get("id")) {
                employees.push(employee);
            }
        })
    }
    const groupId = searchParams.get("id");
    empFnc(groupId);
    console.log(employees);

    function remove(id) {
        axios.delete(`http://localhost:4000/employee//${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("removed")
                employees = employees.filter(item => item.id !== id)

            });
    }

    const userDetail = (id) => {
        navigate({
            pathname: '/userDetail',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const UpdateUser = (id) => {
        navigate({
            pathname: '/edit',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    return (
        <>
            <Navbarfnc />

            <div className="style" >
                <h1 className="text-center mb-4">{searchParams.get("id")}</h1>
                <div className="employee"><Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>

                            <th>Employee Detail</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, i) => (
                            <tr>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.email}</td>
                                <td><Button className="" variant="outline-danger" onClick={userDetail.bind(this, employee.userId)}>Employee Detail</Button></td>



                            </tr>
                        ))
                        }
                    </tbody>
                </Table></div>



            </div>
        </>


    )

}

export default ListEmpByGroup;