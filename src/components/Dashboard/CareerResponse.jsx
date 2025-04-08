import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUserTie, FaLightbulb, FaChartLine, FaSpinner } from "react-icons/fa";
import Logo from "../../assets/features/logo.png";

const CareerResponse = () => {
  const location = useLocation();
  const profileData = location.state?.profileData;

  const [transitionPlan, setTransitionPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to process HTML and enhance links
  const processHtmlContent = (html) => {
    if (!html) return html;
    
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Find all links and add styling
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = '#3182ce'; // Blue color for links
      link.style.textDecoration = 'underline';
      link.style.fontWeight = '500';
      link.target = '_blank'; // Open in new tab
      link.rel = 'noopener noreferrer'; // Security best practice
    });
    
    return tempDiv.innerHTML;
  };

  useEffect(() => {
    console.log("Received Profile Data:", profileData);

    if (!profileData) {
      setError("No profile data received! Please go back and fill in your profile.");
      return;
    }

    if (profileData.careerTransform === "yes") {
      setLoading(true);
      setError("");

      const requestData = {
        username: profileData.username || "test_user",
        previous_job: profileData.previousJob || "Unknown",
        total_experience: profileData.totalExperience || "1",
        skill_level: profileData.skillLevel || "Beginner",
        current_skills: profileData.currentSkills || "None",
        career_field: profileData.careerField || "General",
        future_goal: profileData.futureGoal || "Career growth",
        employment_type: profileData.employmentType || "Full-time",
        work_preference: profileData.workPreference || "Remote",
        expected_salary: profileData.expectedSalary || "50000",
      };

      console.log("Sending Request Data:", requestData);

      fetch("https://nextstep-backend-production.up.railway.app/api/career-transition/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);

          if (data.error) {
            setError(data.error);
            setTransitionPlan("");
          } else {
            const processedHtml = processHtmlContent(data.transition_plan);
            setTransitionPlan(processedHtml || "<p>No career plan available.</p>");
          }
        })
        .catch((error) => {
          console.error("Error fetching career transition plan:", error);
          setError("An error occurred. Please try again.");
          setTransitionPlan("");
        })
        .finally(() => setLoading(false));
    }
  }, [profileData]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-5 px-1 py-6 flex items-center">
                        <img src={Logo} alt="Logo" className="h-20 w-20 mr-1" />
          <h1 className="text-2xl font-bold text-teal-600">Career Transition Plan</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-teal-50">
                <FaUserTie className="text-2xl text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Your Personalized Transition Roadmap</h2>
                <p className="text-gray-500">Based on your profile and career goals</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Building Your Career Plan</h3>
                <p className="text-gray-500">Analyzing your profile and creating a customized roadmap...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error generating career plan</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : transitionPlan ? (
              <div className="space-y-6">
                <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaLightbulb className="h-5 w-5 text-teal-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-teal-800">AI-Generated Career Plan</h3>
                      <div className="mt-2 text-sm text-teal-700">
                        <p>Here's your personalized transition roadmap based on your profile data.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div 
                    className="transition-plan-content"
                    dangerouslySetInnerHTML={{ __html: transitionPlan }}
                    style={{
                      lineHeight: '1.6',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">No career plan available</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Please update your profile and try again.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add global styles for links */}
      <style jsx global>{`
        .transition-plan-content a {
          color: #3182ce;
          text-decoration: underline;
          font-weight: 500;
        }
        .transition-plan-content a:hover {
          color: #2c5282;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default CareerResponse;