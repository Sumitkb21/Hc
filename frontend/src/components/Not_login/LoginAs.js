import React, { useState } from 'react';
import './LoginAs.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

const LoginAs = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelection = (selected) => {
    // setSelectedUser(selected);
  };

  return (
    <>
    <Navbar/>
    <div className='reg'>


    <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>Login As</h2>
    <div className='row my-2'>
      <div style={{width:'10%'}} ></div>
      <div className='card mybtn'  style={{width:'35%',background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/login">
        <button className={`btn ${selectedUser === 'patient' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('patient')}>
          <h2 style={{fontFamily: 'Helvetica Neue'}}>Patient</h2>
        </button>
      </Link>
      </div>
      <div style={{width:'10%'}}></div>
      <div className='card mybtn' style={{width:'35%',background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/doctorlogin">
        <button className={`btn ${selectedUser === 'doctor' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('doctor')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Doctor</h2>
        </button>
      </Link>
      </div>
      <div style={{width:'10%'}}></div>
    </div>
    <div className='row my-2'>
      <div style={{width:'10%'}}></div>
      <div className='card mybtn' style={{width:'35%',background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/receptionlogin">
        <button className={`btn ${selectedUser === 'reception' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('reception')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Reception</h2>
        </button>
      </Link>
      </div>
      <div style={{width:'10%'}}></div>
      <div className='card mybtn' style={{width:'35%',background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/nurselogin">
        <button className={`btn ${selectedUser === 'nurse' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('nurse')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Nurse</h2>
        </button>
      </Link>
      </div>
      <div style={{width:'10%'}}></div>
    </div>
    <div className='row my-2'>
       <div style={{width:'3%'}} ></div>
      <div className='card mybtn' style={{width:'30%' ,background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/medicallogin">
        <button className={`btn ${selectedUser === 'medical' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('medical')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Medical</h2>
        </button>
      </Link>
      </div>
      <div className='card mybtn' style={{width:'30%' ,background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/apollologin">
        <button className={`btn ${selectedUser === 'apollo' ? 'selected' : ''}`} style={{border:'none'}} onClick={() => handleUserSelection('apollo')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Apollo</h2>
        </button>
      </Link>
      </div>
      <div className='card mybtn' style={{width:'30%' ,background:'rgba(238, 238, 238, 0.3)'}}>
      <Link to="/lablogin">
        <button className={`btn ${selectedUser === 'lab' ? 'selected' : ''}`}style={{border:'none'}} onClick={() => handleUserSelection('lab')}>
        <h2 style={{fontFamily: 'Helvetica Neue'}}>Lab</h2>
        </button>
      </Link>
      </div>
      <div style={{width:'3%'}}></div>
    </div>
    </div>
    </>
  );
};

export default LoginAs;
