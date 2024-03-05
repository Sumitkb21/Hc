import React from 'react';
import "./pastrecords.css";
import { FaEye } from 'react-icons/fa';
import {useState,useContext,useEffect } from 'react';
import { Context } from '../../..';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/navbar';


const Pastrecords = () => {
  const {isAuthenticated, loading , user } =  useContext(Context);
  const [patientRecords, setPatientRecords] = useState([]);
    
    ///if user is logged out , or coookie expire then it will return to home page ("/")
    
    
    // const patientRecords = [
      //   { patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2024-02-10' ,imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707938244/canvas_image_zoyd57.png"},
      //   { patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2024-01-25', imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707758604/u8ap4xlezsasaeqlkyrg.png" },
      //   { patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2024-01-25', imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707758604/u8ap4xlezsasaeqlkyrg.png" },
      //   { patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2024-01-25', imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707758604/u8ap4xlezsasaeqlkyrg.png" },
      //   // Add more records as needed
      // ];
      
      let Records = [];  
      // let patientRecords = [];  
      useEffect(() => {
        
        axios.get("http://localhost:4000/api/v1/users/getpastrecords",{
          withCredentials:true,
        })
        .then(res=>{
          // setUser(res.data.user);
          console.log(res.data.record);
          Records = res.data.record ;
          // console.log(user)
          // setIsAuthenticatedReception(true);
          // setIsAuthenticated(false);
          // setLoading(false);
          // console.log(Records[0])
          setPatientRecords(Records);
          
        })
        .catch((error)=>{
          console.log(error.response.data.message);
          
        })
        
      }, []) 
      
      useEffect(()=>{
        // patientRecords=Records;
        console.log(patientRecords);
        
      },[])
      
      
      
      
      
      // const openImage = (imageURL) => {
  //   // Logic to open the image, for example, using window.open()
  //   window.open(imageURL);
  // };
  
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openImage = async(imageURL) => {
    await setShowModal(true);
    await setSelectedImage(imageURL);
  };
  
  const closeModal = () => {
    console.log(selectedImage,showModal);
    setShowModal(false);
    setSelectedImage(null);
  };
  
  const downloadFileFromURL=(url, fileName)=>{
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    })
    .catch(error => console.error('Error downloading file:', error));
  }
  
  if(!isAuthenticated) {
    return <Navigate to="/"/>
  }
  return (
    <>
    <Navbar/>
    <div className='page1'>
              <section className='pastrecords' >
                <h2>Past Records</h2>
                <div className="record-container">
                  {patientRecords.map((record, index) => (
                    <div key={index} className="record-box">
                      <span>
                        <strong>Patient Name:</strong> {record.firstname},&nbsp;&nbsp;
                        {/* <strong>Doctor Name:</strong> {record[0].doctor1},&nbsp;&nbsp;
                        <strong>PF No:</strong> {record[0].pfnumber},&nbsp;&nbsp; */}
                        {/* <strong>Date:</strong> {record.date} */}
                      </span>&nbsp;&nbsp;&nbsp;
                      <button className="view-prescription-button" onClick={() => openImage(record.imglink)}>
                        <FaEye /> View Prescription
                      </button>
                    </div>
                  ))}
                </div>
                {showModal && (
                  <div className="mod">
                     <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Selected" />
                        <button className="downloadimg mt-2" type='button' onClick={()=>downloadFileFromURL(selectedImage,"record.png")}> Save </button>
                      </div>
                      
                 </div>
                )}


               
              </section>
      </div>

      </>
            
  );
}

export default Pastrecords;