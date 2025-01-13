import React from "react";
import { FaBookOpen, FaClipboardList } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboardCustomize },
    { id: "upcoming", label: "Upcoming Quizzes", icon: FaBookOpen },
    { id: "history", label: "Quiz History", icon: FaClipboardList },
    { id: "liveQuiz", label: "Applied Quiz", icon: RiLiveFill },
 
  ];

  return (
    <div className="bg-white  md:left-0 h-full md:w-64 w-full">
      {/* For desktop view */}
      <nav className="hidden md:flex flex-col md:overflow-x-visible">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center px-4 md:px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-purple-600 transition-colors whitespace-nowrap md:mb-4 md:w-full md:text-left justify-center md:justify-start ${
                isActive ? "bg-indigo-50 text-purple-600 md:border-r-4 border-purple-600" : ""
              }`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="md:inline-block hidden">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom navigation for mobile view */}
      <div className="md:hidden fixed left-0 w-full bg-white shadow-lg z-50 flex justify-around items-center py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center text-gray-600 ${
                isActive ? "text-purple-600" : "hover:text-purple-600"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>

  
    </div>
  );
}

export default Sidebar;
