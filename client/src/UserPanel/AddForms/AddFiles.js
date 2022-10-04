import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import './add.css'


function Add(props) {

    const continuefnc = (e) => {
        e.preventDefault();
        if (singleFile) {
            props.nextStep();
        }
        else {
            alert("You have to upload your CV")
        }

    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    const removeCV = () => {
        removeFile();
    };

    const removeCL = () => {
        removeCoverLetter();
    };

    const removeOther = () => {
        removeOtherFile();
    };

    const { singleFile, SingleFileChange, removeFile, coverLetter,
        coverLetterChange, removeCoverLetter,
        otherFile, otherFileChange, removeOtherFile
    } = props;
    return (

        <>
            <Navbarfnc />

            <div id="container">
                <header className="head-form">
                    <h1>• Upload your Files •</h1>
                    <p> You can only upload documents with .pdf or .docx extensions   </p>
                    <div className="underline"></div>
                </header>

                <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="form-group">
                            <label><h6 style={{
                                fontWeight: "bold",
                            }}>Select CV * </h6>  </label>
                            <input type="file" className="form-control"
                                Accept=".pdf, .docx"
                                onChange={(e) => SingleFileChange(e)} />
                        </div>

                        <Button
                            color="secondary"
                            variant="outline"
                            onClick={removeCV.bind(this)}
                            style={{
                                position: "relative",
                                left: "500px",
                                bottom: "40px"
                            }}
                        >Remove file</Button>
                        {singleFile ? <h6 style={{
                            fontWeight: "bold",
                            position: "relative",
                            bottom: "30px",
                            left: "100px"

                        }}>File selected</h6> : ""}



                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="form-group">
                            <label><h6 style={{
                                fontWeight: "bold",
                            }}>Select Cover Letter</h6>  </label>
                            <input type="file" className="form-control"
                                Accept=".pdf, .docx"
                                onChange={(e) => coverLetterChange(e)} />
                        </div>

                        <Button
                            color="secondary"
                            variant="outline"
                            onClick={removeCL.bind(this)}
                            style={{
                                position: "relative",
                                left: "500px",
                                bottom: "40px"
                            }}
                        >Remove file</Button>

                        {coverLetter ? <h6 style={{
                            fontWeight: "bold",
                            position: "relative",
                            bottom: "30px",
                            left: "100px"

                        }}>File selected</h6> : ""}



                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="form-group">
                            <label><h6 style={{
                                fontWeight: "bold",
                            }}>Select Other Files</h6>  </label>
                            <p>If you want to upload another file according to your application, please upload here.</p>
                            <input type="file" className="form-control"
                                Accept=".pdf, .docx"
                                onChange={(e) => otherFileChange(e)} />
                        </div>

                        <Button
                            color="secondary"
                            variant="outline"
                            onClick={removeOtherFile.bind(this)}
                            style={{
                                position: "relative",
                                left: "500px",
                                bottom: "40px"
                            }}
                        >Remove file</Button>
                        {otherFile ? <h6 style={{
                            fontWeight: "bold",
                            position: "relative",
                            bottom: "30px",
                            left: "100px"

                        }}>File selected</h6> : ""}


                        <div className="row">
                            <p> Please fill all the necessary fields with *.</p>
                        </div>
                    </div>
                </div>

                <Button
                    color="secondary"
                    variant="outline-danger"
                    id="form_button"
                    onClick={back}
                    style={{
                        position: "relative",
                        left: "160px",
                        width: "200px",
                        margin: "0 0 100px 0",
                        top: "40px"
                    }}
                >Back</Button>
                <Button
                    color="primary"
                    variant="outline-success"
                    id="form_button"
                    onClick={continuefnc}
                    style={{
                        position: "relative",
                        left: "180px",
                        width: "200px",
                        margin: "0 0 100px 0",
                        top: "40px"
                    }}
                >Continue</Button>


            </div>



        </>


    )

}

export default Add;