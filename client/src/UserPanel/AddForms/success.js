import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import './add.css'

function Success(props) {


    return (

        <>
            <Navbarfnc />
            <table style={{ position: "relative", left: "255px", top: "100px", margin: "0 0 100px 0" }}>
                <tbody>
                    <h1>Your application was submitted</h1>



                </tbody>
            </table>

        </>


    )

}

export default Success;