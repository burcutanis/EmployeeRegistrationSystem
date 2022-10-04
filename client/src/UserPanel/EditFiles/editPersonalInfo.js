import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbarfnc from '../NavbarUser';

function EditPersonalInfo() {
    const [searchParams] = useSearchParams();
    const [dateOfBirth, setdateOfBirth] = React.useState();
    const [maritalStatus, setmaritalStatus] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [address, setaddress] = React.useState("");
    const [city, setcity] = React.useState("");
    const [mobile, setmobile] = React.useState("");
    const [id, setId] = React.useState("");
    const [gender, setgender] = React.useState("");
    const [cities, setCities] = useState([{}]);


    useEffect(() => {
        const FetchData = async () => {
            axios.get(`http://localhost:4000/userPersonalInformation/user/${searchParams.get("id")}`)
                .then(result => {
                    setmaritalStatus(result.data[0].maritalStatus)
                    setaddress(result.data[0].address)
                    setcity(result.data[0].city)
                    setmobile(result.data[0].mobile)
                    setUserId(result.data[0].userId)
                    setId(result.data[0].id)
                    setgender(result.data[0].gender)
                    setdateOfBirth(result.data[0].dateOfBirth)
                    //  console.log(result.data);
                });

        }
        FetchData();

    }, []
    )
    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get("https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json");
            setCities(result.data);
            console.log(result.data);
        }
        FetchData();

    }, [cities.value]
    )
    const navigate = useNavigate();

    const onBirthChanged = e => setdateOfBirth(e.target.value)
    const onMaritalChanged = e => setmaritalStatus(e.target.value)
    const onAddressChanged = e => setaddress(e.target.value)
    const onCityChanged = e => setcity(e.target.value)
    const onMobileChanged = e => setmobile(e.target.value)
    const onGenderChanged = e => setgender(e.target.value)

    function updateUser() {
        axios.put(`http://localhost:4000/userPersonalInformation/${id}`, { "dateOfBirth": dateOfBirth, "maritalStatus": maritalStatus, "address": address, "city": city, "mobile": mobile, "gender": gender })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setdateOfBirth(dateOfBirth)
                setmaritalStatus(maritalStatus)
                setaddress(address)
                setcity(city)
                setmobile(mobile)
                setUserId(userId)
                setgender(gender)
            });
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/userAppPersonalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()
        })
    };




    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Edit Personal Information  •</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth * </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Date of Birth"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={onBirthChanged}
                            id="name_input"
                            required={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Marital Status *</Form.Label>
                        <Form.Select aria-label="Default select example" value={maritalStatus} name="maritalStatus" required={true} onChange={onMaritalChanged} placeholder="Enter your maritalStatus" >
                            <option value=""></option>
                            <option value={"married"}>Married</option>
                            <option value={"single"}>Single </option>
                            <option value={"I prefer not to say"}>I prefer not to say </option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>City * </Form.Label>
                        <Form.Select value={city}
                            name="city" onChange={onCityChanged}>
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
                            value={address}
                            onChange={onAddressChanged}
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
                            value={mobile}
                            onChange={onMobileChanged}
                            id="name_input"
                            required={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Gender *</Form.Label>
                        <Form.Select aria-label="Default select example" value={gender} name="gender" required={true} onChange={onGenderChanged}>
                            <option value=""></option>
                            <option value={"woman"}>Woman</option>
                            <option value={"men"}>Men</option>
                            <option value={"I prefer not to say"}>I prefer not to say</option>
                        </Form.Select>
                    </Form.Group>

                    <input type="submit" id="form_button" value="SUBMIT" />



                </Form>

            </div>
        </>

    );
}
export default EditPersonalInfo;