import React, { useContext, useEffect } from 'react'

import { Context } from '../..';
import { Navigate } from 'react-router-dom';
import DoctorNavbar from './doctorNavbar';
import axios from 'axios';


const DoctorHome = () => {
    
    const {isAuthenticatedDoctor } = useContext(Context); 
  
    let appointments = [];  
    useEffect(() => {
    
        axios.get("http://localhost:4000/api/v1/users/getAppointmentsdoctor",{
        withCredentials:true,
      })
      .then(res=>{
        // setUser(res.data.user);
        console.log(res.data.appointments);
        appointments = res.data.appointments ;
        // console.log(user)
        // setIsAuthenticatedReception(true);
        // setIsAuthenticated(false);
        // setLoading(false);
  
      })
      .catch((error)=>{
        console.log(error.response.data.message);
       
      })
  
    }, []) 


    if(!isAuthenticatedDoctor){
        return <Navigate to="/"/> ; 
    }
    
  
  

    return (
    <>
      <DoctorNavbar/> 
     <div className="reg">
     <div className="quotes" style={{paddingTop:'50px',textAlign:'center'}}>
          <p style={{textAlign:'center'}}>Your health is an investment, not an expense.</p>
          <p style={{textAlign:'center'}}>Taking care of yourself is part of taking care of your patients.</p>
          <p style={{textAlign:'center'}}>Your health is your most valuable asset. Take care of it</p>
        </div>
     </div>
    </>
  )
}

export default DoctorHome
