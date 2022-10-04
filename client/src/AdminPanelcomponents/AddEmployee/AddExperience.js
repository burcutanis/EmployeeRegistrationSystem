import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import './Add.css'

function Add(props) {

    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    const { experience, handleChange } = props;
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
                            value={experience.currentStatus}
                            name="currentStatus" required={true}
                            onChange={handleChange('currentStatus')}
                            placeholder="Enter your current status" >
                            <option value=""></option>
                            <option value={"Unemployed"}>Unemployed</option>
                            <option value={"Employed"}>Employed </option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ margin: "50px 0" }} >
                        <Form.Label> <span><h6>SKILLS *</h6>  <p>List any skills that the employee have related to her/his position </p></span> </Form.Label>

                        <Form.Control
                            type="text"
                            as="textarea" rows={3}
                            placeholder="Enter the skills"
                            name="skills"
                            value={experience.skills}
                            onChange={handleChange('skills')}
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
                            left: "120px",
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
                            left: "160px",
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