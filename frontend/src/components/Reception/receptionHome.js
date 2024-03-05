import React, { useContext, useState } from 'react'
import ReceptionNavbar from './receptionNavbar'
import { Context } from '../..';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHashtag } from '@fortawesome/free-solid-svg-icons';

const ReceptionHome = () => {
  
    const [pfnumber, setPfnumber] = useState('');
    const [doctorname, setDoctorname] = useState('');

    const {isAuthenticatedReception , setIsAuthenticatedReception, loading , setLoading} = useContext(Context);
     
    
    const submitHandler = async(e)=>{
         
        e.preventDefault();
        setLoading(true);
        try {
         const {data} = await axios.post("http://localhost:4000/api/v1/users/createAppointments", 
          {
               pfnumber, 
               doctorname,          
          }
          ,{
           headers:{
             "Content-Type": "application/json",
          },
             
          }
  
          )
          // console.log(response.headers);
         setPfnumber("");
         setDoctorname("");
         setIsAuthenticatedReception(true);
      //    setUser(user);
         setLoading(false);
         toast.success(data.message)
        }
        catch (error) {
           toast.error(error.response.data.message);
          //  setIsAuthenticatedReception(false);
           setLoading(false);
      
        }
       
      };
  

  
  
  
  
  
  
  
  
    return (
    <div>
      <ReceptionNavbar/>
      <div className='reg'>

      <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>Create Appointment</h2>
      <form className='card' style={{ background:'#eeeeee'}} onSubmit={submitHandler}>
      <div className='form my-4' style={{textAlign:'center'}}>    
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;<input type="text" name="pfnumber" value={pfnumber} onChange={(e)=>{setPfnumber(e.target.value)} } placeholder='PF Number' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;<input type="text" name="doctorname"  value={doctorname} onChange={(e)=>{setDoctorname(e.target.value)} } placeholder='Doctor Name'style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          <button disabled={loading} id="click"  type='submit' style={{border:'none',fontFamily: 'Helvetica Neue' }} >Create Appointment</button> 
        </div>
      </div>
    </form>
    {/* <form onSubmit={submitHandler}>
    <div className='form' id='myform'>

      <input type="text" name="pfnumber" value={pfnumber} onChange={(e)=>{setPfnumber(e.target.value)} } placeholder='Pfnumber' required /><br />
      <input type="text" name="doctorname" value={doctorname} onChange={(e)=>{setDoctorname(e.target.value)} } placeholder='Doctorname' required /><br />
      <button disabled={loading} type='submit' > Create Appointment</button>
      </div>
       
    </form>     */}
    </div>
    </div>
  )
}

export default ReceptionHome
