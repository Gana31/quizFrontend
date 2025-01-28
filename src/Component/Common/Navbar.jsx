import React, { useState } from 'react';
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import LogoPage from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/Operations/authoperation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { accessToken,user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = async () => {
    dispatch(logout(navigate));
    setIsMenuOpen(false); // Close hamburger menu
    setIsProfileMenuOpen(false); // Close profile dropdown
  };

  const handleLoginClick = () => {
    navigate("/signup", { state: { form: "login" } });
    setIsMenuOpen(false); // Close hamburger menu
  };

  const handleSignupClick = () => {
    navigate("/signup", { state: { form: "signup" } });
    setIsMenuOpen(false); // Close hamburger menu
  };

  const linkClasses = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive ? 'text-blue-600' : 'text-black hover:text-blue-600'
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive ? 'text-white' : 'text-black hover:text-blue-600'
    }`;

  return (
    <div className='h-14 flex p-2 md:mx-[10%] items-center justify-between shadow-sm relative'>
      {/* Logo Section */}
      <div className='items-center'>
        <LogoPage size="2xl" hideTextOnMobile={true} />
      </div>

      {/* Navigation Links for Large Screens */}
      <div className='hidden lg:flex gap-x-6'>
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClasses}>
          About
        </NavLink>

        
        <NavLink to="/quiz" className={linkClasses}>
          Quiz
        </NavLink>
        <NavLink to="/resource" className={linkClasses}>
        Resource
        </NavLink>

        {accessToken && user.account_type == "Teacher" &&  
       ( <NavLink to="/feedback" className={linkClasses}>
        Feedback
      </NavLink>)}
      </div>

      {/* Buttons and Hamburger Menu */}
      <div className='flex gap-x-3 items-center'>
        {!accessToken && (
          <>
            {/* Log In Button */}
            <button
              onClick={handleLoginClick}
              className="hidden md:block bg-white text-base font-semibold py-2 px-4 rounded-full"
            >
              Log in
            </button>

            {/* Sign Up Button */}
            <button
              onClick={handleSignupClick}
              className="bg-blue-600 text-sm font-semibold py-2 px-6 text-white rounded-full hover:bg-blue-700 transition-all duration-100"
            >
              Sign up
            </button>
          </>
        )}

        {/* Profile Icon for Logged-In Users (Visible Only on Large Screens) */}
        {accessToken && (
          <div className='hidden lg:block font-mentiText relative'>
            <FaUserCircle
              size={40}
              className='cursor-pointer text-gray-600 hover:text-blue-600'
              onClick={toggleProfileMenu}
            />
            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md'>
                <NavLink
                  to="/profile"
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburger Menu Icon (Visible on Mobile) */}
        <div className='md:hidden cursor-pointer' onClick={toggleMenu}>
          <IoMenuSharp size={30} />
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      <div
        className={`fixed inset-y-0 right-0 bg-blue-600 z-50 w-full max-w-sm transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <div className='flex justify-start p-4'>
          <IoCloseSharp
            size={35}
            className='text-white cursor-pointer'
            onClick={toggleMenu}
          />
        </div>
        {/* Menu Items */}
        <div className='flex flex-col items-start gap-y-2 p-6 text-white'>
          <NavLink to="/" onClick={toggleMenu} className={mobileLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={toggleMenu} className={mobileLinkClasses}>
            About
          </NavLink>
         
          <NavLink to="/quiz" onClick={toggleMenu} className={mobileLinkClasses}>
            Quiz
          </NavLink>
          {accessToken && user.account_type == "Teacher" &&  
        <NavLink to="/feedback" className={linkClasses}>
          Feedback
        </NavLink>}
        </div>
        {/* Buttons */}
        {!accessToken && (
          <div className='flex flex-col text-center gap-y-4 mx-4 mt-6'>
            <button
              onClick={handleLoginClick}
              className='text-white font-medium items-center w-full justify-center text-base'
            >
              Log in
            </button>
            <button
              onClick={handleSignupClick}
              className='bg-white text-black w-full items-center justify-center text-base font-medium py-2 px-6 rounded-full'
            >
              Sign up
            </button>
          </div>
        )}

        {accessToken && (
          <div className='flex flex-col text-center gap-y-4 mx-4 mt-6'>
            <button
              onClick={handleLogout}
              className='bg-white text-black w-[80%] items-center justify-center text-base font-medium py-2 px-6 rounded-full'
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
