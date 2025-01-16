import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../Services/ApiConnector";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../Slices/quizSlice";

const OTPForm = () => {
  const { token } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [invalidFields, setInvalidFields] = useState([]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};

  // Check if token exists, if not, redirect to quiz page
  useEffect(() => {
    if (!token) {
      navigate("/quiz"); // Redirect to quiz if no token
    }
  }, [token, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const emptyIndexes = otp
      .map((value, index) => (!value ? index : null))
      .filter((v) => v !== null);

    if (emptyIndexes.length > 0) {
      setInvalidFields(emptyIndexes);
      toast.error("Invalid OTP. Please fill in all the fields correctly.");
      return;
    }

    try {
      const response = await apiClient.post("/verify-otp", { otp: otpValue, token, quizId: id });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        
        // Remove token and navigate to the exam page
        
        navigate(`/exam/${id}`); // Navigate to the correct exam page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Email OTP Verification</h1>
          <p className="text-sm text-slate-500">
            Enter the 6-digit verification code sent to your registered email.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength="1"
                className={`w-12 h-12 text-center text-xl font-semibold bg-slate-100 border rounded-md outline-none focus:ring-2 focus:ring-indigo-300 ${
                  invalidFields.includes(index) ? "border-red-500" : "border-slate-300"
                }`}
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </main>
  );
};

export default OTPForm;
