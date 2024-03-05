
import React, { useContext, useEffect, useState } from 'react'
import ApolloNavbar from './apolloNavbar'
import { Context } from '../..';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye,FaSearch } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router';

const ApolloHome = () => {
  
 const {isAuthenticatedApollo } = useContext(Context); 
  const [appointments,setAppointments]=useState([]);
  const [searchResults, setSearchResults] = useState(appointments);
  const navigate =useNavigate();

  
  
  
  
  
    
    let appoint= []
    useEffect(() => {
      
      axios.get("http://localhost:4000/api/v1/users/getAppointmentsapollo",{
        withCredentials:true,
      })
      .then(res=>{
        // setUser(res.data.user);
        console.log(res.data.appointments);
        appoint = res.data.appointments ;
        setAppointments(appoint);
      // console.log(user)
      // setIsAuthenticatedReception(true);
      // setIsAuthenticated(false);
      // setLoading(false);
      
    })
    .catch((error)=>{
      console.log(error.response.data.message);
      
    })
    
  }, []) 
  
  useEffect(()=>{
    // patientRecords=Records;
    setSearchResults(appointments);
    
  },[appointments])
  // const [hosts, setHosts] = useState([]);
  const handleSubmit = (e) => e.preventDefault();
  
  const handleSearchChange = (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    if (!searchString) {
      setSearchResults(appointments); // Display all appointments when search is empty
      return;
    }
    
    // const searchString = e.target.value.toLowerCase();
    const resultsArray = appointments.filter(
      (appointment) =>
      Object.values(appointment).some(value =>
        typeof value == "string" && value.toLowerCase().includes(searchString)
        )
        
        );
        setSearchResults(resultsArray);
      };
      
      if(!isAuthenticatedApollo){
        return <Navigate to="/"/> ; 
      }
      
      
      return (
        <>
    <ApolloNavbar/>
    <div className="page2">
    <section className='appointments'>
      <h2>Appointments</h2>
      <div className="appointment-container">

      <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder='Search for appointments'
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
              <strong>Patient Name:</strong> {appointment.firstname},&nbsp;&nbsp;
              <strong>Date:</strong> {appointment.date}
            </span>&nbsp;&nbsp;&nbsp;
            <button
                className="view-prescription-button"
                id="view-prescription"  
                
                onClick={() => navigate('/prescription', {state: {appointment: appointment, user:"Apollo"}})}
                >
                <FaEye /> View Prescription
            </button>
          </div>
          
        ))}
      </div>
    </section>
    </div>
    </>
      )
}

export default ApolloHome
