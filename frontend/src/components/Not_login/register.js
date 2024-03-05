import React, { useContext, useState } from 'react'
import './form.css'
// import Navbar from './navbar'
import axios from "axios" ; 
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHashtag,faLock,faEnvelope,faCircleUser} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/navbar';
import { useLocation } from 'react-router-dom';



export default function Register() {
    //  const history = useNavigate() ;
    const location = useLocation();
    let email=location.state?.email; 
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [pfnumber, setPfnumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {isAuthenticated , setIsAuthenticated , loading , setLoading} =  useContext(Context);

    

    
    const submitHandler = async(e)=>{
      e.preventDefault();
      setLoading(true); 
      if(password.length < 10){
        toast.error("password should be atleast 10 length",{duration:1500});
        setLoading(false);
      }
      else if(confirmPassword !== password){
        toast.error("password does not match",{duration:1500});
        setLoading(false);
      }
      else{
        
      try {
       const {data} = await axios.post("http://localhost:4000/api/v1/users/register" , 
        {
             firstname,
             lastname,
             username,
             pfnumber, 
             password,
             email,
        }
        ,{
         headers:{
           "Content-Type": "application/json",
         },
         withCredentials: true,
        }
        )
        
       toast.success(data.message,{duration:1500});
       setIsAuthenticated(true);
       setLoading(false);
    
      }
      catch (error) {

        setIsAuthenticated(false);

        if(error.response){
          const {data} = error.response ;
          toast.error(data.message,{duration:1500});
        }
          setLoading(false);
      }
    }
    };


    if(isAuthenticated){
      return <Navigate to={"/profile"}/> ; 
    }

    return (
    <>

    <Navbar/>
    {/* <h1 style={{ textAlign: "center" }}>Register Page</h1>  

    <form onSubmit={submitHandler}>
    <div className='form'>

      <input type="string" name="firstname" value={firstname} onChange={(e)=>{setFirstname(e.target.value)} } placeholder="First number" required /><br />
      <input type="text" name="lastname" value={lastname} onChange={(e)=>{setLastname(e.target.value)} } placeholder='lastname' required  /><br />
      <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)} } placeholder='username' required /><br />
      <input type="text" name="pfnumber" value={pfnumber} onChange={(e)=>{setPfnumber(e.target.value)} } placeholder='PF number' required /><br />
      <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)} } placeholder='Password' required /><br />
      <input  name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' pattern=".+@iitk\.ac\.in" title="Please enter a IITK email address" required /><br />

      <button disabled = {loading} type='submit' > Submit</button>
      <h1>OR</h1>
      <Link to="/login"> Login</Link>
      </div> 
      </form>*/}

      <div className="reg">
      <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>Registration Form</h2>

<form className='card' style={{ background:'#eeeeee'}}  onSubmit={submitHandler}>
    <div className='form my-4' style={{textAlign:'center'}}>    
        <div className='text-center my-2'>
          <FontAwesomeIcon className="icon-wrapper"  icon={faUser} />&nbsp;&nbsp;<input type="string" name="firstname" value={firstname} onChange={(e)=>{setFirstname(e.target.value)} } placeholder="First Name" style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;<input type="text" name="lastname" value={lastname} onChange={(e)=>{setLastname(e.target.value)} } placeholder='Last Name' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required  />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faCircleUser} />&nbsp;&nbsp;<input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)} } placeholder='Username' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;<input type="text" name="pfnumber" value={pfnumber} onChange={(e)=>{setPfnumber(e.target.value)} } placeholder='PF Number' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;<input type="password" name="password" title='password must contains atleast 8 character' value={password} onChange={(e)=>{setPassword(e.target.value)} } placeholder='Password' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faLock} />&nbsp;&nbsp;<input type="password" name="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)} } placeholder='Confirm Password' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false"  required /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;<input  name="email" value={email}  disabled={true} style={{fontFamily: 'Helvetica Neue'}} required /><br />
        </div>
        <div className='text-center my-2'>
        <button disabled={loading} id="click" type='submit' style={{border:'none',fontFamily: 'Helvetica Neue'}} >Sign Up</button>
        </div>
        <div className='text-center my-2'>
          Already have an account?  <Link  to="/login" style={{fontFamily: 'Helvetica Neue'}} >Sign In</Link>
        </div>
      </div>
    </form>
    </div>
       
    
    </>
  )
}