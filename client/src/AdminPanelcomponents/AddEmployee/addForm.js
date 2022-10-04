import React from 'react';
import FormGeneral from './Add';
import FormPersonal from './AddPersonalInfo';
import FormExperience from './AddExperience';
import FormEducation from './AddEducation';
import FormExperienceItem from './AddExperienceItem';
import FormAdditional from './AddAdditional';
import Confirm from './confirm';
import Success from './success';
import FormFiles from './AddFiles';
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from 'react-router-dom';
import './Add.css'


function AddForm() {

    const [step, setStep] = React.useState(1);

    const [emp, setEmployee] = React.useState({
        name: "", surname: "", group: "", title: "", startDate: "", email: ""
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
    const [CV, setCV] = React.useState('');
    const [coverLetter, setCoverLetter] = React.useState('');
    const [otherFile, setOther] = React.useState('');



    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChangeGeneral = (input) => e => {
        setEmployee({ ...emp, [input]: e.target.value });
    };

    const handleChangePersonal = (input) => e => {
        setPersonalInfo({ ...personalInfo, [input]: e.target.value });
    };

    const handleChangeEducation = (i, e) => {
        let newEducationValues = [...educations];
        if (e.target.name === "continueBool") {
            newEducationValues[i][e.target.name] = !newEducationValues[i][e.target.name];
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




    const handleChangeExperience = () => e => {
        setExperience({ ...experience, [e.target.name]: e.target.value });
        //input(e.target.value);
    };



    const handleChangeExperienceItem = (i, e) => {
        let newExperienceValues = [...experienceItems];
        if (e.target.name === "continue") {
            newExperienceValues[i][e.target.name] = !newExperienceValues[i][e.target.name];
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


    const [startDate, setStartDate] = React.useState(new Date());

    function ChangeStartDate(date) {
        setStartDate(date);
    };


    const handleChangeAdditional = (input) => e => {
        setAdditionalInfo({ ...additionalInfo, [input]: e.target.value });
    };


    const CVChange = (e) => {
        setCV(e.target.files[0]);
    }

    const coverLetterChange = (e) => {
        setCoverLetter(e.target.files[0]);
    }

    const otherFileChange = (e) => {
        setOther(e.target.files[0]);
    }

    const removeCV = (e) => {
        setCV('');
    }

    const removeCoverLetter = (e) => {
        setCoverLetter('');

    }
    const removeOtherFile = (e) => {
        setOther('');
    }


    switch (step) {
        case 1:
            return (
                <FormGeneral
                    nextStep={nextStep}
                    handleChange={handleChangeGeneral}
                    emp={emp}
                    ChangeStartDate={ChangeStartDate}
                    startDate={startDate}
                />
            );
        case 2:
            return (
                <FormPersonal
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChangePersonal}
                    personalInfo={personalInfo}
                    ChangeDate={ChangeDate}
                    birthDate={birthDate}
                />
            );
        case 3:
            return (
                <FormEducation
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChangeEducation}
                    educations={educations}
                    addEducationFields={addEducationFields}
                    removeEducationFields={removeEducationFields}
                />
            );
        case 4:
            return (
                <FormExperience
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChangeExperience}
                    experience={experience}
                />
            );
        case 5:
            return (
                <FormExperienceItem
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChangeExperienceItem}
                    experienceItems={experienceItems}
                    addExperienceFields={addExperienceFields}
                    removeExFields={removeExFields}
                />
            );

        case 6:
            return (
                <FormFiles
                    nextStep={nextStep}
                    prevStep={prevStep}
                    CV={CV}
                    CVChange={CVChange}
                    removeCV={removeCV}
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
                <FormAdditional
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChangeAdditional}
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
                    singleFile={CV}
                    coverLetter={coverLetter}
                    birthDate={birthDate}
                    startDate={startDate}
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

export default AddForm;



