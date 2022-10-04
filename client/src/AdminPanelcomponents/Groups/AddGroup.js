import React, { Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function AddGroup() {
    const [group, setGroup] = React.useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setGroup(e.target.value);
        console.log(group);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newGroup = {
            group
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('http://localhost:4000/group', newGroup, config);
            console.log(res.data);
            navigate("/listGroup", { replace: true });
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
                    <Form.Group className="mb-3">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={group}
                            onChange={onChange}
                            placeholder="Enter group" />
                    </Form.Group>
                    <input type="submit" id="form_button" value="Submit" />
                </Form>

            </div>
        </>

    );
}
export default AddGroup;