import React, { Component } from 'react';
import FormUserGeneral from './AddApplication';
import FormUserPersonal from './AddUserPersonalInfo';
import FormUserExperience from './AddUserExperience';
import FormUserEducation from './AddUserEducation';
import FormUserExperienceItem from './AddUserExperienceItem';
import AddAdditional from './AddAdditional';
import Confirm from './confirm';
import Success from './success';
import FormFiles from './AddFiles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import './add.css'

function UserForm() {
    const [searchParams] = useSearchParams();
    const isAuthenticated = searchParams.get("isAuthenticated");
    const params = useParams();
    console.log(params.positionName);
    const positionName = params.positionName;
    const [step, setStep] = React.useState(1);
    const [emp, setEmployee] = React.useState({
        name: "", surname: "", position: positionName
    },
    );

    const [personalInfo, setPersonalInfo] = React.useState({
        maritalStatus: "", address: "", city: "", mobile: "", gender: "",
    },
    );





    const [educations, setEducations] = React.useState([{
        highestQualification: "", specialization: "", universityName: "",
        endYear: "", startYear: "", continueBool: false
    }]
    );



    const [experience, setExperience] = React.useState({
        currentStatus: "", skills: ""
    },
    );

    const [experienceItems, setExperienceItems] = React.useState([{
        companyName: "", endYear: "", statusInCompany: "",
        industry: "", startYear: "", area: "",
        continue: false
    }]
    );

    const [additionalInfo, setAdditionalInfo] = React.useState({
        additional: ""
    }
    );


    const [singleFile, setSingleFile] = React.useState('');
    const [singleProgress, setSingleProgress] = React.useState(0);
    const [coverLetter, setCoverLetter] = React.useState('');
    const [otherFile, setOther] = React.useState('');



    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input) => e => {
        setEmployee({ ...emp, [input]: e.target.value });
        //input(e.target.value);
    };

    const handleChange2 = (input) => e => {
        setPersonalInfo({ ...personalInfo, [input]: e.target.value });

    };

    const handleChange3 = (i, e) => {
        let newEducationValues = [...educations];
        if (e.target.name === "continueBool") {
            if (newEducationValues[i][e.target.name] == true) {
                newEducationValues[i][e.target.name] = false
            }
            else {
                newEducationValues[i][e.target.name] = true
            }
        }
        else {
            newEducationValues[i][e.target.name] = e.target.value;
        }
        setEducations(newEducationValues);
    };

    let addEducationFields = () => {
        setEducations([...educations, {
            highestQualification: "", specialization: "", universityName: "",
            endYear: "", startYear: "", continueBool: false
        }])
    }

    let removeEducationFields = (i) => {
        let newEducationValues = [...educations];
        newEducationValues.splice(i, 1);
        setEducations(newEducationValues)
    }




    const handleChange4 = (input) => e => {
        setExperience({ ...experience, [e.target.name]: e.target.value });
        //input(e.target.value);
    };



    const handleChange5 = (i, e) => {
        let newExperienceValues = [...experienceItems];
        if (e.target.name === "continue") {
            if (newExperienceValues[i][e.target.name] == true) {
                newExperienceValues[i][e.target.name] = false
            }
            else {
                newExperienceValues[i][e.target.name] = true
            }
        }
        else {
            newExperienceValues[i][e.target.name] = e.target.value;
        }
        setExperienceItems(newExperienceValues);

    };

    let addExperienceFields = () => {
        setExperienceItems([...experienceItems, {
            companyName: "", endYear: "", statusInCompany: "",
            industry: "", startYear: "", area: "", yearsOfExperience: "", continue: false
        }])
    }



    let removeExFields = (i) => {
        let newExValues = [...experienceItems];
        newExValues.splice(i, 1);
        setExperienceItems(newExValues)
    }





    const [birthDate, setDate] = React.useState(new Date());

    function ChangeDate(date) {
        setDate(date);
    };


    const handleChange6 = (input) => e => {
        setAdditionalInfo({ ...additionalInfo, [input]: e.target.value });
        //input(e.target.value);
    };







    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);

    }

    const coverLetterChange = (e) => {
        setCoverLetter(e.target.files[0]);

    }

    const otherFileChange = (e) => {
        setOther(e.target.files[0]);
    }

    const removeFile = (e) => {
        setSingleFile('');
    }

    const removeCoverLetter = (e) => {
        setCoverLetter('');

    }
    const removeOtherFile = (e) => {
        setOther('');
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }








    const values = { emp };
    const values2 = { personalInfo };
    const values3 = { educations };
    const values4 = { experience };
    const values5 = { experienceItems };



    switch (step) {
        case 1:
            return (
                <FormUserGeneral
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 2:
            return (
                <FormUserPersonal
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange2}
                    values={values2}
                    ChangeDate={ChangeDate}
                    birthDate={birthDate}
                />
            );
        case 3:
            return (
                <FormUserEducation
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange3}
                    values={values3}
                    addEducationFields={addEducationFields}
                    removeEducationFields={removeEducationFields}
                />
            );
        case 4:
            return (
                <FormUserExperience
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange4}
                    values={values4}
                />
            );
        case 5:
            return (
                <FormUserExperienceItem
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange5}
                    values={values5}
                    addExperienceFields={addExperienceFields}
                    removeExFields={removeExFields}
                />
            );

        case 6:
            return (
                <FormFiles
                    nextStep={nextStep}
                    prevStep={prevStep}
                    singleFile={singleFile}
                    SingleFileChange={SingleFileChange}
                    removeFile={removeFile}
                    coverLetter={coverLetter}
                    coverLetterChange={coverLetterChange}
                    removeCoverLetter={removeCoverLetter}
                    otherFile={otherFile}
                    otherFileChange={otherFileChange}
                    removeOtherFile={removeOtherFile}
                />
            );

        case 7:
            return (
                <AddAdditional
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange6}
                    additionalInfo={additionalInfo}
                />
            );

        case 8:
            return (
                <Confirm
                    nextStep={nextStep}
                    prevStep={prevStep}
                    emp={emp}
                    personalInfo={personalInfo}
                    educations={educations}
                    experience={experience}
                    experienceItems={experienceItems}
                    singleFile={singleFile}
                    singleFileOptions={singleFileOptions}
                    coverLetter={coverLetter}
                    birthDate={birthDate}
                    otherFile={otherFile}
                    additionalInfo={additionalInfo}

                />
            );

        case 9:
            return <Success />;
        default:
            (console.log('Form with pages'))
    }




}

export default UserForm;



