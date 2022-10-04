import React, { Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function AddOpenPosition() {
    const [positionName, setOpenPosition] = React.useState("");
    const [explanation, setExplanation] = React.useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setOpenPosition(e.target.value);

    }

    const onChange2 = (e) => {
        setExplanation(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newOpenPosition = {
            positionName, explanation
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('http://localhost:4000/openPosition', newOpenPosition, config);
            console.log(res.data);
            navigate("/listOpenPosition", { replace: true });
        }
        catch (err) {
            console.error(err.response.data);

        }

    };

    return (
        <>
            <Navbarfnc />
            <div id="container" className='containerColor'>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Open Position</Form.Label>
                        <Form.Control
                            type="text"
                            value={positionName}
                            onChange={onChange}
                            placeholder="Enter a open position" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Explanation</Form.Label>
                        <Form.Control

                            type="text"
                            as="textarea" rows={3}
                            value={explanation}
                            onChange={onChange2}
                        />
                    </Form.Group>
                    <input type="submit" id="form_button" value="Submit" />
                </Form>

            </div>
        </>

    );
}
export default AddOpenPosition;