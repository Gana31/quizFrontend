import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./Component/Common/Navbar"
import SignupPage from "./Pages/Auth/Signup"
import HomePage from "./Pages/Home/HomePage"
import { useSelector } from "react-redux"
import NotFound from "./Component/NotFound"
import Footer from "./Component/Common/Footer"
import Quize from "./Pages/Quize/Quize"
import ProtectedRoute from "./Component/Common/ProtectedRoutes"



function App() {
 
const {accessToken } = useSelector((state)=>state.auth)
  return (
    <>
    <Navbar/>
    <Routes>
        <Route 
          path="/signup" 
          element={accessToken ? <Navigate to="/" /> : <SignupPage/>} 
        />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} /> */}
        <Route path="*" element={<NotFound />} />

       
        Protected Routes
        <Route 
          path="/quiz" 
          element={<ProtectedRoute element={<Quize />} />} 
        />
       
      </Routes>
  <Footer/>
    </>
  )
}

export default App
