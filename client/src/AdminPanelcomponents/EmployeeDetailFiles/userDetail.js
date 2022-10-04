import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './userDetail.css';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { Container, Nav, Row, Col, Form, Button } from 'react-bootstrap';
import Navbarfnc from '../Navbar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function EmployeeDetail() {
    const [searchParams] = useSearchParams();
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [personid, setpersonId] = React.useState("");
    const [id, setId] = React.useState("");
    const [groupName, setGroupName] = React.useState("");
    const [titleName, setTitleName] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [singleFile, setSingleFile] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [otherFile, setOtherFile] = useState("");



    useEffect(() => {
        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employee/user/${searchParams.get("id")}`);
            setName(result.data[0].name)
            setSurname(result.data[0].surname)
            setEmail(result.data[0].email)
            setpersonId(result.data[0].userId)
            setId(result.data[0].id)
            setGroupName(result.data[0].group)
            setTitleName(result.data[0].title)
            setStartDate(result.data[0].startDate)
            //console.log(result.data);
            setLoading(false);
        }
        FetchData();
    },
    )

    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employeeCV/${searchParams.get("id")}`);
            setSingleFile(result.data[0]);
            //console.log(singleFile);
            //console.log(result.data);
        }
        FetchData();

    }, []
    )




    useEffect(() => {

        const FetchData = async () => {
            const result = await axios.get(`http://localhost:4000/employeeCoverLetter/${searchParams.get("id")}`);
            setCoverLetter(result.data[0]);
            // console.log(result.data);
        }
        FetchData();

    }, []
    )


    useEffect(() => {

        const FetchData = async () => {
            const currentUserId = localStorage.getItem("userId");
            const result = await axios.get(`http://localhost:4000/employeeOther/${searchParams.get("id")}`);
            setOtherFile(result.data[0]);
            //console.log(result.data);

        }
        FetchData();


    }, []
    )






    const remove2 = async (id) => {
        var res = await axios.delete(`http://localhost:4000/employee/${id}`)
        console.log(res);
        console.log(res.data);
        console.log("removed")
        setName("")
        setSurname("")
        setEmail("")
        setpersonId("")
        setId("")
        setGroupName("")
        setTitleName("")
        setOtherFile("")
        setCoverLetter("")
        setSingleFile("")
        setStartDate("")
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

        navigate({
            pathname: '/employees',
        })
    }

    const submit = (id) => {
        confirmAlert({
            title: 'Delete the employee',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => remove2(id)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });

    }


    const navigate = useNavigate();

    const personalInformation = (id) => {
        navigate({
            pathname: '/personalInformation',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const education = (id) => {
        navigate({
            pathname: '/education',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const experience = (id) => {
        navigate({
            pathname: '/experience',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const additionalInfo = (id) => {
        navigate({
            pathname: '/adminAdditionalInfo',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    const UpdateUser = (id) => {
        navigate({
            pathname: '/edit',
            search: createSearchParams({
                id: id
            }).toString()
        })
    };

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const cvLink = importAll(require.context('../../../../server/files', false, /\.(png|jpe?g|svg|pdf)$/));


    if (loading) {
        return (
            <>
                <Navbarfnc />
                <div className="style" >
                    <h1 className="text-center mb-4">Loading...</h1>
                </div></>

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
                            <Nav.Link href="/home" disabled >General Information</Nav.Link>
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
                            <Button className="navbarButton" variant="outline" onClick={additionalInfo.bind(this, searchParams.get("id"))} >Additional Info</Button>
                        </Nav.Item>


                    </Nav>
                </Col>


                <Col>
                    <Row>
                        <Container>

                            <table className='userDetailTable'>
                                <tbody>

                                    <tr>
                                        <td colSpan={3}>
                                            <Button variant="outline-secondary" className="editForm" onClick={UpdateUser.bind(this, id)}>
                                                Edit the form
                                            </Button>
                                            <h1 className="text-center mb-4">General Employee Information</h1>


                                        </td>


                                    </tr>
                                    <tr>
                                        <td className="details-td">

                                            <>
                                                <div className="label">Name</div> :{" "}
                                                <div className="divFields">{name} {surname}</div>
                                            </>
                                            <br />
                                            <>
                                                <div className="label">Email</div> :{" "}
                                                <div className="divFields">{email}</div>
                                            </>
                                            <br />
                                            <>
                                                <div className="label">Group</div> :{" "}
                                                <div className="divFields">{groupName}</div>

                                            </>
                                            <br />
                                            < >

                                                <div className="label">Title</div> :{" "}
                                                <div className="divFields">{titleName}</div>

                                            </>
                                            <br />
                                            < >

                                                <div className="label">Start Date</div> :{" "}
                                                <div className="divFields">{startDate}</div>

                                            </>
                                            <br />
                                            <div>
                                                {singleFile ?
                                                    <a
                                                        href={cvLink[singleFile.filePath]}
                                                        download
                                                    >
                                                        Download the CV
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
                                                        Download the Cover Letter
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
                                                        Download the Other File
                                                    </a>
                                                    :
                                                    ""}
                                            </div>





                                        </td>



                                    </tr>

                                </tbody>
                            </table>



                        </Container>
                    </Row>

                    <Button style={{
                        position: "relative",
                        top: "130px",
                        left: "660px"

                    }} variant="danger" onClick={submit.bind(this, personid)}>Delete the Employee</Button>

                </Col>





            </Row >
        </>





    )
}
export default EmployeeDetail;


