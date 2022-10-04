import React, { Fragment, useEffect, useState } from 'react';
import Employee from './Employee';
import './Employees.css';
import axios from 'axios';
import Navbarfnc from './Navbar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function Employees() {
    const [emp, setEmp] = useState([]);


    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/employee');
            setEmp(result.data);
            // console.log(result.data);
        }
        FetchData();
    }, []
    );


    const remove = async (id, i, email) => {
        var res = await axios.delete(`http://localhost:4000/employee/${id}`)
        console.log(res);
        console.log(res.data);
        console.log("removed")
        try {
            var res2 = await axios.delete(`http://localhost:4000/personalInformation/${id}`)
            console.log(res2.data);

        }
        catch (err) {
            console.log("Delete userPersonalInformation error")

        }
        try {
            var res4 = await axios.delete(`http://localhost:4000/experience/${id}`)
            console.log(res4.data);

        }
        catch (err) {
            console.log("Delete experience error")

        }
        try {
            var res3 = await axios.delete(`http://localhost:4000/education/${id}`)
            console.log(res3.data);

        }
        catch (err) {
            console.log("Delete Education error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/experienceItem/${id}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete ExperienceItem error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/employeeOther/${id}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete Other File error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/employeeCoverLetter/${id}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete Cover Letter error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/employeeCV/${id}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete CV error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/adminAdditionalInfo/${id}`)
            console.log(res5.data);


        }
        catch (err) {
            console.log("Delete Additional Info error")

        }

        let newEmpList = [...emp];
        newEmpList.splice(i, 1);
        setEmp(newEmpList)

        try {
            axios.put(`http://localhost:4000/userGeneralInfo/emailput/${email}/${"employee"}`,
                {
                    "status": "not employee",

                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log("update");


                });

        }
        catch (err) {
            console.log("Not put status to not employee error")

        }




    }

    const submit = (id, i, email) => {
        confirmAlert({
            title: 'Delete the employee',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => remove(id, i, email)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }


    return (

        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4">Employee List</h1>
                <div className="employee">
                    <Employee
                        employeeList={emp}
                        remove={submit} />

                </div >
            </div></>


    );
}
export default Employees;