import React, { Component, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import './add.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';



function Add(props) {
    const [cities, setCities] = useState([{}]);


    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };



    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get("https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json");
            setCities(result.data);
            //console.log(result.data);
        }
        FetchData();

    }, [cities.value]
    )






    const [dateOfBirth, setdateOf] = React.useState(new Date());

    function ChangeDate2(date) {
        setdateOf(date);
        ChangeDate(date);
    };




    const { values, handleChange, ChangeDate } = props;
    return (

        <>
            <>
                <Navbarfnc />


                <div id="container">

                    <header className="head-form">
                        <h1>•  Add Personal Information •</h1>
                        <p> Please complete the form below to apply for a position with us.</p>
                    </header>

                    <Form onSubmit={continuefnc}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Date Of Birth *</Form.Label>
                            <DatePicker
                                selected={dateOfBirth}
                                onChange={ChangeDate2}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Marital Status *</Form.Label>
                            <Form.Select aria-label="Default select example" value={values.personalInfo.maritalStatus} name="maritalStatus" required={true} onChange={handleChange('maritalStatus')} placeholder="Enter your maritalStatus" >
                                <option value=""></option>
                                <option value={"Married"}>Married</option>
                                <option value={"Single"}>Single </option>
                                <option value={"I prefer not to say"}>I prefer not to say </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>City * </Form.Label>
                            <Form.Select value={values.personalInfo.city}
                                name="city" onChange={handleChange('city')}>
                                <option value=""></option>
                                {cities.map((city, i) => (
                                    <option value={city.name}>
                                        {city.name}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Address *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={values.personalInfo.address}
                                onChange={handleChange('address')}
                                id="email_input"
                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile * </Form.Label>
                            <Form.Control
                                type="number"
                                maxLength={12}
                                minLength={11}
                                placeholder="Enter your mobile"
                                name="mobile"
                                value={values.personalInfo.mobile}
                                onChange={handleChange('mobile')}
                                id="name_input"
                                required={true} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Gender *</Form.Label>
                            <Form.Select aria-label="Default select example" value={values.personalInfo.gender} name="gender" required={true} onChange={handleChange('gender')}>
                                <option value=""></option>
                                <option value={"Woman"}>Woman</option>
                                <option value={"Men"}>Men</option>
                                <option value={"I prefer not to say"}>I prefer not to say</option>
                            </Form.Select>
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






        </>

    )

}

export default Add;
