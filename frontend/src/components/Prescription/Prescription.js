import React, { useContext, useEffect, useState } from 'react';
import UpadateCanvas from "./script"
import  './prescription.css';
import { useLocation,useNavigate, useResolvedPath } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../..';



const Prescription = ( ) => {

const [loader , setLoader] = useState(false);
  
const handleSaveButtonClick=(event,savetype,user)=> {
  event.preventDefault();
  setLoader(true);
  console.log("loading:" ,loader);
  const canvas = document.getElementById("drawing-area")
  const image = canvas.toDataURL("image/png");

  let path;
  if(user ==="Doctor") path="sendPastrecord";
  else if(user === "Medical" && savetype==="save1") path="notreferbymedical"
  else if(user === "Medical" && savetype==="save2") path="referbymedical"
  else if(user === "Apollo" ) path="updateApollo"
  else if(user === "Nurse" ) path="updatebyNurse"

  fetch(`http://localhost:4000/api/v1/users/${path}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        pfnumber:appointment.pfnumber,
        firstname:appointment.firstname,
        lastname:appointment.lastname,
        doctorname:appointment.doctorname,
        reg_no:appointment.reg_no,
        image: image
      })
  })
  .then(response => {
      if (response.ok) {
          // alert('Image uploaded successfully');
          // You can perform any additional actions here after successful upload
          toast.success('Image uploaded successfully')
          setLoader(false);

      } else {
          // throw new Error('Failed to upload image');
          toast.error('Failed to upload image');
          setLoader(false);
      }
      
  })
  .catch(error => {
      // console.error('Error uploading image:', error);
      toast.error('Error uploading image:' + error);
      setLoader(false);
      // Handle error, show error message, etc.
  });
}
  const location = useLocation();
  const navigate = useNavigate();
  

  let appointment = location.state?.appointment;
  let user = location.state?.user;

  useEffect(() => {
    appointment = location.state?.appointment;
    user = location.state?.user;
    
    if (!appointment) {
      // Navigate to /appointments
      // Add your navigation logic here
      console.log(appointment);
      // navigate('/appointments');
      navigate(-1);
    }
    if(user !== "Doctor")  document.getElementById("undo-button").style.display = "none";
    if(user === "Reception"){
      document.getElementById("save-button").style.display = "none";
      document.getElementById("clear-button").style.display = "none";
      Array.from(document.getElementsByClassName("color-button")).forEach(button => {
        button.style.display = "none";
      });

    } 
    UpadateCanvas();
  }, [location,appointment,user]);
    return (
    <>
    <p id='data' data-user = {JSON.stringify(appointment) }  data-item={user}>
    </p>
      <div className="container">
        <div className="menu">
          {/* <button id="color-menu-button" className="menu-button" type="button">Color</button>
          <div id="color-menu" className="color-menu"> */}
          <button id='undo-button' className='mb-2'> undo</button>
            <button id="black-color-button" className="color-button mb-2" type="button">
              <span className="bullet black-bullet"></span>
              Black
            </button>
            <button id="blue-color-button" className="color-button mb-2" type="button">
              <span className="bullet blue-bullet"></span>
              Blue
            </button>
            <button id="red-color-button" className="color-button mb-2" type="button">
              <span className="bullet red-bullet"></span>
              Red
            </button>
          </div>
        {/* </div> */}
        <canvas id="drawing-area" className="drawing-area" height="800" width="600"></canvas>
        <div className="action" style={{ textAlign: 'center' }}>
          
          {user === 'Medical' ? (
            <>
              <button id="clear-button" className="clear-button mt-2" type="button" style={{ borderRadius: '5px', backgroundColor: 'red' , border: 'transparent' }}>Clear</button>&nbsp;&nbsp;
              <button id="save-button-1"  disabled={loader} className="save-button mt-2" type="button" onClick={(event) => handleSaveButtonClick(event, 'save1',user)} style={{
    borderRadius: '5px',
    backgroundColor: loader ? '#CCCCCC' : '#4CAF50', // Change background color when loader is true
    border: 'transparent'
  }}>Save</button>
              <button id="save-button-2" disabled={loader} className="save-button mt-2" type="button" onClick={(event) => handleSaveButtonClick(event, 'save2',user)} style={{
    borderRadius: '5px',
    backgroundColor: loader ? '#CCCCCC' : '#4CAF50', // Change background color when loader is true
    border: 'transparent'
  }}>Refer to Apollo</button>
            </>
          ) : (
            <>
            <button id="clear-button" className="clear-button mt-2" type="button" style={{ borderRadius: '5px', backgroundColor: 'red' , border: 'transparent' }}>Clear</button>&nbsp;&nbsp;
            <button id="save-button" disabled={loader} className="save-button mt-2" type="button" onClick={(event) => handleSaveButtonClick(event, 'default',user)} style={{
    borderRadius: '5px',
    backgroundColor: loader ? '#CCCCCC' : '#4CAF50', // Change background color when loader is true
    border: 'transparent'
  }}>Save</button>
            </>
          )}

        </div>
      </div>
    </>
  ); 
};

export default Prescription;
