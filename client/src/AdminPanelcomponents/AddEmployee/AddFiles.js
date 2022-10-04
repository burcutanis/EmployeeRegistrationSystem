import React from 'react';
import { Button } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import './Add.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




function Add(props) {


    const continuefnc = (e) => {
        e.preventDefault();
        if (CV) {
            props.nextStep();
        }
        else {
            confirmAlert({
                title: 'Upload CV',
                message: 'You have to upload the CV to continue',
                buttons: [
                    {
                        label: 'Ok',

                    },

                ]
            });
        }

    };


    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    const { CV, CVChange, removeCV, coverLetter,
        coverLetterChange, removeCoverLetter,
        otherFile, otherFileChange, removeOtherFile
    } = props;


    return (

        <>
            <Navbarfnc />

            <div id="container">


                <header className="head-form">
                    <h1>• Upload the Files •</h1>
                    <p> You can only upload documents with .pdf or .docx extensions   </p>
                    <div className="underline"></div>
                </header>


                <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="form-group">
                            <label><h6 style={{
                                fontWeight: "bold",
                            }}>Select the CV * </h6>  </label>
                            <input type="file" className="form-control"
                                Accept=".pdf, .docx"
                                onChange={(e) => CVChange(e)} />
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
                        {CV ? <h6 style={{
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
                            onClick={removeCoverLetter.bind(this)}
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