import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Reg from "./components/Login/Reg";

import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Dashboard/Profile";
import AOS from "aos";
import "aos/dist/aos.css";
import P from "./components/Choose/Personalized";
import C from "./components/Choose/Career";
import J from "./components/Choose/JobsMadeEasy";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import Adminpanel from "./components/Dashboard/Adminpanel";
import Forgot from './components/Login/ForgotPassword';
// import ResetPassword from './components/Login/UpdatePassword';
import Recommendation from "./components/Dashboard/recommendation"
import Project from "./components/Dashboard/Project"
import Roadmap from "./components/Dashboard/Roadmap"
import VerifyEmail from "./components/Login/VerifyEmail";
import Course from "./components/Dashboard/Course";
import Job from "./components/Dashboard/job";
import Jobmatch from "./components/Dashboard/Jobmatch";

import About from "./components/Navbar/About";
import Service from "./components/Navbar/service";
import CV from "./components/Dashboard/CV";
import Careerresponse from "./components/Dashboard/CareerResponse";
import Jhome from "./components/Dashboard/JobSearchPage";
import Resume from "./components/Dashboard/Resume1";




const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const CareerResponseWrapper = () => {
    const location = useLocation();
    const profileData = location.state?.profileData || {}; // Ensure profileData is not undefined
    return <CareerResponse profileData={profileData} />;
  };

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/forget" element={<Forgot />} />
          
                   
   
    

          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          {/* Protected Routes */}
            {/* User-only routes - accessible only to users with 'user' role */}
  <Route 
    path="/dashboard" 
    element={
     <ProtectedRoute  allowedRoles={["user"]} >
    
        <Dashboard />
        </ProtectedRoute>
    } 
  />
  <Route 
    path="/profile" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Profile />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/cv" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <CV />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/recommendation" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Recommendation />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/roadmap" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Roadmap />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/project" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Project />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/course" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Course />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/jobs" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Job />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/careertransform" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Careerresponse />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/job-match" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Jobmatch />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/job-search" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Jhome />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/resume" 
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Resume />
      </ProtectedRoute>
    } 
  />

  {/* Admin-only route - accessible only to users with 'admin' role */}
  <Route 
    path="/Adminpanel" 
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Adminpanel />
      </ProtectedRoute>
    } 
  />
          
          {/* Other Routes */}
          <Route path="/Personalized" element={<P />} />
          <Route path="/Career" element={<C />} />
          <Route path="/job" element={<J />} />
          <Route path="/About" element={<About />} />
          <Route path="/service" element={<Service />} />
       
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
