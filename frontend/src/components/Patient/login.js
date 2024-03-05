import React, { useContext, useState } from 'react'
// import './navbar.css'
import Navbar from '../Navbar/navbar'
import axios from "axios" ;
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faHashtag} from '@fortawesome/free-solid-svg-icons';
import LoginAs from '../Not_login/LoginAs';

import { Context } from '../..';

export default function Login() {
     
    const [pfnumber, setPfnumber] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated , setIsAuthenticated  , loading , setLoading, user, setUser} = useContext(Context);
  
    
    // axios.defaults.withCredentials = true ;
    const submitHandler = async(e)=>{
         
      e.preventDefault();
      setLoading(true);
      try {
       const {data} = await axios.post("http://localhost:4000/api/v1/users/login" , 
        {
             pfnumber, 
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
       
       setIsAuthenticated(true);
      //  setUser(user);
       setLoading(false);
       toast.success(data.message)
      }
      catch (error) {
         toast.error(error.response.data.message);
         setIsAuthenticated(false);
         setLoading(false);
    
      }
     
    };

    
    if(isAuthenticated){
      return <Navigate to={"/profile"}/> ; 
    }

    return (
    <>

    <Navbar/>
    {/* <LoginAs user="patient"/> */}



    <div className="reg" onSubmit={submitHandler}>
      <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>Login Form</h2>
    <form className='card' style={{ background:'#eeeeee'}}>
      <div className='form my-4' style={{textAlign:'center'}}>    
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;<input type="string" name="pfnumber" onChange={(e)=>{setPfnumber(e.target.value)} } placeholder='PF number' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;<input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)} } placeholder='Password' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          <button disabled={loading} id="click"  type='submit' style={{border:'none',fontFamily: 'Helvetica Neue' }} >Sign In</button> 
        </div>
        <div className='text-center my-2'>
          Create new account?  <Link  to="/emailverification" style={{fontFamily: 'Helvetica Neue'}}  >Sign Up</Link>
        </div>
      </div>
    </form>
    </div>
    </>
  )
}