import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../NavbarUser';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { CDBNavItem } from 'cdbreact';

function UserDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [personid, setpersonId] = React.useState("");
    const [id, setId] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [date, setDate] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [singleFile, setSingleFile] = useState("");
    const [coverLetter, setCoverLetter] = useState("");

    const [otherFile, setOtherFile] = useState("");
    const [loading, setLoading] = React.useState(true);
    const [deleted, setDelete] = React.useState(false);
    const userId = searchParams.get("userId");



    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/userGeneralInfo/userId/${searchParams.get("userId")}`);
            //  console.log(result.data);

            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setpersonId(result.data[0].userId)
            setDate(result.data[0].date)
            setStatus(result.data[0].status)
            setId(result.data[0].id)
            setPosition(result.data[0].position)
            //  console.log(result.data);
            setLoading(false);
        }
        FetchData();
    },
    )



    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/file/${userId}`);
            setSingleFile(result.data[0]);
            // console.log(singleFile);
            // console.log(result.data);
        }
        FetchData();

    },
    )





    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/coverLetter/${userId}`);
            setCoverLetter(result.data[0]);
            //console.log(result.data);
        }
        FetchData();

    }, []
    )



    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/otherFiles/${userId}`);
            setOtherFile(result.data[0]);
            // console.log(result.data);

        }
        FetchData();


    }, []
    )




    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }


    const cvLink = importAll(require.context('../../../../server/files', false, /\.(png|jpe?g|svg|pdf)$/));


    const navigate = useNavigate();

    const personalInformation = (id) => {
        navigate({
            pathname: '/userAppPersonalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const education = (id) => {
        navigate({
            pathname: '/userAppEducation',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const experience = (id) => {
        navigate({
            pathname: '/userAppExperience',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const additionalInfo = (id) => {
        navigate({
            pathname: '/userAppAdditionalInfo',
            search: createSearchParams({
                userId: userId
            }).toString()

        })
    };

    const UpdateUser = (id) => {
        navigate({
            pathname: '/editUserInfo',
            search: createSearchParams({
                id: id,
                status: status
            }).toString()
        })
    };

    const ChangeCV = (id) => {
        navigate({
            pathname: '/changeCV',
            search: createSearchParams({
                id: id,
            }).toString()
        })
    };

    const submit = () => {

        confirmAlert({
            title: 'Delete the application',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => remove(id)
                },
                {
                    label: 'No',

                }
            ]
        });
    }

    console.log(personid);
    const remove = async () => {
        var res = await axios.delete(`http://localhost:4000/userGeneralInfo/${personid}`)
        console.log(res);
        console.log(res.data);
        console.log("removed general info")
        setName("")
        setSurname("")
        setpersonId("")
        setDate("")
        setStatus("")
        setId("")
        setCoverLetter("")
        setOtherFile("")
        setSingleFile("")
        setEmail("")
        console.log(personid);
        try {
            var res2 = await axios.delete(`http://localhost:4000/userPersonalInformation/${personid}`)
            console.log(res2.data);

        }
        catch (err) {
            console.log("Delete userPersonalInformation error")

        }
        try {
            var res4 = await axios.delete(`http://localhost:4000/userExperience/${personid}`)
            console.log(res4.data);

        }
        catch (err) {
            console.log("Delete userExperience error")

        }
        try {
            var res3 = await axios.delete(`http://localhost:4000/userEducation/${personid}`)
            console.log(res3.data);

        }
        catch (err) {
            console.log("Delete userEducation error")

        }
        try {
            var res5 = await axios.delete(`http://localhost:4000/userExperienceItem/${personid}`)
            console.log(res5.data);

        }
        catch (err) {
            console.log("Delete userExperienceItem error")

        }
        try {
            var res6 = await axios.delete(`http://localhost:4000/file/${personid}`)
            console.log(res6.data);

        }
        catch (err) {
            console.log("Delete CV error")

        }
        try {
            var res7 = await axios.delete(` http://localhost:4000/coverLetter/${personid}`)
            console.log(res7.data);

        }
        catch (err) {
            console.log("Delete Cover letter error")
        }
        try {
            var res7 = await axios.delete(`http://localhost:4000/otherFiles/${personid}`)
            console.log(res7.data);

        }
        catch (err) {
            console.log("Delete Other File error")
        }
        setDelete(true);





    }

    if (loading) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Loading...</h1>

                </div>
            </>
        )
    }

    if (deleted) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Your application was deleted</h1>

                </div>
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
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this, personid)}>Additional Informations</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Container>
                        {status === "new" ?
                            <Button className="deleteAppButton" variant="danger" disabled={(status === "new") ? false : true} onClick={submit}>Delete the application</Button>
                            : ""}
                        < table className='userDetailTable'>
                            <tbody>
                                <tr>
                                    <td colSpan={3}>
                                        {status === "new" ?
                                            <Button variant="outline-dark" className="editForm"
                                                disabled={(status === "new") ? false : true}

                                                onClick={UpdateUser.bind(this, id)}>
                                                Edit the form
                                            </Button>
                                            : ""}
                                        <h1 className="text-center mb-4">User Detail</h1>

                                    </td>


                                </tr>
                                <tr>
                                    <td className="details-td">

                                        <>
                                            <div className="label">Name</div> :{" "}
                                            <div className="phone">{name} {surname}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Email</div> :{" "}
                                            <div className="phone">{email}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Date of your application</div> :{" "}
                                            <div className="phone">{date}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Status of your application</div> :{" "}
                                            <div className="phone">{status}</div>


                                        </>
                                        <br />
                                        <>
                                            <div className="label">Position you apply</div> :{" "}
                                            <div className="mobile">{position}</div>


                                        </>
                                        <br />
                                        <div>
                                            {singleFile ?
                                                <>
                                                    <a
                                                        href={cvLink[singleFile.filePath]}
                                                        download
                                                    >
                                                        Download your CV
                                                    </a>

                                                </>
                                                :
                                                ""
                                            }

                                        </div>

                                        <div>
                                            {coverLetter ?
                                                <a
                                                    href={cvLink[coverLetter.filePath]}
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
                    </Container>
                </Col>





            </Row>
        </>





    )
}
export default UserDetail;
