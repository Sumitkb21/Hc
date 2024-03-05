import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Context } from '../..';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faHashtag} from '@fortawesome/free-solid-svg-icons';





const EmailVerify = () => {
  const {setLoading , loading } = useContext(Context);
  const [isVisible,setIsVisible]=useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  const [remainingTime,setRemainingTime]=useState(80);

  


  const submitHandler1 = async(e)=>{
    setLoading(true); 
  
    e.preventDefault();
      // setLoading(true);
      try {
       const {data} = await axios.post("http://localhost:4000/api/v1/users/emailverify" , 
        {
          email,    
        }
        ,{
         headers:{
           "Content-Type": "application/json",
        },
           
        }

        )
        // console.log(response.headers);
       
       
      //  setUser(user);
       setLoading(false);
       toast.success(data.message);
       setIsVisible(!isVisible);
      }
      catch (error) {
         toast.error(error.response.data.message);
      
         setLoading(false);
    
      }
     
    };
  // useEffect(() => {
  //   if (isVisible) {
  //     setTimeout(() => {
  //       SetIsVisible(false);
        
  //     }, 60000);
  //   }
  // }, [isVisible]);
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && remainingTime === 0) {
      setIsVisible(false);
      setRemainingTime(80);
    }
  }, [isVisible, remainingTime]);

    if(isVerify){
      return <Navigate to="/register"  state={{ email: email }} />
    }

    const submitHandler2 = async(e)=>{
      e.preventDefault();
        setLoading(true);
        try {
         const {data} = await axios.post("http://localhost:4000/api/v1/users/otpverify" , 
          {
            email,
            otp,    
          }
          ,{
           headers:{
             "Content-Type": "application/json",
          },
             
          }
  
          )
          // console.log(response.headers);
         
        //  setIsAuthenticated(true);
        //  setUser(user);
        setIsVerify(true);
         setLoading(false);
         toast.success(data.message);
         setIsVisible(!isVisible);
        }
        catch (error) {
           toast.error(error.response.data.message);
          //  setIsAuthenticated(false);
           setLoading(false);
           setIsVerify(false);
        }
      };

     
  
  return (

    <div>
      <Navbar/>
      <div className="reg" onSubmit={submitHandler1}>
      <h2 style={{textAlign:'center',color:'white', fontFamily: 'Helvetica Neue'}}>IITK Account Verification</h2>
    <form className='card' style={{ background:'#eeeeee'}}>
      <div className='form my-3' style={{textAlign:'center'}}>    
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;<input type="email" name="email" value = {email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Email' pattern= ".+@iitk\.ac\.in" title="Please enter a IITK email address"  required style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          <FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;<input type="string" disabled={!isVisible} name="otp" onChange={(e)=>{setOTP(e.target.value)} }  placeholder='OTP' style={{fontFamily: 'Helvetica Neue'}} spellcheck="false" /><br />
        </div>
        <div className='text-center my-2'>
          {!isVisible ? (

          <button id="click" type="submit" disabled={loading} style={{border:'none'}} >Send OTP</button>
          

          ):
            (
            <>
            <button id="click" disabled={loading} onClick={submitHandler2} style={{border:'none'}}> Submit OTP</button>
            <h5>{remainingTime}</h5>
            </>)
          }
        </div>
      </div>
    </form>
    </div>
      {/* <div className='reg'>
      <h1 style={{ textAlign: "center" }}>IITK Account Verfication </h1>  
      <form  onSubmit={submitHandler1} className='form'>
        <input type="email" value = {email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Email' pattern= ".+@iitk\.ac\.in" title="Please enter a IITK email address"  required /><br />
        <input type="string" value= {otp} onChange={(e)=>{setOTP(e.target.value)} }  placeholder='OTP' /><br />
        <button type="submit" disabled={loading} >Send OTP</button> <br /> <button disabled={loading} onClick={submitHandler2}> Submit OTP</button>
      </form>
      </div> */}
    </div>
  )
}

export default EmailVerify
