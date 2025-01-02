import React from 'react';
import LogoIcon from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

function LogoPage({ size = "3xl", hideTextOnMobile = false }) {
  return (
    <NavLink to="/" className='flex w-full gap-x-2 justify-center items-center'>
      <div className='flex items-center justify-center'>
        <img src={LogoIcon} alt="AptitudeHub" className="w-5 h-5 mx-auto" />
      </div>
      <div>
        <h1 
          className={`font-mentiDisplay font-semibold text-black ${
            hideTextOnMobile ? 'hidden md:block' : ''
          } text-${size}`}
        >
          AptitudeHub
        </h1>
      </div>
    </NavLink>
  );
}

export default LogoPage;
