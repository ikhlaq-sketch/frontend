import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChartLine, FaUser, FaArrowRight } from "react-icons/fa";
import Logo from "../../assets/features/logo.png";

export default function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
  
    if (!username) {
      navigate("/login");
      return;
    }
  
    let parsedRecommendations = [];
  
    if (location.state?.recommendations) {
      if (typeof location.state.recommendations === "string") {
        parsedRecommendations = JSON.parse(location.state.recommendations);
      } else {
        parsedRecommendations = location.state.recommendations;
      }
  
      if (Array.isArray(parsedRecommendations)) {
        setRecommendations(parsedRecommendations);
        localStorage.setItem(
          `${username}_recommendations`,
          JSON.stringify(parsedRecommendations)
        );
      }
    } else {
      const storedRecommendations = localStorage.getItem(`${username}_recommendations`);
      if (storedRecommendations) {
        const parsedStored = JSON.parse(storedRecommendations);
        setRecommendations(Array.isArray(parsedStored) ? parsedStored : []);
      }
    }
  
    setLoading(false);
  }, [location.state?.recommendations, navigate]);
  

  const handleClick = (career) => {
    const username = localStorage.getItem("username");
    navigate("/roadmap", { state: { selectedCareer: career, username } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-5 px-1 py-6 flex items-center">
                    <img src={Logo} alt="Logo" className="h-20 w-20 mr-1" />
          <h1 className="text-2xl font-bold text-teal-600">Career Recommendations</h1>
   
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-teal-50">
                <FaChartLine className="text-2xl text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Personalized Career Matches
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {recommendations.length} suggestions found
            </p>
          </div>

          {Array.isArray(recommendations) && recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-5 hover:border-teal-300 transition-colors cursor-pointer group"
                  onClick={() => handleClick(rec.career)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                        {rec.career}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Recommended based on your profile
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-teal-600">
                        {rec.probability}%
                      </span>
                      <FaArrowRight className="text-gray-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Match score</span>
                      <span>{rec.probability}% compatibility</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full"
                        style={{ width: `${rec.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No recommendations available
              </h3>
              <p className="text-gray-500 mb-6">
                Complete your profile to get personalized career suggestions
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Go to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// payload = {
//   "model": "mistral-small",
//   "messages": [
//       {
//           "role": "system",
//           "content": (
//               "You are an AI that provides structured career roadmaps in valid HTML format."
//               "Use `<strong>` for section titles, `<ul><li>` for bullet points, and clickable `<a>` links."
//               "Ensure all responses strictly follow HTML formatting with no Markdown or special characters.\n\n"
//           )
//       },
//       {
//           "role": "user",
//           "content": (
//               f"Provide a structured roadmap for becoming a {career_name}."
//               "Format the response in clean HTML with the following sections:\n\n"
              
//               "<strong>Career Roadmap for {career_name}</strong><br><br>"

//               "<strong>1. Core Skills</strong><br>"
//               "<ul>"
//               "<li><strong>Skill Name:</strong> Explanation of the skill.</li>"
//               "<li><strong>Skill Name:</strong> Explanation of the skill.</li>"
//               "</ul><br>"

//               "<strong>2. Learning Resources</strong><br>"
//               "<ul>"
//               "<li><a href='URL'>Course Name - Platform</a></li>"
//               "<li><a href='URL'>Course Name - Platform</a></li>"
//               "</ul><br>"

//               "<strong>3. Practical Experience</strong><br>"
//               "<ul>"
//               "<li>Work on real-world projects and contribute to open-source.</li>"
//               "<li>Build a portfolio to showcase your skills.</li>"
//               "</ul><br>"

//               "<strong>4. Job Search Strategies</strong><br>"
//               "<ul>"
//               "<li>Optimize your resume and LinkedIn profile.</li>"
//               "<li>Network with industry professionals.</li>"
//               "</ul><br>"

//               "<strong>5. Final Tips</strong><br>"
//               "<ul>"
//               "<li>Stay updated with industry trends and keep learning.</li>"
//               "<li>Join online communities for knowledge sharing.</li>"
//               "</ul><br>"

//               "Ensure the response follows valid HTML formatting."
//           )
//       },
//   ],
//   "temperature": 0.7,
// }