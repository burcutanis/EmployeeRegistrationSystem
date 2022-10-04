import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Navbarfnc from '../Navbar';
import './Add.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";






function Add(props) {
    const [searchParams] = useSearchParams();
    const [groups, setGroup] = React.useState([]);
    const [titles, setTitles] = React.useState([]);
    const [employee, setEmployee] = React.useState([]);


    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/group');
            setGroup(result.data);
            console.log(result.data);
            console.log(groups);
        }
        FetchData();

    }, [groups.value]
    )

    useEffect(() => {

        const FetchEmployee = async () => {
            const result = await axios.get('http://localhost:4000/employee');
            setEmployee(result.data);
            console.log(result.data);
            console.log(titles);
        }
        FetchEmployee();

    }, [employee.value]
    )

    useEffect(() => {

        const FetchTitle = async () => {
            const result = await axios.get('http://localhost:4000/title');
            setTitles(result.data);
            console.log(result.data);
            console.log(titles);
        }
        FetchTitle();

    }, [titles.value]
    )



    let xbool = false;

    function emailFnc(email) {
        employee.map(e => {
            if (e.email === email) {
                xbool = true;
            }
        })
    }



    const continuefnc = (e) => {
        e.preventDefault();
        emailFnc(emp.email);
        if (xbool) {
            confirmAlert({
                message: 'This email was already in the system.',
                buttons: [
                    {
                        label: 'Ok',

                    },

                ]
            });
        }
        else {
            props.nextStep();
        }

    };




    const { emp, handleChange, ChangeStartDate, startDate } = props;
    return (
        <>
            <Navbarfnc />
            <div>
                <div id="container">
                    <header className="head-form">
                        <h1>•  Add Employee •</h1>
                    </header>
                    <Form onSubmit={continuefnc}  >
                        <Form.Group className="mb-3" >
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the name of employee"
                                name="name"
                                value={emp.name}
                                onChange={handleChange('name')}
                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname * </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the surname of employee"
                                name="surname"
                                value={emp.surname}
                                onChange={handleChange('surname')}
                                required={true} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter the email of employee"
                                name="email"
                                value={emp.email}
                                onChange={handleChange('email')}
                                required="true" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Group Name *</Form.Label>
                            <Form.Select value={emp.group} name="group" required={true} onChange={handleChange('group')}>
                                <option value=""></option>
                                {groups.map((groupName, i) => (
                                    <option key={groupName.group} value={groupName.group}>
                                        {groupName.group}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Title Name *</Form.Label>
                            <Form.Select value={emp.title} name="title" required={true} onChange={handleChange('title')}>
                                <option value=""></option>
                                {titles.map((titleName, i) => (
                                    <option key={titleName.title} value={titleName.title}>
                                        {titleName.title}
                                    </option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>The date the employee started to work * </Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={ChangeStartDate}

                            />
                        </Form.Group>

                        <header className="head-form">
                            <p> Please fill all the necessary fields with *.</p>
                        </header>
                        <input type="submit"
                            color="primary"
                            variant="outline-success"
                            id="form_button"
                            style={{
                                position: "relative",
                                left: "230px",
                                width: "200px",
                                margin: "0 0 100px 0",

                            }}
                            value="Continue" />

                    </Form>
                </div>

            </div>
        </>



    )

}

export default Add;


