import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../Navbar';



function AddAdditional(props) {


    const continuefnc = (e) => {
        e.preventDefault();
        props.nextStep();
    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    const { additionalInfo, handleChange } = props;
    return (

        <>
            <>
                <Navbarfnc />


                <div id="container">

                    <header className="head-form">
                        <h1>•  Add Adititional Info •</h1>
                        <p>You can add additional informations about the employee</p>
                    </header>

                    <Form onSubmit={continuefnc}>

                        <Form.Group className="mb-3" style={{ margin: "50px 0" }} >
                            <Form.Label> <span><h6>Additional Informations </h6> </span> </Form.Label>

                            <Form.Control
                                type="text"
                                as="textarea" rows={3}
                                placeholder="You can add additional informations about the employee"
                                name="additional"
                                value={additionalInfo.additional}
                                onChange={handleChange('additional')}
                            />
                        </Form.Group>

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

export default AddAdditional;