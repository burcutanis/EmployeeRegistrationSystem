import React from 'react';

import Navbarfnc from '../Navbar';
import './Add.css'

function Success() {

    return (

        <>
            <Navbarfnc />
            <table style={{ position: "relative", left: "255px", top: "100px", margin: "0 0 100px 0" }}>
                <tbody>
                    <h1>Employee was added to database</h1>



                </tbody>
            </table>

        </>


    )

}

export default Success;