import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Profile(props) {
    const [singleFile, setSingleFile] = useState('');
    const [cv, setCV] = useState({});
    const [singleProgress, setSingleProgress] = useState(0);
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");



    console.log(userId);

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/file/${userId}`);
            setCV(result.data[0])
            // console.log(result.data);
            setLoading(false);
        }

        FetchData();


    },
    )
    useEffect(() => {
        const FetchData = async () => {
            const currentEmail = localStorage.getItem("currentEmail");
            if (currentEmail) setEmail(currentEmail)
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/user/${email}`);
            console.log(result.data);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            // console.log(result.data);
        }
        FetchData();
    },
    )





    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }


    const deleteImage = async () => {
        try {
            await axios.delete(`http://localhost:4000/file/${userId}`);

            setCV("");
            props.getsingle();
        } catch (error) {
            throw error;
        }
    }


    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        formData.append('userId', userId);
        try {
            await axios.post('http://localhost:4000/file', formData, singleFileOptions);
        } catch (error) {
            throw error;
        }
        props.getsingle();
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../../../server/files', false, /\.(png|jpe?g|svg|pdf)$/));


    return (
        <>
            <Navbarfnc />
            <Row>
                <Col lg={4} sm={4} md={4}>

                </Col>
                <Col lg={6} sm={6} md={6} >
                    <div id="container" style={{
                        position: "relative",
                        right: "100px",
                        top: "50px"
                    }}>
                        <h1>• CV •</h1>
                        <div className="underline"></div>
                        <div className="row mt-3">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <div className="form-group">
                                    <label>Select Single File</label>
                                    <input type="file"
                                        className="form-control" onChange={(e) => SingleFileChange(e)} />
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <button type="button" className="btn btn-danger"
                                            style={{
                                                margin: "10px 10px 10px 120px",
                                                width: "200px"
                                            }} onClick={() => uploadSingleFile()} >Upload</button>
                                    </div>
                                    <div className="col-2">
                                        <CircularProgressbar
                                            value={singleProgress}
                                            text={`${singleProgress} % `}
                                            styles={buildStyles({
                                                rotation: 0.25,
                                                strokeLinecap: 'butt',
                                                textSize: '16px',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div>


                        <div className="container">

                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" style={{
                                position: "relative",
                                left: "55px",

                            }}>
                                <div className="our-team2">
                                    {cv ?
                                        <a
                                            href={images[cv.filePath]}
                                            download
                                        >
                                            Download your CV
                                        </a>
                                        :
                                        "You don't submit your CV yet"
                                    }
                                </div>

                                {cv ?
                                    <Button className="deleteEmpButton" style={{
                                        width: "200px",
                                        position: "relative",
                                        left: "45px",
                                        bottom: "70px"

                                    }}
                                        variant="danger" onClick={deleteImage.bind(this)}>Delete your CV </Button>
                                    : ""
                                }
                            </div>


                        </div>
                    </div>
                </Col>
            </Row>
        </>


    )
}
export default Profile;
/*     <div className="container">

                        <div className="col-12 col-sm-6 col-md-6 col-lg-6" style={{
                            position: "relative",
                            left: "100px",
                            top: "50px"
                        }}>
                            <div className="our-team">




                                <div className="team-content">
                                    <h3 className="name">{name} {surname}</h3>
                                    <br />

                                </div>
                                {cv ?
                                    <a
                                        href={images[cv.filePath]}
                                        download
                                    >
                                        Download your CV
                                    </a>
                                    :
                                    ""
                                }
                            </div>

                            <Button className="deleteEmpButton" style={{
                                width: "200px",
                                position: "relative",
                                left: "20px",
                                bottom: "80px"

                            }}
                                variant="danger" onClick={deleteImage.bind(this)}>Delete your CV </Button>
                        </div>


                    </div>*/