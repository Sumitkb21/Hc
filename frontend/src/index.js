import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { createContext } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"



export const Context  = createContext({isAuthenticated:false});


const AppWrapper = () =>{
  const [isAuthenticated , setIsAuthenticated] = useState(false);// this one is for patient
  const [isAuthenticatedDoctor , setIsAuthenticatedDoctor] = useState(false);
  const [isAuthenticatedReception , setIsAuthenticatedReception] = useState(false);
  const [isAuthenticatedNurse , setIsAuthenticatedNurse] = useState(false);
  const [isAuthenticatedMedical , setIsAuthenticatedMedical] = useState(false);
  const [isAuthenticatedLab , setIsAuthenticatedLab] = useState(false);
  const [isAuthenticatedApollo , setIsAuthenticatedApollo] = useState(false);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  
  return(
    <Context.Provider value={{
      isAuthenticated,setIsAuthenticated,
      isAuthenticatedReception , setIsAuthenticatedReception,
      isAuthenticatedNurse , setIsAuthenticatedNurse,
      isAuthenticatedMedical , setIsAuthenticatedMedical,
      isAuthenticatedLab , setIsAuthenticatedLab,
      isAuthenticatedApollo , setIsAuthenticatedApollo,
      isAuthenticatedDoctor , setIsAuthenticatedDoctor,
      loading,setLoading,
      user,setUser
    }}>
    <App />
    </Context.Provider> 
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
