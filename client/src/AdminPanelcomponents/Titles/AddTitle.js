import React, { Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function AddTitle() {
    const [title, setTitle] = React.useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setTitle(e.target.value);
        console.log(title);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newTitle = {
            title
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('http://localhost:4000/title', newTitle, config);
            console.log(res.data);
            navigate("/listTitle", { replace: true });
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
                        <Form.Label>Title name</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={onChange}
                            placeholder="Enter title" />
                    </Form.Group>
                    <input type="submit" id="form_button" value="Submit" />
                </Form>

            </div>
        </>

    );
}
export default AddTitle;