import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import './edit.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Navbarfnc from '../Navbar';


function Edit() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [group, setGroup] = React.useState("");
    const [title, setTitle] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [titles, setTitles] = React.useState([]);


    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employee//${searchParams.get("id")}`);
            setName(result.data.name)
            setSurname(result.data.surname)
            setEmail(result.data.email)
            setTitle(result.data.title)
            setGroup(result.data.group)
            setUserId(result.data.userId)
            //console.log(result.data);
        }
        const FetchGroup = async () => {
            const result = await axios.get('http://localhost:4000/group');
            setGroups(result.data);
            //console.log(result.data);
            //console.log(groups);
        }
        const FetchTitle = async () => {
            const result = await axios.get('http://localhost:4000/title');
            setTitles(result.data);
            //console.log(result.data);
            //console.log(titles);
        }
        FetchData();
        FetchGroup();
        FetchTitle();
    }, []
    )







    const navigate = useNavigate();

    const onNameChanged = e => {
        setName(e.target.value)
        console.log(name);
    }
    const onSurnameChanged = e => setSurname(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onGroupChanged = e => setGroup(e.target.value)


    function updateUser() {
        axios.put(`http://localhost:4000/employee/${searchParams.get("id")}`, { "name": name, "surname": surname, "email": email, "group": group, "title": title })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setName(name)
                setSurname(surname)
                setEmail(email)
                setGroups(group)
            });
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/userDetail',
            search: createSearchParams({
                id: userId,
            }).toString()
        })
    };

    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit Employee  •</h1>
                <div className="underline"></div>

                <Form onSubmit={onSubmit}  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the name"
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
                            placeholder="Enter the surname"
                            name="surname"
                            value={surname}
                            onChange={onSurnameChanged}
                            id="surname_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter the email"
                            name="email"
                            value={email}
                            onChange={onEmailChanged}
                            id="email_input"
                            required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Group Name * </Form.Label>
                        <Form.Select value={group} name="group" required={true} onChange={onGroupChanged}>
                            <option value=""></option>
                            {groups.map((groupName, i) => (
                                <option key={groupName.group} value={groupName.group}>
                                    {groupName.group}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title Name *</Form.Label>
                        <Form.Select value={title} name="title" required={true} onChange={onTitleChanged}>
                            <option value=""></option>
                            {titles.map((titleName, i) => (
                                <option key={titleName.title} value={titleName.title}>
                                    {titleName.title}
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