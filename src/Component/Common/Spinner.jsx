import React from "react";

const LoadingSpinner = ({ size = 12, color = "purple" }) => {
  return (
    <div className="spinner-container w-full h-full flex items-center justify-center">
      <div
        className={`relative animate-[animloader_0.3s_linear_infinite_alternate]`}
        style={{
          width: `${size * 1}px`,
          height: `${size * 3}px`,
          backgroundColor: color,
          borderRadius: "2px",
        }}
      >
        <span
          className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 animate-[animloader_0.3s_linear_infinite_alternate]"
          style={{
            width: `${size * 1}px`,
            height: `${size * 5}px`,
            backgroundColor: color,
            borderRadius: "2px",
            animationDelay: "0s",
          }}
        ></span>
        <span
          className="absolute top-1/2 left-[20px] transform -translate-y-1/2 animate-[animloader_0.3s_linear_infinite_alternate]"
          style={{
            width: `${size * 1}px`,
            height: `${size * 5}px`,
            backgroundColor: color,
            borderRadius: "2px",
            animationDelay: "0.45s",
          }}
        ></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
