import React, { useContext,useState } from 'react'
// import Home from '../Not_login/home';
// import PastRecord from './pastRecord';
import { NavLink, Navigate } from 'react-router-dom';
// import './patientnavbar.css'
import { Context } from '../..';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../Navbar/logo.png'

const ApolloNavbar = () => {
  const { isAuthenticatedApollo, setIsAuthenticatedApollo , loading , setLoading} =  useContext(Context);
  
  
  
  
  
  const logoutHandler = async()=>{
    
    setLoading(true);
    try {
      await axios.get("http://localhost:4000/api/v1/users/logout" , 
      {   
        withCredentials:true,
      }
      )
      
      toast.success("Logged out succesfully");
      setIsAuthenticatedApollo(false);
      setLoading(false);
    }
    catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticatedApollo(true);
      setLoading(false);
    }
    
  };
  
  
  
  
  //   return (
    
//     <div className='navbar'>

//       <NavLink className='com' to="/apolloHome"> Home</NavLink>
//       {/* <NavLink className='com' to="/doctorProfileDetail">Profile</NavLink> */}
//       <button disabled={loading} onClick={logoutHandler}>Logout</button>
//       <NavLink className='com' to="/apolloPastrecord"> Past Record</NavLink>

//     </div>

//   )


const [isVisible,setIsVisible]=useState(true);
const handleProfileLogo = () => {
  if (!isVisible) {
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 100);
  } else {
    setIsVisible(!isVisible);
  }
  
};

if(!isAuthenticatedApollo) {
  return <Navigate to="/"/>
}  

return (
<>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid my-0">
      <NavLink className="navbar-brand" to="/apolloHome">
        <div className="logo-cls">
          <img src={logo} alt="logo" width="40px" height="38px" />
          <h5 style={{ marginLeft: '10px', marginTop: '5px', background: 'linear-gradient(to right,  #84D25A, #0194B6)', WebkitBackgroundClip: 'text', color: 'transparent', fontFamily: 'Helvetica Neue' }}> <b> HEALTH CENTER</b></h5>
        </div>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleProfileLogo}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/apolloHome">
              <h5 style={{fontFamily: 'Helvetica Neue'}}>Home</h5>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link active" to="/loginAs">
            <h5>Login</h5> 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" to="/emailverification"/>
            <h5>Signup</h5> 
          </li> */}
          <li>
            <NavLink className="nav-link active" to="/apolloPastRecord">
              <h5 style={{fontFamily: 'Helvetica Neue'}}>Past Record</h5>
            </NavLink>
          </li>
          { isVisible ? (
            <li className="nav-item dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontFamily: 'Helvetica Neue'}}>
                Profile
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="/Profile" style={{color:'#212529', background:'white',fontFamily: 'Helvetica Neue'}}> Profile</NavLink>
                <NavLink className="dropdown-item" to="/editProfile" style={{color:'#212529', background:'white',fontFamily: 'Helvetica Neue'}} >Edit Profile</NavLink>
                <div className="dropdown-divider"></div>
                <NavLink className="dropdown-item"  style={{color:'#212529', background:'white',fontFamily: 'Helvetica Neue'}} onClick={logoutHandler}>Logout</NavLink>
              </div>
            </li>
            ):
            (<>
            <li className="nav-item">
            <NavLink className="nav-link active" to="/editProfile">
              <h5 style={{fontFamily: 'Helvetica Neue'}}>Edit Profile</h5>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" disabled={loading} onClick={logoutHandler}>
            {/* <button   style={{fontFamily: 'Helvetica Neue'}}>Logout</button> */}
            <h5 style={{fontFamily: 'Helvetica Neue'}}>Logout</h5>
            </NavLink>
          </li>
            </>)
          }

        </ul>
      </div>
    </div>
  </nav>
</>
);
}

export default ApolloNavbar ;

