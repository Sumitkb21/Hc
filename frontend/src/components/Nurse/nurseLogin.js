import React, { useContext, useState } from 'react'

import axios from "axios" ;
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faEnvelope} from '@fortawesome/free-solid-svg-icons';

import { Context } from '../..';
import Navbar from '../Navbar/navbar';

export default function NurseLogin() {
     
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticatedNurse , setIsAuthenticatedNurse, loading , setLoading} = useContext(Context);
  
    
    // axios.defaults.withCredentials = true ;
    const submitHandler = async(e)=>{
         
      e.preventDefault();
      setLoading(true);
      try {
       const {data} = await axios.post("http://localhost:4000/api/v1/users/nurselogin" , 
        {
             email, 
             password,
         
        }
        ,{
         headers:{
           "Content-Type": "application/json",
        },
        withCredentials : true,
           
        }

        )
        // console.log(response.headers);
       
        setIsAuthenticatedNurse(true);
    //    setUser(user);
       setLoading(false);
       toast.success(data.message)
      }
      catch (error) {
         toast.error(error.response.data.message);
         setIsAuthenticatedNurse(false);
         setLoading(false);

      }
     
    };

    
    if(isAuthenticatedNurse){
      return <Navigate to={"/nurseHome"}/> ; 
    }

    return (
    <>

    <Navbar/>
    <div className="reg">
      <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>Login Form</h2>
    <form className='card' style={{ background:'#eeeeee'}} onSubmit={submitHandler}>
      <div className='form my-3' style={{textAlign:'center'}}>    
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;<input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)} } placeholder='Email' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;<input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)} } placeholder='Password' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  /><br />
        </div>
        <div className='text-center my-2'>
          <button disabled={loading} id="click" type='submit' style={{border:'none',fontFamily: 'Helvetica Neue'}} >Sign In</button>
        </div>
        {/* <div className='text-center my-2'>
          Create new account?  <Link  to="/register" style={{fontFamily: 'Helvetica Neue'}} >Sign Up</Link>
        </div> */}
      </div>
    </form>
    </div>
    </>
  )
}