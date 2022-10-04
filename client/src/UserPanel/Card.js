import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Card, Form, Table, Row, Col } from 'react-bootstrap';
import Navbarfnc from './NavbarUser';
import './userHome.css';

const CardFunction = ({ index }) => {
    const [openPositions, setOpenPositions] = useState([]);
    const [explanation, setExplanation] = useState("");
    const [openPosition, setOpenPosition] = useState("");
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get('http://localhost:4000/openPosition');
            setOpenPositions(result.data);
            //console.log(result.data);
        }
        FetchData();
    }, []
    );

    useEffect(() => {
        const position = () => {
            openPositions.map((pos, i) => {
                if (index === i) {
                    //console.log(pos.explanation);
                    setExplanation(pos.explanation);
                    setOpenPosition(pos.positionName);

                }
            })
        }
        position();
    },
    );

    let exArray = [];
    if (explanation) {
        exArray = explanation.split("\n");
    }
    console.log(exArray);
    console.log(index);
    return (
        <Card>
            <h4>{openPosition}</h4>
            {exArray.map((ex, i) => (
                <td>{ex}</td>
            ))
            }
        </Card>
    )
}

export default CardFunction;