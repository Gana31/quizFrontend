import React, { useState, useEffect } from "react";
import Quiz from '../Exam/QuizExam'
const QuizExam = ({ setIsFullscreen }) => {
  // const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  // // Enter Fullscreen mode
  // const enterFullscreen = () => {
  //   const element = document.documentElement;
  //   if (element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  //   setIsFullscreenMode(true);
  //   setIsFullscreen(true);
  // };

  // // Exit Fullscreen mode
  // const exitFullscreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen();
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen();
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen();
  //   }
  //   setIsFullscreenMode(false);
  //   setIsFullscreen(false);
  // };

  // useEffect(() => {
  //   const handleFullscreenChange = () => {
  //     if (!document.fullscreenElement) {
  //       // Automatically re-enter fullscreen mode if exited
  //       if (isFullscreenMode) {
  //         enterFullscreen();
  //       }
  //     }
  //   };

  //   const handleKeydown = (e) => {
  //     // Allow only number keys
  //     if (e.key >= "0" && e.key <= "9") return;

  //     // Prevent Escape key from stopping fullscreen
  //     if (e.key === "Escape") {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }

  //     // Block other system keys like Alt or Meta
  //     const blockedKeys = ["Meta", "Alt", "Tab"];
  //     if (blockedKeys.includes(e.key)) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //   };

  //   const handleContextMenu = (e) => {
  //     e.preventDefault(); // Disable right-click
  //   };

  //   // Add event listeners
  //   if (isFullscreenMode) {
  //     document.addEventListener("fullscreenchange", handleFullscreenChange);
  //     document.addEventListener("keydown", handleKeydown);
  //     document.addEventListener("contextmenu", handleContextMenu);
  //     document.documentElement.style.overflow = "hidden"; // Disable scrolling
  //   }

  //   return () => {
  //     // Cleanup listeners
  //     document.removeEventListener("fullscreenchange", handleFullscreenChange);
  //     document.removeEventListener("keydown", handleKeydown);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.documentElement.style.overflow = ""; // Restore scrolling
  //   };
  // }, [isFullscreenMode]);

  return (
    // <div
    //   className={`w-full h-screen flex items-center justify-center ${
    //     isFullscreenMode ? "" : "bg-gray-100"
    //   }`}
    // >
    //   <div className="w-full h-full flex flex-col items-center justify-center p-4">
    //     {!isFullscreenMode && (
    //       <button
    //         onClick={enterFullscreen}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
    //       >
    //         Enter Fullscreen
    //       </button>
    //     )}
    //     <div className="w-full flex justify-center">
    //       <h1 className="text-3xl font-semibold mb-4">Quiz Exam</h1>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <button
    //         onClick={exitFullscreen}
    //         className="bg-red-500 text-white px-4 py-2 rounded-md"
    //       >
    //         Exit Fullscreen
    //       </button>
    //     </div>
    //   </div>
    // </div>
    
    <div>
      <Quiz/>
    </div>
  );
};

export default QuizExam;
