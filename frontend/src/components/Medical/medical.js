import React from 'react';
import "./medical.css";
import { FaEye,FaSearch } from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import {useState , useEffect} from 'react';

const Appointments = () => {
    const navigate =useNavigate();
    const appointments = [
        { doctorName: 'Dr. Smith', patientName: 'John Doe', queueNo: 'A001', pfNo: 'PF123', date: '2024-02-10', imageURL: "http://res.cloudinary.com/dt8idppf9/image/upload/v1708082444/prescription.png" },
        { doctorName: 'Dr. Johnson', patientName: 'Jane Smith', queueNo: 'A002', pfNo: 'PF456', date: '2024-01-25',imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707938244/canvas_image_zoyd57.png" },
        { doctorName: 'Dr. Johnson', patientName: 'Jane Smith', queueNo: 'A003', pfNo: 'PF789', date: '2024-01-25' , imageURL: "https://res.cloudinary.com/dsr4m1th2/image/upload/v1707938244/canvas_image_zoyd57.png" },
        // Add more records as needed
    ];
    // const [hosts, setHosts] = useState([]);
    const [searchResults, setSearchResults] = useState(appointments);
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(appointments);

            const searchString = e.target.value.toLowerCase();
            const resultsArray = appointments.filter(
                (appointment) =>
                Object.values(appointment).some(value =>
                    value.toLowerCase().includes(searchString)
                )
        
            );
            setSearchResults(resultsArray);
        };
    
    
      
  return (
    <div className="page2">
    <section className='appointments'>
      <h2>Medical Records</h2>
      <div className="appointment-container">

      <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder='Search for medical record'
          onChange={handleSearchChange}
        />
        <button type="submit" className="search__button">
          <FaSearch />
        </button>
      </div>
    </form>
        
        {searchResults.map((appointment, index) => (
          <div key={index} className="appointment-box">
            <span>
              <strong>Patient Name:</strong> {appointment.patientName},&nbsp;&nbsp;
              <strong>Date:</strong> {appointment.date}
            </span>&nbsp;&nbsp;&nbsp;
            <button
                className="view-prescription-button"
                id="view-prescription"
                
                onClick={() => navigate('/prescription', {state: {appointment: appointment}})}
                >
                <FaEye /> View Prescription
            </button>
          </div>
          
        ))}
      </div>
    </section>
    </div>
  )
}

export default Appointments
