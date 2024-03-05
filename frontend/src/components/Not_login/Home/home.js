import React from 'react';
import './home.css';
import Navbar from '../../Navbar/navbar';


export default function Home() {
  
  return (
    <>
    <Navbar/>
      <div className='page'>
      <section className="Home">
        <h1 className="CenterText" style={{color:'white', fontFamily: 'Helvetica Neue'}}>Consult your health with IITK Health Center</h1>
      </section>
      </div>
    </>
  );
}
