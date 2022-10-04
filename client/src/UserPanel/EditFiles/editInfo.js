import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';


function Edit() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [id, setId] = React.useState("");


    const [openPositions, setOpenPositions] = React.useState([]);



    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/${searchParams.get("id")}`);
            setName(result.data.name)
            setSurname(result.data.surname)
            setEmail(result.data.email)
            setPosition(result.data.position)
            setUserId(result.data.userId)
            setStatus(result.data.status)
            setId(result.data.id)

            // console.log(result.data);
        }

        FetchData();

    }, [status.value]
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


    const onNameChanged = e => {
        setName(e.target.value)
        console.log(name);
    }
    const onSurnameChanged = e => setSurname(e.target.value)
    const openPositionChanged = e => setPosition(e.target.value)


    function updateUser() {
        axios.put(`http://localhost:4000/userGeneralInfo/${id}`, { "name": name, "surname": surname, "position": position })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setName(name)
                setSurname(surname)

            });
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === "new") {
            updateUser();
        }
        else {
            alert("You cannot edit your job application anymore because your job application is under evalutation now");
        }
        navigate({
            pathname: '/userAppInfo',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    };

    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit your Application  •</h1>
                <div className="underline"></div>

                <Form onSubmit={onSubmit}  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={onNameChanged}
                            id="name_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Surname * </Form.Label>


                        <Form.Control
                            type="text"
                            placeholder="Enter your surname"
                            name="surname"
                            value={surname}
                            onChange={onSurnameChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Position applied for *</Form.Label>
                        <Form.Select value={position} name="position" required={true} onChange={openPositionChanged}>
                            <option value=""></option>
                            {openPositions.map((position, i) => (
                                <option key={position.positionName} value={position.positionName}>
                                    {position.positionName}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <input type="submit" id="form_button" value="SUBMIT" />

                </Form>
            </div>
        </>

    );
}
export default Edit;