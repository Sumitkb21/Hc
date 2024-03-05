// import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Not_login/Home/home';
import Navbar from './components/Navbar/navbar';
import Pastrecords from './components/Patient/Pastrecords/pastrecords';
import Login from './components/Patient/login';
import Register from './components/Not_login/register';
import Prescription from "./components/Prescription/Prescription";
import Appointments from './components/Doctor/appointments';
import Doctorlogin from './components/Doctor/doctorlogin';
import DoctorHome from './components/Doctor/doctorHome';
import DoctorProfile from './components/Doctor/doctorProfile';
import EmailVerify from './components/Patient/AccountVerify';
import Profile from './components/Patient/profile';
import LoginAs from './components/Not_login/LoginAs';

import { Toaster } from 'react-hot-toast';

import ReceptionHome from './components/Reception/receptionHome';
import Receptionlogin from './components/Reception/receptionLogin';
import { useContext,useEffect } from 'react';
import { Context } from '.';
import axios from 'axios';
import Apollologin from './components/Apollo/apolloLogin';
import ApolloHome from './components/Apollo/apolloHome';
import ApolloPastRecord from './components/Apollo/apollopastRecord';
import LabHome from './components/Lab/labNavbar';
import Lablogin from './components/Lab/Lablogin';
import NurseHome from './components/Nurse/nurseHome';
import NurseLogin from './components/Nurse/nurseLogin';
import Medicallogin from './components/Medical/medicalLogin'
import MedicalHome from './components/Medical/medicalHome'
import MedicalPastRecord from './components/Medical/medicalPastRecord';
import AllAppointments from './components/Reception/recpetionappointments';
import NurseAppointments from './components/Nurse/nurseappointments';
import LabAppointments from './components/Lab/labappointments';

import NotFound from './components/Notfound';



