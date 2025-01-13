import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
const OTPForm = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [invalidFields, setInvalidFields] = useState([]);
  const inputRefs = useRef([]);

  // Handle input changes
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if available
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace or delete
  const handleKeyDown = (e, index) => {
    if ((e.key === "Backspace" || e.key === "Delete") && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Select all content on focus
  const handleFocus = (index) => {
    inputRefs.current[index].select();
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 4).split("");
    setOtp((prevOtp) =>
      prevOtp.map((val, index) => data[index] || val)
    );

    // Focus on the last filled input
    const lastFilledIndex = data.length - 1;
    if (lastFilledIndex < otp.length) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const emptyIndexes = otp.map((value, index) => (!value ? index : null)).filter((v) => v !== null);

    if (emptyIndexes.length > 0) {
      // Highlight invalid fields and show error
      setInvalidFields(emptyIndexes);
      toast.error("Invalid OTP. Please fill in all the fields correctly.");
      return;
    }

    // Clear OTP and reset state
    console.log("Submitted OTP:", otpValue);
    setOtp(new Array(4).fill(""));
    setInvalidFields([]);
    inputRefs.current[0].focus();
    toast.success("OTP verified successfully!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Email OTP Verification</h1>
          <p className="text-sm text-slate-500">
            Enter the 4-digit verification code that was sent to your <span className="font-semibold text-green-700">register Email</span> .
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="flex justify-center gap-4"
            onPaste={handlePaste}
          >
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
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleFocus(index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
          >
            Verify Account
          </button>
        </form>

        <div className="text-sm text-center text-slate-500 mt-4">
          Didn't receive code?{" "}
          <a
            href="#0"
            className="font-medium text-indigo-500 hover:text-indigo-600"
          >
            Resend
          </a>
        </div>
      </div>
    </main>
  );
};

export default OTPForm;
