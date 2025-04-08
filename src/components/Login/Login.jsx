import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pic from "../../assets/website/1.png";
import axios from "axios";
import { FiUser, FiLock, FiMail, FiLoader } from "react-icons/fi";
import { 
  auth, 
  googleProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  browserPopupRedirectResolver
} from "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  const validateForm = () => {
    const errors = {};
    if (!formData.identifier.trim()) {
      errors.identifier = "Username or Email is required.";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if(formData.identifier!= import.meta.env.VITE_Condition){
    try {

       // 🔹 Step 1: Now login to Firebase

     
      const auth = getAuth();
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        formData.identifier,
        formData.password
      );

      // console.log("Firebase login success:", firebaseUser.user.uid);


      // 🔹 Step 2: Reset password in the backend
      await axios.post("https://nextstep-backend-production.up.railway.app/api/update-password-after-reset/", {
        email: formData.identifier,
        password: formData.password,
        firebase_uid: firebaseUser.user.uid,
      });
  
      // console.log("Password synced to backend successfully.");
      setMessage("");
      setLoading(false);

      // 🔹 Step 3: Login 
      const response = await axios.post("https://nextstep-backend-production.up.railway.app/api/api/login/", {
        identifier: formData.identifier,
        password: formData.password,
      });

      // console.log("Django Login Response:", response.data);

  
      // 🔹 Step 4: Save user session
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("userType", response.data.userType);
  
     
  

  
      
  
      // 🔹 Step 5: Redirect user
      if (response.data.userType === "admin") {
        navigate("/adminpanel");
      } else if (response.data.userType === "user") {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      
      setMessage(error.response?.data?.error || "Error logging in.");
      setLoading(false);
    }
  }




  
  else{
    try
    {
     // 🔹 Step 3: Login 
     const response = await axios.post("https://nextstep-backend-production.up.railway.app/api/api/login/", {
      identifier: formData.identifier,
      password: formData.password,
    });

    // console.log("Django Login Response:", response.data);


    // 🔹 Step 4: Save user session
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem("userType", response.data.userType);

   



    

    // 🔹 Step 5: Redirect user
    if (response.data.userType === "admin") {
      navigate("/adminpanel");
    } else if (response.data.userType === "user") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  } catch (error) {
    
    setMessage(error.response?.data?.error || "Error logging in.");
    setLoading(false); 
  }
}
  };
  


  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      // Step 1: Sign in with Firebase (Google)
      const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
      const { email, uid: firebase_uid } = result.user;

      // Step 2: Authenticate with Django backend
      const response = await fetch("https://nextstep-backend-production.up.railway.app/api/api/auth/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firebase_uid }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Google authentication failed");
      }

      // Step 3: Store user session
      const userSession = {
        name: data.user.name,
        email: data.user.email,
        token: data.user.token,
        is_google_auth: true,
        userType:  "user",
      };
      localStorage.setItem('username', userSession.name)
      localStorage.setItem("user", JSON.stringify(userSession));
      localStorage.setItem("access_token", data.user.token);

      // Step 4: Redirect based on user type
      if(data.user.userType === "user"){
        navigate( "/dashboard");
      }
     

    } catch (err) {
      setError(err.message);
      console.error("Google Sign-In Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 flex rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <FiUser className="text-teal-600 dark:text-teal-300 text-2xl" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
            Sign in to access your account
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  className={`pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    error.identifier ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-700 dark:text-white`}
                  type="text"
                  name="identifier"
                  placeholder="Enter your username or email"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>
              {error.identifier && (
                <p className="mt-1 text-sm text-red-500">{error.identifier}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  className={`pl-10 w-full p-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    error.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-700 dark:text-white`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiLock className="text-gray-400" />
                  ) : (
                    <FiLock className="text-gray-400" />
                  )}
                </button>
              </div>
              {error.password && (
                <p className="mt-1 text-sm text-red-500">{error.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/Forget" className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}>
              {message}
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                  New to our platform?
                </span>
              </div>
            </div>

            <div className="mt-6">
  <Link to="/reg">
    <button className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300">
      Create an account
    </button>
  </Link>
</div>
<br />
<button
  onClick={handleGoogleSignIn}
  disabled={loading}
  className={`flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 transition-all duration-300 ${
    loading
      ? "opacity-70 cursor-not-allowed"
      : "hover:bg-gray-100 dark:hover:bg-gray-600"
  }`}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      <span>Signing in...</span>
    </div>
  ) : (
    <>
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="Google"
        className="w-5 h-5"
      />
      Sign In with Google
    </>
  )}
</button>


          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-teal-500 to-teal-700 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <img 
            className="w-full h-full object-cover" 
            src={Pic} 
            alt="Login Visual" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
            <p className="text-sm opacity-90">
              Discover amazing features and connect with like-minded people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;