function App() {


  const {user , setUser ,isAuthenticatedDoctor, setIsAuthenticatedNurse,  setIsAuthenticatedMedical , setIsAuthenticatedApollo, setIsAuthenticatedLab , setIsAuthenticatedDoctor , setIsAuthenticated, setLoading, setIsAuthenticatedReception } = useContext(Context);


  useEffect(() => {

    setLoading(true);
   
    axios.get("http://localhost:4000/api/v1/users/receptionHome",{
      withCredentials:true,
    })
    .then(res=>{
      setUser(res.data.user);
      console.log(res.data.user);
      // console.log(user)
      setIsAuthenticatedReception(true);
      // setIsAuthenticated(false);
      setLoading(false);

    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setUser({});
      setIsAuthenticatedReception(false);
      setLoading(false);
    })




    setLoading(true);

    axios.get("http://localhost:4000/api/v1/users/patientHome",{
      withCredentials:true,
    })
    .then(res=>{
      setUser(res.data.user);
      // console.log(res.data.message)
      // console.log(user)
      console.log(res.data.user);
      setIsAuthenticated(true);
      // setIsAuthenticatedReception(false);
      setLoading(false);

    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
    
    
    axios.get("http://localhost:4000/api/v1/users/doctorHome",{
      withCredentials:true,
    })
    .then(res=>{
      setUser(res.data.user);
      console.log(res.data.user);
      // console.log(user)
      setIsAuthenticatedDoctor(true);
      // setIsAuthenticated(false);
      setLoading(false);

    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setUser({});
      setIsAuthenticatedDoctor(false);
      setLoading(false);
    })

     
    axios.get("http://localhost:4000/api/v1/users/labHome",{
      withCredentials:true,
    })
    .then(res=>{
      setUser(res.data.user);
      console.log(res.data.user);
      // console.log(user)
      setIsAuthenticatedLab(true);
      // setIsAuthenticated(false);
      setLoading(false);

    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setUser({});
      setIsAuthenticatedLab(false);
      setLoading(false);
    })






  axios.get("http://localhost:4000/api/v1/users/apolloHome",{
    withCredentials:true,
  })
  .then(res=>{
    setUser(res.data.user);
    console.log(res.data.user);
    // console.log(user)
    setIsAuthenticatedApollo(true);
    // setIsAuthenticated(false);
    setLoading(false);

  })
  .catch((error)=>{
    console.log(error.response.data.message);
    setUser({});
    setIsAuthenticatedApollo(false);
    setLoading(false);
  })

   
  axios.get("http://localhost:4000/api/v1/users/medicalHome",{
    withCredentials:true,
  })
  .then(res=>{
    setUser(res.data.user);
    console.log(res.data.user);
    // console.log(user)
    setIsAuthenticatedMedical(true);
    // setIsAuthenticated(false);
    setLoading(false);

  })
  .catch((error)=>{
    console.log(error.response.data.message);
    setUser({});
    setIsAuthenticatedMedical(false);
    setLoading(false);
  })




  axios.get("http://localhost:4000/api/v1/users/nurseHome",{
    withCredentials:true,
  })
  .then(res=>{
    setUser(res.data.user);
    console.log(res.data.user);
    // console.log(user)
    setIsAuthenticatedNurse(true);
    // setIsAuthenticated(false);
    setLoading(false);

  })
  .catch((error)=>{
    console.log(error.response.data.message);
    setUser({});
    setIsAuthenticatedNurse(false);
    setLoading(false);
  })


  
  // axios.get("http://localhost:4000/api/v1/users/receptionHome",{
  //   withCredentials:true,
  // })
  // .then(res=>{
  //   setUser(res.data.user);
  //   console.log(res.data.user);
  //   // console.log(user)
  //   setIsAuthenticatedReception(true);
  //   // setIsAuthenticated(false);
  //   setLoading(false);

  // })
  // .catch((error)=>{
  //   console.log(error.response.data.message);
  //   setUser({});
  //   setIsAuthenticatedReception(false);
  //   setLoading(false);
  // })
/////////////////


// router.get("/patientHome",isAuthenticated,getProfile);
// router.get("/receptionHome",isAuthenticatedReception,getProfile);
// router.get("/doctorHome",isAuthenticatedDoctor,getProfile);
// router.get("/labHome",isAuthenticatedLab,getProfile);
// router.get("",isAuthenticatedMedical,getProfile);
// router.get("/apolloHome",isAuthenticatedApollo,getProfile);
// router.get("",isAuthenticatedNurse,getProfile);





// const [isAuthenticated , setIsAuthenticated] = useState(false);// this one is for patient
// const [isAuthenticatedDoctor , setIsAuthenticatedDoctor] = useState(false);
// const [isAuthenticatedReception , setIsAuthenticatedReception] = useState(false);
// const [isAuthenticatedNurse , setIsAuthenticatedNurse] = useState(false);
// const [isAuthenticatedMedical , setIsAuthenticatedMedical] = useState(false);
// const [isAuthenticatedLab , setIsAuthenticatedLab] = useState(false);
// const [isAuthenticatedApollo , setIsAuthenticatedApollo] = useState(false);
// /////

// ///
// router.post("/createAppointments",createAppointments);
// router.get("/getAppointmentsdoctor",getAppointmentsdoctor);


/////




}, [])
  

  
  return (
    <>

    <Routes>
    <Route path="/" element= {<Home/>}/>;
    <Route path="/prescription" element={<Prescription />} />
    <Route path="/pastrecords" element= {<Pastrecords/>}/>;
    <Route path="/appointments" element= {<Appointments/>}/>;
    {/* <Route path="/medical" element= {<Medical/>}/>; */}
    <Route path="/login" element= {<Login/>}/>;
    <Route path="/register" element= {<Register/>}/>;
    <Route path="/doctorlogin" element= {<Doctorlogin/>}/>;
    <Route path="/doctorHome" element= {<DoctorHome/>}/>;
    <Route path="/profile" element= {<Profile/>}/>;
    <Route path="/doctorprofile" element= {<DoctorProfile/>}/>;
    <Route path="/emailverification" element ={<EmailVerify/>}/>;

    <Route path="/receptionHome" element= {<ReceptionHome/>}/>;
    <Route path="/receptionlogin" element= {<Receptionlogin/>}/>;

    <Route path="/loginAs" element= {<LoginAs/>}/>;

    
    <Route path="/nurselogin" element= {<NurseLogin/>}/>;
    <Route path="/nurseHome" element= {<NurseHome/>}/>;

    {/* <Route path="/medicalPastrecord" element= {<MedicalPastRecord/>}/>; */}
    <Route path="/medicallogin" element= {<Medicallogin/>}/>;
    <Route path="/medicalHome" element= {<MedicalHome/>}/>;
    <Route path="/medicalpastrecord" element= {<MedicalPastRecord/>}/>;

    <Route path="/lablogin" element= {<Lablogin/>}/>;
    <Route path="/labHome" element= {<LabHome/>}/>;
    
    <Route path="/apollopastrecord" element= {<ApolloPastRecord/>}/>;
    <Route path="/apolloHome" element= {<ApolloHome/>}/>;

    <Route path="/apollologin" element= {<Apollologin/>}/>;
    <Route path="/allappointments" element= {<AllAppointments/>}/>;
    <Route path="/nurseappointments" element= {<NurseAppointments/>}/>;
    <Route path="/labappointments" element= {<LabAppointments/>}/>;


    <Route path="*" element={<NotFound />} />

   </Routes> 
   <Toaster/>
   </>
   
  );

}

export default App;