import React, { Fragment, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbarfnc from '../Navbar';


function EditExperience() {
    const [searchParams] = useSearchParams();
    const [additionalInfo, setAdditionalInfo] = React.useState("");
    const isAdditionalExist = searchParams.get("additionalInfo");
    console.log(isAdditionalExist);
    const userId = searchParams.get("id");
    const [loading, setLoading] = React.useState(true);


    const [id, setId] = React.useState("");


    useEffect(() => {
        const FetchData = async () => {

            const result = await axios.get(`http://localhost:4000/adminAdditionalInfo/user/${userId}`);
            //console.log(result.data);
            setAdditionalInfo(result.data[0].additional);
            setId(result.data[0].id);

        }
        FetchData();

    }, []
    )
    const navigate = useNavigate();

    const onAdditionalChanged = e => setAdditionalInfo(e.target.value)




    function updateUser() {

        axios.put(`http://localhost:4000/adminAdditionalInfo/${id}`, {
            "additional": additionalInfo
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setAdditionalInfo(additionalInfo)

            });


    }


    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser();
        navigate({
            pathname: '/adminAdditionalInfo',
            search: createSearchParams({
                id: searchParams.get("id"),
            }).toString()

        })
    };





    return (
        <>
            <Navbarfnc />
            <div id="container">
                <h1>• Admin Edit Additional Informations  •</h1>
                <div className="underline"></div>
                <Form onSubmit={onSubmit} >

                    <Form.Group className="mb-3" style={{ margin: "50px 0" }} >
                        <Form.Label> <span><h6>Additional Informations </h6> </span> </Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea" rows={3}
                            placeholder="You can add additional informations about the employee"
                            name="additional"
                            value={additionalInfo}
                            onChange={onAdditionalChanged}
                        />
                    </Form.Group>

                    <input type="submit" variant="outline-danger" value="SUBMIT" />

                </Form>


            </div>
        </>

    );
}
export default EditExperience;