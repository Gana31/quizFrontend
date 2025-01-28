import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoPage from "../../Component/Common/Logo";
import { login, Register } from "../../Services/Operations/authoperation";
import LoadingSpinner from "../../Component/Common/Spinner";

function SignupPage({ initialForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [Signup, SetSignup] = useState(
    location.state?.form === "login" ? false : initialForm === "signup"
  );
  const [accountType, setAccountType] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading); // Access loading state from Redux

  // Effect to switch form when navigating directly to the page
  useEffect(() => {
    if (location.state?.form === "login") {
      SetSignup(false); // Show login form when coming from login link in navbar
    } else if (location.state?.form === "signup") {
      SetSignup(true); // Show signup form when coming from signup link in navbar
    }
  }, [location.state]);

  const handleToggleForm = () => {
    SetSignup((prevState) => !prevState);
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type); // Update account type when button is clicked
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, account_type: accountType }; // Include accountType in the payload

    if (Signup) {
      // Call Register API
      dispatch(Register(payload, navigate, SetSignup));
    } else {
      // Call login API
      dispatch(login({ email: formData.email, password: formData.password }, navigate));
    }
  };

  return (
    <div className="flex flex-col p-5 font-mentiText items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-6">
        <LogoPage />
        <h1 className="text-5xl font-mentiDisplay font-bold text-center mb-2 ">
          Welcome back!
        </h1>
      </div>

      <div className="bg-white w-full max-w-sm p-8 shadow-lg rounded-lg">
        <h2 className="text-lg text-black font-semibold text-center mb-3">
          {Signup ? "Create a free account" : "Log in to your AptitudeHub account"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          We recommend using your work or school email to keep things separate
        </p>

        {Signup && (
          <div className="w-full flex p-2 my-4 bg-gray-100 rounded-full">
            <button
              type="button"
              className={`w-1/2 py-2 font-medium rounded-full ${accountType === "Teacher" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                }`}
              onClick={() => handleAccountTypeChange("Teacher")}
            >
              Content Manager
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 font-medium rounded-full ${accountType === "User" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                }`}
              onClick={() => handleAccountTypeChange("User")}
            >
              User
            </button>
          </div>
        )}

        <form className="text-xs" onSubmit={handleSubmit}>
          {Signup && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-xs text-black font-semibold mb-1"
              >
                First and last name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-2 bg-gray-100 placeholder-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
                placeholder="First and last name"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs text-black font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-100 border-2 placeholder-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
              placeholder="john@company.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs text-black font-semibold mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 hover:border-purple-700"
                placeholder="At least 8 characters"
              />
              <div
                className="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500 hover:text-purple-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full text-sm font-medium py-2 rounded-full flex items-center justify-center ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-800 hover:bg-black text-white"
              }`}
            style={{ height: "2.5rem" }} // Fixed height for the button
          >
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner size={2} color="white" /> {/* White spinner inside button */}
              </div>
            ) : (
              Signup ? "Sign up" : "Sign In"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {Signup ? `Already have an account? ` : `Don't have an account? `}
          <span
            onClick={() => SetSignup(!Signup)}
            className="text-black hover:underline cursor-pointer"
          >
            {Signup ? "Sign In" : "Sign Up"}
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
