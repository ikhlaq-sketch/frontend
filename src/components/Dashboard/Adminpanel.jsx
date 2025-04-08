import { useState, useEffect } from "react";
import { FaBars, FaSignOutAlt, FaUser, FaHome, FaCog, FaChartLine, FaUsers, FaDatabase, FaFileAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Adminpanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const navigate = useNavigate();

  // Sample data for charts
  const activityData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 3000 },
    { name: 'Mar', users: 5000 },
    { name: 'Apr', users: 2780 },
    { name: 'May', users: 1890 },
    { name: 'Jun', users: 2390 },
  ];

  const pieData = [
    { name: 'Active', value: 75 },
    { name: 'Inactive', value: 25 },
  ];

  const COLORS = ['#0d9488', '#ccfbf1'];

  useEffect(() => {
    const storedName = localStorage.getItem("Username:");
    if (storedName) {
      setUserName(storedName);
    }

    const handleBackNavigation = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_name");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: sidebarOpen ? 250 : 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gradient-to-b from-teal-600 to-teal-700 text-white h-full fixed top-0 left-0 z-50 overflow-hidden shadow-xl`}
      >
        <div className="p-5 flex justify-between items-center border-b border-teal-500">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-white hover:text-teal-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-teal-500">
          <div className="flex items-center space-x-3 p-3">
            <div className="bg-teal-500 p-2 rounded-full">
              <FaUser size={20} />
            </div>
            <div>
              <p className="text-sm text-teal-100">Welcome back,</p>
              <p className="font-bold truncate">{userName}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-teal-500 bg-opacity-30' : 'hover:bg-teal-500 hover:bg-opacity-20'
                  }`
                }
              >
                <FaHome size={16} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
            <a
  href="https://nextstep-backend-production.up.railway.app/admin/app/userdata/"
  className="flex items-center space-x-3 p-3 rounded-lg transition-colors"
  target="_blank"  // Optional: open the link in a new tab
  rel="noopener noreferrer"  // Optional: for security purposes
>
  <FaUsers size={16} />
  <span>User Management</span>
</a>

            </li>
            <li>
              <NavLink
                to="#"
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-teal-500 bg-opacity-30' : 'hover:bg-teal-500 hover:bg-opacity-20'
                  }`
                }
              >
                <FaChartLine size={16} />
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-teal-500 bg-opacity-30' : 'hover:bg-teal-500 hover:bg-opacity-20'
                  }`
                }
              >
                <FaFileAlt size={16} />
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <a
                href="https://nextstep-backend-production.up.railway.app/admin/app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-500 hover:bg-opacity-20 transition-colors"
              >
                <FaCog size={16} />
                <span>Admin Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                <FaBars size={20} />
              </button>
              <h1 className="text-xl font-bold text-teal-600">NextStep Admin</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl p-8 mb-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
            <p className="text-teal-100">Here's what's happening with your platform today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admin Settings Card */}
            <a
              href="https://nextstep-backend-production.up.railway.app/admin/app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-teal-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <FaCog className="text-teal-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Admin Settings</h3>
                  <p className="text-gray-600 text-sm">Access Django admin interface</p>
                </div>
              </div>
            </a>

            {/* User Management Card */}
            <NavLink
              to="https://nextstep-backend-production.up.railway.app/admin/app/userdata/"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-teal-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <FaUsers className="text-teal-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">User Management</h3>
                  <p className="text-gray-600 text-sm">Manage all user accounts</p>
                </div>
              </div>
            </NavLink>

            {/* Reports Card */}
            <NavLink
              to="/reports"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-teal-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <FaFileAlt className="text-teal-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Generate Reports</h3>
                  <p className="text-gray-600 text-sm">Create and download system reports</p>
                </div>
              </div>
            </NavLink>
          </div>
          <br />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Users Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">12,345</h3>
                  <p className="text-sm text-teal-600 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +12.5% from last month
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-lg">
                  <FaUsers className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Active Sessions Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Sessions</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">1,234</h3>
                  <p className="text-sm text-teal-600 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +8.2% from yesterday
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-lg">
                  <FaUser className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Data Entries Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Data Entries</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">56,789</h3>
                  <p className="text-sm text-teal-600 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +5.3% from last week
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-lg">
                  <FaDatabase className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">System Health</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">98.7%</h3>
                  <p className="text-sm text-teal-600 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Optimal performance
                  </p>
                </div>
                <div className="bg-teal-100 p-3 rounded-lg">
                  <FaChartLine className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Activity (Last 6 Months)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="users" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Status Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">User Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

     
        </main>
      </div>
    </div>
  );
}