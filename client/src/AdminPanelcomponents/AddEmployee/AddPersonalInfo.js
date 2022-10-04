import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import './Add.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


function Add(props) {


    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    const [cities, setCities] = useState([{}]);

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get("https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json");
            setCities(result.data);
            console.log(result.data);
        }
        FetchData();

    }, [cities.value]
    )



    const { personalInfo, handleChange, ChangeDate, birthDate } = props;
    return (

        <>
            <>
                <Navbarfnc />


                <div id="container">

                    <header className="head-form">
                        <h1>•  Add Personal Info •</h1>
                        <p> Please complete the form below to apply for a position with us.</p>
                    </header>

                    <Form onSubmit={continuefnc}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Date Of Birth *</Form.Label>
                            <DatePicker
                                selected={birthDate}
                                onChange={ChangeDate}

                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Marital Status *</Form.Label>
                            <Form.Select aria-label="Default select example" value={personalInfo.maritalStatus} name="maritalStatus" required={true} onChange={handleChange('maritalStatus')} placeholder="Enter your maritalStatus" >
                                <option value=""></option>
                                <option value={"married"}>Married</option>
                                <option value={"single"}>Single </option>
                                <option value={"Employee prefer not to say"}>Employee prefer not to say</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>City * </Form.Label>
                            <Form.Select value={personalInfo.city}
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
                                placeholder="Enter the address"
                                name="address"
                                value={personalInfo.address}
                                onChange={handleChange('address')}

                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile * </Form.Label>
                            <Form.Control
                                type="number"
                                maxLength={12}
                                minLength={11}
                                placeholder="Enter the mobile"
                                name="mobile"
                                value={personalInfo.mobile}
                                onChange={handleChange('mobile')}

                                required={true} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Gender *</Form.Label>
                            <Form.Select aria-label="Default select example" value={personalInfo.gender} name="gender" required={true} onChange={handleChange('gender')}>
                                <option value=""></option>
                                <option value={"woman"}>Woman</option>
                                <option value={"men"}>Men</option>
                                <option value={"Employee prefer not to say"}>Employee prefer not to say</option>
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

