import { useState, useEffect } from "react";
import { FaBars, FaSignOutAlt, FaUser, FaChartLine, FaTimes, FaHome, FaBell } from "react-icons/fa";
import { MdWorkOutline, MdDashboard } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchUserProfile, saveUserProfile } from "../../services/api";
import Footer from '../Footer/Footer';

function DashboardCard({ icon, title, description, onClick, color }) {
  return (
    <div 
      onClick={onClick}
      className={`${color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-lg bg-white shadow-xs">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [profileData, setProfileData] = useState({
    skills: "",
    experience: "",
    jobPreference: "",
    education: "",
    personalInterests: "",
    job_market_demand_score: "",
  });
  const [profileCreated, setProfileCreated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    loadUserProfile();
    loadMockNotifications();
  }, [navigate]);

  const loadUserProfile = async () => {
    try {
     const username = localStorage.getItem("username") 

if (!username) {
    console.error("No username or name found in localStorage!");
    return;
}
  
      const response = await fetchUserProfile(username);
      setProfileData(response.data);
      setRecommendations(response.data.recommendations || []);
      setProfileCreated(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const loadMockNotifications = () => {
    setNotifications([
      { id: 1, text: "New job matches available", read: false, time: "2 mins ago" },
      { id: 2, text: "Profile update recommended", read: false, time: "1 hour ago" },
      { id: 3, text: "Career tips available", read: true, time: "1 day ago" },
    ]);
  };
  const handleNavigateToRecommendations = () => {
    navigate("/recommendation", { state: { recommendations } });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_role");
      localStorage.removeItem('auth');
      navigate("/login");
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm flex justify-between items-center px-6 py-4 fixed w-full top-0 left-0 z-50 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-gray-600 hover:text-teal-600 transition-colors p-1 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center">
            <h3 className="text-2xl font-bold text-teal-600 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              NextStep
            </h3>
            
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-gray-600 hover:text-teal-600 relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <FaBell className="text-xl" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">Notifications</h4>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close notifications"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <FaBellSlash className="mx-auto text-gray-300 text-2xl mb-2" />
                      <p className="text-sm text-gray-500">No notifications yet</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center">
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors group"
            aria-label="Logout"
          >
            <div className="p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
              <FaSignOutAlt />
            </div>
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
  
      {/* Enhanced Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white text-gray-800 h-full fixed top-0 left-0 z-40 shadow-xl pt-16 w-64 border-r border-gray-200`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
          <h2 className="text-xl font-bold text-teal-600">
            Dashboard Menu
          </h2>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-gray-500 hover:text-teal-600 p-1 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
  
        <ul className="space-y-1 p-3">
          {[
            { to: "/", icon: <FaHome />, text: "Home" },
            { to: "/profile", icon: <FaUser />, text: profileCreated ? "Edit Profile" : "Create Profile" },
            { action: handleNavigateToRecommendations, icon: <FaChartLine />, text: "Career Recommendations" },
            { to: "/job-search", icon: <MdWorkOutline />, text: "Job Opportunities" },
            { to: "/job-match", icon: <IoMdAnalytics />, text: "Resume Matcher" },
            { to: "/careertransform", icon: <MdDashboard />, text: "Career Transition", state: { profileData } },
            { to: "/resume", icon: <RiProfileLine />, text: "Resume Analyzer" }
          ].map((item, index) => (
            <li key={index}>
              {item.to ? (
                <NavLink 
                  to={item.to}
                  state={item.state}
                  className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className={`text-lg ${
                    isActive ? 'text-white' : 'text-teal-600'
                  }`}>{item.icon}</span> 
                  <span className="font-medium">{item.text}</span>
                </NavLink>
              ) : (
                <button 
                  onClick={item.action}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 w-full text-left text-gray-700"
                >
                  <span className="text-lg text-teal-600">{item.icon}</span> 
                  <span className="font-medium">{item.text}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 text-center">
            v2.1.0 • {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
  
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        ></motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 pt-20 px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-teal-600">{localStorage.getItem("username") || "User"}</span>!
          </h1>
          <p className="text-gray-600">Here's what's happening with your career today</p>
        </div>
          
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard 
              icon={<FaUser className="text-3xl text-teal-600" />}
              title={profileCreated ? "Edit Profile" : "Create Profile"}
              description="Update your professional details"
              onClick={() => navigate("/profile")}
              color="bg-teal-50"
            />
            
            <DashboardCard 
              icon={<FaChartLine className="text-3xl text-blue-600" />}
              title="Career Recommendations"
              description="Get personalized career suggestions"
              onClick={handleNavigateToRecommendations}
              color="bg-blue-50"
            />
            
            <DashboardCard 
              icon={<MdWorkOutline className="text-3xl text-purple-600" />}
              title="Job Opportunities"
              description="Browse available positions"
              onClick={() => navigate("/job-search")}
              color="bg-purple-50"
            />
            
            <DashboardCard 
              icon={<IoMdAnalytics className="text-3xl text-orange-600" />}
              title="Resume Matcher"
              description="Match your resume with jobs"
              onClick={() => navigate("/job-match")}
              color="bg-orange-50"
            />
            
            <DashboardCard 
              icon={<MdDashboard className="text-3xl text-green-600" />}
              title="Career Transition"
              description="Plan your next career move"
              onClick={() => navigate("/careertransform", { state: { profileData } })}
              color="bg-green-50"
            />
            
            <DashboardCard 
              icon={<RiProfileLine className="text-3xl text-indigo-600" />}
              title="Resume Analyzer"
              description="Improve your resume"
              onClick={() => navigate("/resume")}
              color="bg-indigo-50"
            />
          </div>
          
          {/* Recent Activity Section */}
       
        </div>
      </div>
      
      <Footer />
    </div>
  );
}