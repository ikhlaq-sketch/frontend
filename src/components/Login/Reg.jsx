import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pic from "../../assets/website/2.png";
import { sendUserData, googleAuth } from "../../services/api";
import { FiUser, FiMail, FiLock, FiLoader, FiEye, FiEyeOff, FiArrowRight,FiCheckCircle } from "react-icons/fi";
import { 
  auth, 
  googleProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  browserPopupRedirectResolver
} from "../../firebase/firebase";

const Register = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Theme effect
  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.]{3,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError({});

    if (!usernameRegex.test(formData.name)) {
      setError({ 
        name: "Username must be 3-20 characters, contain at least one letter, and can include numbers, underscores, or periods." 
      });
      setLoading(false);
      return;
    }

    try {
      // // 1. First check if email exists in Firebase
      // const methods = await fetchSignInMethodsForEmail(auth, formData.email);
      // if (methods.length > 0) {
      //   throw { code: "auth/email-already-in-use" };
      // }

      // 2. Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 3. Send verification email
      await sendEmailVerification(user);

      // 4. Register user in Django backend
      const response = await sendUserData({
        ...formData,
        firebase_uid: user.uid  // Send Firebase UID to backend
      });

      setMessage("Registration successful! Please verify your email.");
      setFormData({ name: "", email: "", password: "" });

    } catch (error) {
      let errorMessage = "Registration failed.";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email is already registered.";
            break;
          case "auth/weak-password":
            errorMessage = "Password must be 6+ characters.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
        }
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        setLoading(true);
        setMessage("");
        setError({});
    
        // 1. Sign in with Google via Firebase
        const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
        const user = result.user;
    
        // 2. Prepare data for Django backend
        const userData = {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            firebase_uid: user.uid,
        };
    
        // 3. Authenticate with Django backend
        const response = await googleAuth(userData);
    
        // 4. Store user data with userType
        const userSession = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            token: response.data.user.token, // This is what your backend returns
            is_google_auth: true,
            is_verified: response.data.user.is_verified,
            userType:  'user' // Now correctly accessing userType
        };
        
        console.log('User session:', userSession); // Debug log

        localStorage.setItem('username', userSession.name)
        localStorage.setItem("user", JSON.stringify(userSession));
        localStorage.setItem("userType", userSession.userType);
        localStorage.setItem("access_token", userSession.token); // Add this for ProtectedRoute
    
        // 5. Redirect - fix the condition
        if (userSession.userType === 'user') {
            navigate("/dashboard", { replace: true });
        }
  
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      
      let errorMessage = "Failed to sign in with Google";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Please complete the sign-in in the popup window";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please try again";
            break;
          case "auth/popup-blocked":
            errorMessage = "Popups are blocked. Please allow popups for this site";
            break;
          case "auth/cancelled-popup-request":
            errorMessage = "Sign-in was cancelled";
            break;
          case "auth/account-exists-with-different-credential":
            errorMessage = "This email is already registered with another method";
            break;
          default:
            errorMessage = error.message || error.code;
        }
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 flex rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
  {/* Header with animated avatar */}
  <div className="flex justify-center mb-8">
  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 -mt-2">
  <FiUser className="text-teal-600 dark:text-teal-300 text-3xl transform hover:scale-110 transition-transform" />
</div>
  </div>
  
  {/* Title section */}
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
      Create Account
    </h2>
    <p className="text-center text-gray-500 dark:text-gray-300">
Unlock knowledge and learning opportunities
    </p>
  </div>

  {/* Form */}
  <form className="space-y-5" onSubmit={handleSubmit}>
    {/* Username Field */}
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400">
        Username
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiUser className="text-gray-400 group-focus-within:text-teal-500 transition-colors" />
        </div>
        <input
          className={`pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            error.name ? "border-red-500 ring-red-200" : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md`}
          type="text"
          name="name"
          placeholder="Enter your username"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {error.name && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <FiAlertCircle className="mr-1" /> {error.name}
        </p>
      )}
    </div>

    {/* Email Field */}
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400">
        Email
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMail className="text-gray-400 group-focus-within:text-teal-500 transition-colors" />
        </div>
        <input
          className={`pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            error.email ? "border-red-500 ring-red-200" : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md`}
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {error.email && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <FiAlertCircle className="mr-1" /> {error.email}
        </p>
      )}
    </div>

    {/* Password Field */}
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-200 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400">
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="text-gray-400 group-focus-within:text-teal-500 transition-colors" />
        </div>
        <input
          className={`pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            error.password ? "border-red-500 ring-red-200" : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md`}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-teal-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FiEyeOff className="text-gray-400 hover:text-teal-500" />
          ) : (
            <FiEye className="text-gray-400 hover:text-teal-500" />
          )}
        </button>
      </div>
      {error.password && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <FiAlertCircle className="mr-1" /> {error.password}
        </p>
      )}
    </div>

    {/* Terms Checkbox */}
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded transition-all"
          required
        />
      </div>
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        I agree to the <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Terms</a> and <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Policy</a>
      </label>
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-70 group"
        disabled={loading}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin mr-2 group-hover:animate-pulse" />
            Creating Account...
          </>
        ) : (
          <>
            Sign Up <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </div>
  </form>

  {/* Status Message */}
  {message && (
    <div className={`mt-4 p-4 rounded-lg border ${
      message.includes("Error") 
        ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-300"
        : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-700 dark:text-green-300"
    } flex items-center`}>
      {message.includes("Error") ? (
        <FiAlertCircle className="mr-2 flex-shrink-0" />
      ) : (
        <FiCheckCircle className="mr-2 flex-shrink-0" />
      )}
      {message}
    </div>
  )}

  {/* Social Login Divider */}
  <div className="mt-8">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-600">
          Or sign up with
        </span>
      </div>
    </div>

    {/* Google Sign-In */}
    <div className="mt-6">
      <button 
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 group"
      >
        <img 
          src="https://www.svgrepo.com/show/355037/google.svg" 
          alt="Google" 
          className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" 
        />
        {loading ? "Processing..." : "Continue with Google"}
      </button>
    </div>

    {/* Login Link */}
    <div className="mt-6 text-center text-sm">
      <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
      <Link 
        to="/login" 
        className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 inline-flex items-center hover:underline"
      >
        Sign in <FiArrowRight className="ml-1 transition-transform hover:translate-x-0.5" />
      </Link>
    </div>
  </div>
</div>

        {/* Right Column - Image */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-teal-500 to-teal-700 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <img 
            className="w-full h-full object-cover" 
            src={Pic} 
            alt="Register Visual" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold mb-2">Welcome to Our Platform</h3>
            <p className="text-sm opacity-90">
              Join thousands of users who are already benefiting from our services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;