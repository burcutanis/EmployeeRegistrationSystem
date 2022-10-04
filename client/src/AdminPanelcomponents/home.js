import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from './Navbar';
import './home.css'


function Home() {

    return (
        <>
            <Navbarfnc />
            <div className="style" >
                <h1 className="text-center mb-4 bigHeading">Welcome to Employee Registration System</h1>

            </div >
        </>


    );
}
export default Home;