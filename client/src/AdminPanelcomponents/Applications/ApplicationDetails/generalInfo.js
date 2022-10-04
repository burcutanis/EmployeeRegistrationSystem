import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../../Navbar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [personid, setpersonId] = React.useState("");
    const [id, setId] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [singleFile, setSingleFile] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [otherFile, setOtherFile] = useState("");
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setpersonId(result.data[0].userId)
            setId(result.data[0].id)
            setStatus(result.data[0].status)
            setPosition(result.data[0].position)
            setLoading(false)

            console.log(result.data);
        }
        FetchData();
    }, [status.value]
    )

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/file/${searchParams.get("id")}`);
            setSingleFile(result.data[0]);
            console.log(singleFile);
            console.log(result.data);
        }
        FetchData();

    }, []
    )




    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/coverLetter/${searchParams.get("id")}`);
            setCoverLetter(result.data[0]);
            console.log(result.data);
        }
        FetchData();

    }, []
    )


    useEffect(() => {

        const FetchData = async () => {
            const currentUserId = localStorage.getItem("userId");
            const result = await axios.get(`http://localhost:4000/otherFiles/${searchParams.get("id")}`);
            setOtherFile(result.data[0]);
            console.log(result.data);

        }
        FetchData();


    }, []
    )








    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }



    const navigate = useNavigate();

    const onChange = e => setStatus(e.target.value)


    const personalInformation = (id) => {
        navigate({
            pathname: '/applicationDetailsPersonalInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const education = (id) => {
        navigate({
            pathname: '/applicationDetailsEducation',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const experience = (id) => {
        navigate({
            pathname: '/applicationDetailsExperience',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };
    const additional = (id) => {
        navigate({
            pathname: '/applicationDetailsAdditional',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };





    const changeStatus = () => {
        console.log(status);
        axios.put(`http://localhost:4000/userGeneralInfo/${id}`, { "status": status })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("update");
                setStatus(status);
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            if (status === "accepted") {
                confirmAlert({
                    title: 'Change status to Accepted',
                    message: 'If you change status to accepted, an email will be send to the applicant to inform him/her. Are you sure to do this?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                const { data } = await axios.post(
                                    "/status/sendAccepted",
                                    { email, name },
                                    config
                                );
                                setSuccess(data.data);
                                changeStatus();
                                navigate({
                                    pathname: `/${status}Applications`,
                                })
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => alert('Click No')
                        }
                    ]
                });
            }
            if (status === "rejected") {
                confirmAlert({
                    title: 'Change status to Rejected',
                    message: 'If you change status to rejected, an email will be send to the applicant to inform him/her. Are you sure to do this?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                const { data } = await axios.post(
                                    "/status/sendRejected",
                                    { email, name },
                                    config
                                );
                                setSuccess(data.data);
                                changeStatus();
                                navigate({
                                    pathname: `/${status}Applications`,
                                })
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => alert('Click No')
                        }
                    ]
                });

            }
            if (status === "arrangeInterview") {
                confirmAlert({
                    title: 'Change status to Arrange Interview',
                    message: 'If you change status to arrange interview, an email will be send to the applicant to inform him/her. Are you sure to do this?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                const { data } = await axios.post(
                                    "/status/sendArrangeInterview",
                                    { email, name },
                                    config
                                );
                                setSuccess(data.data);
                                changeStatus();
                                navigate({
                                    pathname: `/${status}Applications`,
                                })
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => alert('Click No')
                        }
                    ]
                });

            }
            if (status === "new" || status === "underEvaluation") {
                changeStatus();
                navigate({
                    pathname: `/${status}Applications`,
                })
            }
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    };


    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const cvLink = importAll(require.context('../../../../../server/files', false, /\.(png|jpe?g|svg|pdf)$/));



    if (loading) {
        return (
            <>
                <Navbarfnc />
                <h1 className="text-center mb-4">Loading...</h1>
            </>

        )
    }



    return (
        <>
            <Navbarfnc />
            <Row>
                <Col xs={2} md={2} lg={2}>
                    <Nav variant="tabs" className="col-md-12 d-none d-md-block bg-light sidebar"
                        activeKey="/home"
                    >
                        <div className="sidebar-sticky"></div>
                        <Nav.Item className="sidebar-item">
                            <Nav.Link href="/home" disabled >User Detail</Nav.Link>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={personalInformation.bind(this, personid)} >Personal Information</Button>
                        </Nav.Item >
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={education.bind(this, personid)} >Education</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={experience.bind(this, personid)} >Experiences</Button>
                        </Nav.Item>
                        <Nav.Item className="sidebar-item">
                            <Button className="navbarButton" variant="outline" onClick={additional.bind(this, searchParams.get("id"))}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        <table className='userDetailTable'>
                            <tbody>



                                <tr>
                                    <td colSpan={3}>
                                        <h1 className="text-center mb-4">Application Detail</h1>


                                    </td>


                                </tr>
                                <tr>
                                    <td className="details-td">

                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="divField">{name} {surname}</div>

                                        </>
                                        <br />
                                        <>
                                            <div className="label">Email</div> :{" "}
                                            <div className="divField">{email}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Status</div> :{" "}
                                            <div className="divField">{status}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Position</div> :{" "}
                                            <div className="divField">{position}</div>


                                        </>

                                        <div>
                                            {singleFile ?
                                                <a
                                                    href={cvLink[singleFile.filePath]}
                                                    download
                                                >
                                                    Download your CV
                                                </a>
                                                : ""
                                            }
                                        </div>

                                        <div>
                                            {coverLetter ?
                                                <a
                                                    href={coverLetter ? cvLink[coverLetter.filePath] : ""}
                                                    download
                                                >
                                                    Download your Cover Letter
                                                </a>
                                                :
                                                ""}
                                        </div>

                                        <div>
                                            {otherFile ?
                                                <a
                                                    href={cvLink[otherFile.filePath]}
                                                    download
                                                >
                                                    Download your Other File
                                                </a>
                                                :
                                                ""}
                                        </div>






                                    </td>



                                </tr>

                            </tbody>
                        </table>
                        <br />

                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Change the job application status</Form.Label>
                                <Form.Select aria-label="Default select example" value={status} name="maritalStatus" required="true" onChange={onChange} placeholder="Enter your maritalStatus" >
                                    <option value=""></option>
                                    <option value={"new"}>New</option>
                                    <option value={"underEvaluation"}>Under Evaluation </option>
                                    <option value={"arrangeInterview"}>Arrange Interview</option>
                                    <option value={"rejected"}>Rejected</option>
                                    <option value={"accepted"}>Accepted</option>


                                </Form.Select>
                            </Form.Group>

                            <input type="submit" id="form_button" value="Change Status" />

                        </Form>
                        {error && <span className="error-message">{error}</span>}
                        {success && <span className="success-message">{success}</span>}
                    </Container>
                </Col>





            </Row>
        </>





    )
}
export default UserDetail;

