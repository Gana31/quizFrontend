import React, { useState } from "react";
import logo from "../../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignupPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [Signup , SetSignup] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col p-5 font-mentiText items-center justify-center min-h-screen bg-gray-100">

      <div className="text-center mb-6">
        <img
          src={logo} // Replace with your logo
          alt="Mentimeter Logo"
          className=" w-5 h-5 mx-auto mb-3"
        />
      <h1 className="text-3xl font-mentiDisplay font-bold text-center mb-2">Welcome back!</h1>
      </div>
      {/* Welcome Text */}
      <div className="bg-white w-full max-w-sm p-8 shadow-lg rounded-lg">
        {/* Logo */}

        {
          Signup ? <h2 className="text-lg text-black font-semibold text-center mb-3">
          Create a free account
        </h2> : <h2 className="text-lg text-black font-semibold text-center mb-3">
        Log in to your AptitudeHub account
        </h2>
        }
        <p className="text-sm text-gray-500 text-center mb-4">
          We recommend using your work or school email to keep things separate
        </p>
        <form className="text-xs">
          {Signup && <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-xs text-black font-semibold mb-1"
            >
              First and last name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
              placeholder="First and last name"
            />
          </div>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs text-black font-semibold mb-1"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-100 border-2 placeholder-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
              placeholder="john@company.com"
            />
          </div>
          <div className="mb-6">
      <label
        htmlFor="password"
        className="block text-xs text-black font-semibold mb-1"
      >
        Choose a password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} // Toggle input type
          id="password"
          className="w-full border-2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
          placeholder="At least 8 characters"
        />
        <div
          className="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500 hover:text-purple-700"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Eye icons */}
        </div>
      </div>
    </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white text-sm font-medium py-2 rounded-full hover:bg-black "
          >
            {Signup ? "Sign up" : "Sign In"}
          </button>
        </form>
        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
        {Signup ? `Already have an account ?${" "}` : `Don't have an account ? ${" "}`} 
          <span onClick={()=> SetSignup(!Signup)} className="text-black hover:underline cursor-pointer">
            {Signup ? "Sign In":"Sign Up"}
          </span>
        </p>
        <p className="text-sm text-gray-500 text-center mt-6">
          By signing up you accept our{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            terms of use
          </Link>{" "}
          and{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            policies
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
