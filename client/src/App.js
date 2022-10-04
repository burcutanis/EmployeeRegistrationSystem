import React, { Fragment, useEffect, useState } from 'react';
import './App.css';

//ADMIN PANEL 
import Home from './AdminPanelcomponents/home';
import AdminEmpForm from './AdminPanelcomponents/AddEmployee/addForm';
import Employees from './AdminPanelcomponents/Employees';
import UserDetail from './AdminPanelcomponents/EmployeeDetailFiles/userDetail';
import AddGroup from './AdminPanelcomponents/Groups/AddGroup';
import ListGroup from './AdminPanelcomponents/Groups/ListGroups';
import AddTitle from './AdminPanelcomponents/Titles/AddTitle';
import ListTitle from './AdminPanelcomponents/Titles/ListTitle';
import PersonalInformation from './AdminPanelcomponents/EmployeeDetailFiles/personalInformation';
import Edit from './AdminPanelcomponents/EditFiles/edit';
import EditAdditional from './AdminPanelcomponents/EditFiles/editAdditional';
import EditPersonalInfo from './AdminPanelcomponents/EditFiles/editPersonalInfo';
import EditEducation from './AdminPanelcomponents/EditFiles/editEducation';
import EditExperience from './AdminPanelcomponents/EditFiles/editExperience';
import EditExperienceItem from './AdminPanelcomponents/EditFiles/editExperienceItem';
import ListEmpByGroup from './AdminPanelcomponents/ListEmpByGroup';
import Education from './AdminPanelcomponents/EmployeeDetailFiles/education';
import Experience from './AdminPanelcomponents/EmployeeDetailFiles/experience';
import AdminAdditionalInfo from './AdminPanelcomponents/EmployeeDetailFiles/additionalInfo';
import AdminAddMoreEducation from './AdminPanelcomponents/EmployeeDetailFiles/AddMoreEducation';
import AdminAddMoreExperience from './AdminPanelcomponents/EmployeeDetailFiles/AddMoreExperience';
import NewApplications from './AdminPanelcomponents/Applications/new';
import AcceptedApplications from './AdminPanelcomponents/Applications/accepted';
import RejectedApplications from './AdminPanelcomponents/Applications/rejected';
import UnderEvalutationApplications from './AdminPanelcomponents/Applications/underEvaluation';
import ArrangeInterviewApplications from './AdminPanelcomponents/Applications/arrangeInterview';
import ApplicationDetailsGeneralInfo from './AdminPanelcomponents/Applications/ApplicationDetails/generalInfo';
import ApplicationDetailsAdditonal from './AdminPanelcomponents/Applications/ApplicationDetails/additional';
import ApplicationDetailsExperience from './AdminPanelcomponents/Applications/ApplicationDetails/experience';
import ApplicationDetailsEducation from './AdminPanelcomponents/Applications/ApplicationDetails/education';
import ApplicationDetailsPersonalInfo from './AdminPanelcomponents/Applications/ApplicationDetails/personalInfo';
import AddToEmployee from './AdminPanelcomponents/Applications/addToEmployee';
import AddOpenPosition from './AdminPanelcomponents/OpenPositions/AddOpenPosition';
import ListOpenPosition from './AdminPanelcomponents/OpenPositions/ListOpenPosition';


//ADMIN PANEL AUTHENTICATION
import Login from './AdminPanelcomponents/AuthenticationFiles/Login';
import Register from './AdminPanelcomponents/AuthenticationFiles/Register';
import ResetPassword from './AdminPanelcomponents/AuthenticationFiles/ResetPassword';
import ForgotPassword from './AdminPanelcomponents/AuthenticationFiles/ForgotPassword';
import Private from './AdminPanelcomponents/AuthenticationFiles/Private';


//USER PANEL 
import AddFile from './UserPanel/AddForms/AddFile';
import AddApplication from './UserPanel/AddForms/userForm';
import UserHome from './UserPanel/userHome';
import MyApplications from './UserPanel/MyApplications';
import UserAppEducation from './UserPanel/ApplicationDetails/education';
import UserAppExperience from './UserPanel/ApplicationDetails/experience';
import UserAppGeneralInfo from './UserPanel/ApplicationDetails/generalInfo';
import UserAppPersonalInfo from './UserPanel/ApplicationDetails/personalInfo';
import UserAppAdditionalInfo from './UserPanel/ApplicationDetails/additional';
import AddMoreExperienceApp from './UserPanel/ApplicationDetails/addMoreExperience';
import AddMoreEducationApp from './UserPanel/ApplicationDetails/addMoreEducation';
import ChangeCV from './UserPanel/MyProfile/ChangeCV';
import Profile from './UserPanel/MyProfile/profile';
import EditUserEducation from './UserPanel/EditFiles/editEducation';
import EditUserExperience from './UserPanel/EditFiles/editExperience';
import EditUserExperienceItem from './UserPanel/EditFiles/editExperienceItem';
import EditInfo from './UserPanel/EditFiles/editInfo';
import EditUserPersonalInfo from './UserPanel/EditFiles/editPersonalInfo';
import EditUserAdditional from './UserPanel/EditFiles/editAdditional';




