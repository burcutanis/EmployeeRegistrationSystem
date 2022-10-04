import React, { Component, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import Navbarfnc from '../NavbarUser';
import './add.css'




function Add(props,) {
    const [groups, setGroup] = React.useState([]);

    const [titles, setTitles] = React.useState([]);
    const [applicationList, setApplications] = React.useState([]);
    const [email, setEmail] = React.useState(false);
    const [openPositions, setOpenPositions] = React.useState([]);

    useEffect(() => {
        const currentEmail = localStorage.getItem("currentEmail");
        if (currentEmail) setEmail(currentEmail)
    }, [email]
    )



    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/group');
            setGroup(result.data);
            //console.log(result.data);
            //console.log(groups);
        }
        FetchData();

    }, [groups.value]
    )




    useEffect(() => {

        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/user/${currentEmail}`);
            setApplications(result.data);
            console.log(result.data);
            console.log(applicationList);
        }
        FetchData();

    }, [applicationList.value]
    )

    useEffect(() => {

        const FetchTitle = async () => {
            const result = await axios.get('http://localhost:4000/title');
            setTitles(result.data);
            console.log(result.data);
            console.log(titles);
        }
        FetchTitle();

    }, [titles.value]
    )

    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/openPosition');
            setOpenPositions(result.data);
            console.log(result.data);
        }
        FetchData();
    }, [openPositions.value]
    );




    const navigate = useNavigate();



    let statusBool = false;

    function statusfnc() {
        applicationList.map(e => {
            if (e.status !== "rejected") {
                if (e.status !== "not employee") {
                    console.log(e.status)
                    statusBool = true;
                }
            }
        })
    }






    const continuefnc = (e) => {
        e.preventDefault();
        statusfnc();

        if (!statusBool) {
            props.nextStep();

        }
        else {
            return alert("You cannot submit a new application when you have an active application")
        }





    };
    const { values, handleChange } = props;
    return (
        <>
            <Navbarfnc />
            <div>
                <div id="container">
                    <header className="head-form">
                        <h1>•  Job Application •</h1>
                        <h3> {values.emp.position ? `Position applied for: ${values.emp.position}` : ""}</h3>
                        <p> Please complete the form below to apply for a position with us.</p>
                    </header>
                    <Form onSubmit={continuefnc}  >
                        <Form.Group className="mb-3" >
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                type="text"
                                autoCapitalize='none'
                                placeholder="Enter your name"
                                name="name"
                                value={values.emp.name}
                                onChange={handleChange('name')}
                                id="name_input"
                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname * </Form.Label>


                            <Form.Control
                                type="text"
                                placeholder="Enter your surname"
                                name="surname"
                                value={values.emp.surname}
                                onChange={handleChange('surname')}
                                id="surname_input"
                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Position applied for *</Form.Label>
                            <Form.Select value={values.emp.position}
                                name="position" onChange={handleChange('position')}>
                                <option value=""></option>
                                {openPositions.map((position, i) => (
                                    <option key={position.positionName} value={position.positionName}>
                                        {position.positionName}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form.Group>

                        <header className="head-form">
                            <p> Please fill all the necessary fields with *.</p>
                        </header>
                        <input type="submit"
                            color="primary"
                            variant="outline-success"
                            id="form_button"
                            style={{
                                position: "relative",
                                left: "230px",
                                width: "200px",
                                margin: "0 0 100px 0",

                            }}
                            value="Continue" />

                    </Form>
                </div>

            </div>
        </>



    )

}

export default Add;

