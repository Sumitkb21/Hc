import React, { useContext } from 'react'
import DoctorNavbar from './doctorNavbar'
import { Context } from '../..';
import { Navigate } from 'react-router-dom';

const DoctorProfile = () => {
    const {isAuthenticatedDoctor } = useContext(Context); 
  
    if(!isAuthenticatedDoctor){
        return <Navigate to="/"/> ; 
      } 
  
    return (
    <div>
      <DoctorNavbar/>
      <h1>Doctor's Profile page</h1>
    </div>
  )
}

export default DoctorProfile
