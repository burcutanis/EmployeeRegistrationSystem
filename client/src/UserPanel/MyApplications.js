import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button, Table } from 'react-bootstrap';
import Navbarfnc from './NavbarUser';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function MyApplications() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [myApplications, setMyApplications] = React.useState("");


    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/user/${currentEmail}`);
            // console.log(result.data);
            // console.log(email);
            setMyApplications(result.data)
            setLoading(false);


            console.log(result.data);
        }
        FetchData();
    }, []
    )


    const navigate = useNavigate();


    const userDetail = (id) => {
        navigate({
            pathname: '/userAppInfo',
            search: createSearchParams({
                userId: id
            }).toString()

        })
    };

    const submit = (id, i) => {

        confirmAlert({
            title: 'Delete the application',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => remove(id, i)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    }

    const remove = async (id, i) => {
        var res = await axios.delete(`http://localhost:4000/userGeneralInfo/${id}`)
        console.log(res);
        console.log(res.data);
        console.log("removed general info")
        try {
            var res2 = await axios.delete(`http://localhost:4000/userPersonalInformation/${id}`)
            console.log(res2.data);

        }
        catch (err) {
            console.log("Delete userPersonalInformation error")

        }
        try {
            var res4 = await axios.delete(`http://localhost:4000/userExperience/${id}`)
            console.log(res4.data);

        }
        catch (err) {
            console.log("Delete userExperience error")

        }
        try {
            var res3 = await axios.delete(`http://localhost:4000/userEducation/${id}`)
            console.log(res3.data);

        }
        catch (err) {
            console.log("Delete userEducation error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/userExperienceItem/${id}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete userExperienceItem error")

        }
        try {
            var res6 = await axios.delete(`http://localhost:4000/file/${id}`)
            console.log(res6.data);

        }
        catch (err) {
            console.log("Delete CV error")

        }
        try {
            var res7 = await axios.delete(` http://localhost:4000/coverLetter/${id}`)
            console.log(res7.data);

        }
        catch (err) {
            console.log("Delete Cover letter error")
        }
        try {
            var res7 = await axios.delete(`http://localhost:4000/otherFiles/${id}`)
            console.log(res7.data);

        }
        catch (err) {
            console.log("Delete Other File error")
        }
        let newAppList = [...myApplications];
        newAppList.splice(i, 1);
        setMyApplications(newAppList)





    }



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
                <h1 className="text-center mb-4">My Applications</h1>
                <div className="employee">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Position you applied</th>
                                <th>Status of your application</th>
                                <th>Date of your application</th>
                                <th>Application Details</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {myApplications.map((app, i) => (
                                <tr>
                                    <td>{app.position}</td>
                                    <td>{app.status}</td>
                                    <td>{app.date}</td>
                                    <td><Button className="" variant="outline-danger" onClick={userDetail.bind(this, app.userId)}>Application Detail</Button></td>
                                    {app.status === "new" ?
                                        <td><Button className="" variant="outline-danger" onClick={submit.bind(this, app.userId, i)} >Delete Application</Button></td>
                                        : <td><h6>You can delete only if the status is new</h6></td>
                                    }





                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div >
            </div>




        </>





    )
}
export default MyApplications;