//USER PANEL AUTHENTICATION
import UserLogin from './UserPanel/AuthenticationFiles/Login';
import UserRegister from './UserPanel/AuthenticationFiles/Register';
import UserResetPassword from './UserPanel/AuthenticationFiles/ResetPassword';
import UserForgotPassword from './UserPanel/AuthenticationFiles/ForgotPassword';
import UserPrivate from './UserPanel/AuthenticationFiles/Private';
import CompleteRegister from './UserPanel/AuthenticationFiles/CompleteRegister';



import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = localStorage.getItem("authToken") ? true : false;

const AdminPrivateRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/adminLogin" />;
};


const userIsAuthenticated = localStorage.getItem("userAuthToken") ? true : false;

const UserPrivateRoute = () => {
  return userIsAuthenticated ? <Outlet /> : <Navigate to="/userLogin" />;
};




const App = () =>

  <Router>
    <Fragment>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/userHome" element={<UserHome />} />

        <Route path="/addFile" element={<AddFile />} />

        <Route path="/adminLogin" element={<Login />} />
        <Route path="/adminRegister" element={<Register />} />
        <Route path="/adminPasswordreset/:resetToken" element={<ResetPassword />} />
        <Route path="/adminForgotPassword" element={<ForgotPassword />} />


        <Route element={<AdminPrivateRoute />}>
          <Route path="/addToEmployee" element={<AddToEmployee />} />
          <Route path="/private" element={<Private />} />
          <Route path="/" element={<AdminEmpForm />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/userDetail" element={<UserDetail />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/editAdditional" element={<EditAdditional />} />
          <Route path="/addGroup" element={<AddGroup />} />
          <Route path="/listGroup" element={<ListGroup />} />
          <Route path="/addTitle" element={<AddTitle />} />
          <Route path="/listTitle" element={<ListTitle />} />
          <Route path="/listOpenPosition" element={<ListOpenPosition />} />
          <Route path="/addOpenPosition" element={<AddOpenPosition />} />
          <Route path="/listEmpByGroup" element={<ListEmpByGroup />} />
          <Route path="/personalInformation" element={<PersonalInformation />} />
          <Route path="/adminAddMoreEducation" element={<AdminAddMoreEducation />} />
          <Route path="/adminAddMoreExperience" element={<AdminAddMoreExperience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/editPersonalInfo" element={<EditPersonalInfo />} />
          <Route path="/editEducation" element={<EditEducation />} />
          <Route path="/editExperience" element={<EditExperience />} />
          <Route path="/editExperienceItem" element={<EditExperienceItem />} />
          <Route path="/adminAdditionalInfo" element={<AdminAdditionalInfo />} />
          <Route path="/newApplications" element={<NewApplications />} />
          <Route path="/acceptedApplications" element={<AcceptedApplications />} />
          <Route path="/rejectedApplications" element={<RejectedApplications />} />
          <Route path="/underEvaluationApplications" element={<UnderEvalutationApplications />} />
          <Route path="/arrangeInterviewApplications" element={<ArrangeInterviewApplications />} />
          <Route path="/applicationDetailsGeneralInfo" element={<ApplicationDetailsGeneralInfo />} />
          <Route path="/applicationDetailsPersonalInfo" element={<ApplicationDetailsPersonalInfo />} />
          <Route path="/applicationDetailsEducation" element={<ApplicationDetailsEducation />} />
          <Route path="/applicationDetailsExperience" element={<ApplicationDetailsExperience />} />
          <Route path="/applicationDetailsAdditional" element={<ApplicationDetailsAdditonal />} />



        </Route>





        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userPasswordreset/:resetToken" element={<UserResetPassword />} />
        <Route path="/userForgotPassword" element={<UserForgotPassword />} />
        <Route path="/userCompleteRegister/:registerToken" element={<CompleteRegister />} />

        <Route element={<UserPrivateRoute />}>
          <Route path="/myApplications" element={<MyApplications />} />
          <Route path="/userPrivate" element={<UserPrivate />} />
          <Route path="addApp">
            <Route path=":positionName" element={<AddApplication />} />
          </Route>
          <Route path="/addApplication" element={<AddApplication />} />


          <Route path="/userAppEducation" element={<UserAppEducation />} />
          <Route path="/userAppPersonalInfo" element={<UserAppPersonalInfo />} />
          <Route path="/userAppExperience" element={<UserAppExperience />} />
          <Route path="/userAppInfo" element={<UserAppGeneralInfo />} />
          <Route path="/userAppAdditionalInfo" element={<UserAppAdditionalInfo />} />
          <Route path="/addMoreExperienceApp" element={<AddMoreExperienceApp />} />
          <Route path="/addMoreEducationApp" element={<AddMoreEducationApp />} />

          <Route path="/editUserEducation" element={<EditUserEducation />} />
          <Route path="/editUserExperience" element={<EditUserExperience />} />
          <Route path="/editUserExperienceItem" element={<EditUserExperienceItem />} />
          <Route path="/editUserPersonalInfo" element={<EditUserPersonalInfo />} />
          <Route path="/editUserAdditional" element={<EditUserAdditional />} />
          <Route path="/editUserInfo" element={<EditInfo />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/changeCV" element={<ChangeCV />} />
        </Route>



      </Routes>



    </Fragment>

  </Router>



export default App;
