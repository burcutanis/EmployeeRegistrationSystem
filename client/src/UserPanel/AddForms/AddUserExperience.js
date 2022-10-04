import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import './add.css'

function Add(props) {

    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    const { values, handleChange } = props;
    return (

        <>
            <Navbarfnc />



            <div id="container">
                <h1>• Add Experience •</h1>
                <div className="underline"></div>

                <Form onSubmit={continuefnc}>
                    <Form.Group className="mb-3" >
                        <Form.Label>CURRENT STATUS *</Form.Label>
                        <Form.Select aria-label="Default select example"
                            value={values.experience.currentStatus}
                            name="currentStatus" required={true}
                            onChange={handleChange('currentStatus')}
                            placeholder="Enter your current status" >
                            <option value=""></option>
                            <option value={"Unemployed"}>Unemployed</option>
                            <option value={"Employed"}>Employed </option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ margin: "50px 0" }} >
                        <Form.Label> <span><h6>SPECIAL SKILLS *</h6>  <p>List any special skills or experience that you feel would help you in the position that you are applying for (leadership, organizations/teams, etc) </p></span> </Form.Label>

                        <Form.Control
                            type="text"
                            as="textarea" rows={3}
                            placeholder="Enter your skills"
                            name="skills"
                            value={values.experience.skills}
                            onChange={handleChange('skills')}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    <header className="head-form">
                        <p> Please fill all the necessary fields with *.</p>
                    </header>
                    <Button
                        color="secondary"
                        variant="outline-danger"
                        onClick={back}
                        id="form_button"
                        style={{
                            position: "relative",
                            left: "130px",
                            width: "200px",
                            margin: "0 0 100px 0",
                            top: "40px"
                        }}
                    >Back</Button>
                    <input type="submit"
                        color="primary"
                        variant="outline-success"
                        id="form_button"
                        style={{
                            position: "relative",
                            left: "170px",
                            width: "200px",
                            margin: "0 0 100px 0",
                            bottom: "10px"
                        }}
                        value="Continue" />




                </Form>
            </div>
        </>


    )

}

export default Add;