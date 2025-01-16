import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Common/Navbar";
import SignupPage from "./Pages/Auth/Signup";
import HomePage from "./Pages/Home/HomePage";
import { useSelector } from "react-redux";
import NotFound from "./Component/NotFound";
import Footer from "./Component/Common/Footer";
import Quize from "./Pages/Quize/Quize";
import ProtectedRoute from "./Component/Common/ProtectedRoutes";
import About from "./Pages/About/About";
import StudentQuizMain from "./Pages/StudentPage/StudentQuizMain";
import QuizExam from "./Pages/StudentPage/QuizExam";
import { useState } from "react";
import OTPForm from "./Component/OtpPage";
import TeacherFeedback from "./Pages/Feedback/TeacherFeedback";
import UserFeedback from "./Pages/Feedback/UserFeedback";

function App() {
  const { accessToken, user } = useSelector((state) => state.auth); // Assuming user info is in `auth`
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {isFullscreen ? null : <Navbar />} {/* Hide Navbar in fullscreen */}
      <Routes>
        <Route
          path="/signup"
          element={
            accessToken ? (
              <Navigate to="/" />
            ) : (
              <SignupPage initialForm="signup" />
            )
          }
        />

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
   
        <Route path="/otp/:id" element={<OTPForm />} />
        <Route
          path="/exam/:id"
          element={<QuizExam setIsFullscreen={setIsFullscreen} />}
        /> {/* Pass the fullscreen setter to QuizExam */}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute
              element={
                user?.account_type === "Teacher" ? (
                  <Quize />
                ) : (
                  <StudentQuizMain/>
                )
              }
            />
          }
        />
         <Route
          path="/feedback"
          element={
            <ProtectedRoute
              element={
                user?.account_type === "Teacher" ? (
                  <TeacherFeedback />
                ) : (
                  <UserFeedback/>
                )
              }
            />
          }
        />

      </Routes>
      {isFullscreen ? null : <Footer />} {/* Hide Footer in fullscreen */}
    </>
  );
}

export default App;
