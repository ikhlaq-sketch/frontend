import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Pic from "../../assets/website/3.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
setMessage({ text: "Password reset email sent! Check your inbox.", isError: false });

// Redirect to /login after 3 seconds
setTimeout(() => {
  window.location.href = '/login';  // Redirect to login page
}, 3000);  // 3 seconds delay

    } catch (error) {
      setMessage({ text: error.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white flex rounded-2xl shadow-xl max-w-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Form */}
        <div className="md:w-1/2 px-8 md:px-12 py-12">
          <div className="text-center mb-8">
            <h2 className="font-bold text-3xl text-teal-600 dark:text-teal-400 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Enter your email to receive a reset link
            </p>
          </div>
          
          {message.text && (
            <div className={`mt-4 p-3 rounded-lg mb-6 transition-all duration-300 ${
              message.isError 
                ? "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50" 
                : "bg-teal-50 border border-teal-200 text-teal-700 dark:bg-teal-900/20 dark:border-teal-800/50"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
            <div className="relative">
              <input
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
              } flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              <Link 
                to="/login" 
                className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block w-1/2 bg-teal-100 dark:bg-gray-700 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-teal-600/10 dark:from-gray-600/10 dark:to-gray-800/10"></div>
          <img 
            className="w-full h-full object-cover" 
            src={Pic} 
            alt="Forgot Password" 
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;