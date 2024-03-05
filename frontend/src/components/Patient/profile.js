import React, { useContext } from 'react'
import { Context } from '../..';
import { Navigate } from 'react-router-dom';
import Loader from '../loader';
import Navbar from './Navbar/navbar';
import './profile.css'
const Profile = () => {
    const {isAuthenticated, loading , user } =  useContext(Context);
    
    
    
    
    ///if user is logged out , or coookie expire then it will return to home page ("/")
    if(!isAuthenticated) {
      return <Navigate to="/"/>
    }
    
    

    // console.log(user);
 
    return (
      <>
                
    {loading ? <Loader/> :( 
    <div>
      <Navbar/>
      <div className='reg'>      
      <div className="quotes" style={{paddingTop:'50px',textAlign:'center'}}>
          <p style={{textAlign:'center'}}>Your health is an investment, not an expense.</p>
          <p style={{textAlign:'center'}}>Taking care of yourself is part of taking care of your patients.</p>
          <p style={{textAlign:'center'}}>Your health is your most valuable asset. Take care of it</p>
        </div>
    </div>
    </div>
      )
    }
      </>
  )
}

export default Profile
