import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import LogoPage from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-200 z-100 font-mentiText text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold cursor-pointer" onClick={()=>navigate("/")}><LogoPage/></h3>
            <p className="text-black">
              Making the world a better place through innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className='text-black'>
            <h3 className="text-lg font-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/about" >About</Link></li>
              <li><Link to="/contact" >Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-light mb-4">Contact Us</h3>
            <ul className="space-y-2 text-black">
              <li>123 Business Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@company.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded  text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 text-center md:flex md:justify-between text-black text-sm">
          <p>© {currentYear} AptitudeHub. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;