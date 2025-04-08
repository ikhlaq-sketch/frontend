import { useNavigate } from "react-router-dom";
import { FaSearch, FaFileAlt, FaUserTie, FaArrowRight } from "react-icons/fa";
import Logo from "../../assets/features/logo.png";

const JobSearchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
         <div className="max-w-7xl mx-5 px-1 py-6 flex items-center">
            <img src={Logo} alt="Logo" className="h-20 w-20 mr-1" />
          <h1 className="text-2xl font-bold text-teal-600">Job Search Portal</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Dream Job</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect opportunity tailored to your skills and experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Resume-Based Search Card */}
          <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-teal-300 transition-colors cursor-pointer group"
            onClick={() => navigate("/cv")}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <FaFileAlt className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  Resume-Based Search
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get job matches based on your uploaded resume. Our AI will analyze your skills and experience.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium">Try it now</span>
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Best for:</span> Quick matches from your existing resume
              </div>
            </div>
          </div>

          {/* Profile-Based Search Card */}
          <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-teal-300 transition-colors cursor-pointer group"
            onClick={() => navigate("/jobs")}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-teal-50 mr-4">
                  <FaUserTie className="text-2xl text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  Profile-Based Jobs
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Find jobs that match your complete profile including skills, experience, and preferences.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium">Get started</span>
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="bg-teal-50 px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Best for:</span> Personalized recommendations
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="max-w-2xl mx-auto mt-16 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-start">
            <div className="p-3 rounded-lg bg-purple-50 mr-4">
              <FaSearch className="text-xl text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Need help with your job search?</h3>
              <p className="text-gray-600 mb-4">
                Our career advisors can help you find the perfect opportunities and optimize your profile.
              </p>
              <button className="text-sm text-purple-600 font-medium hover:underline">
                Contact career support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;