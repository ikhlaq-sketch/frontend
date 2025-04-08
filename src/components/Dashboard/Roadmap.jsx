import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRoad, FaProjectDiagram, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function CareerRoadmap() {
  const location = useLocation();
  const navigate = useNavigate();

  // Debugging: Log location.state values
  console.log("Location state:", location.state);

  const { selectedCareer, username } = location.state || {};  
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Selected Career:", selectedCareer);
    console.log("Username:", username);

    if (!selectedCareer || !username) {
      console.error("Missing selectedCareer or username");
      setError("Missing career information. Please go back and select a career.");
      setLoading(false);
      return;
    }

    const fetchRoadmap = async () => {
      try {
        const response = await fetch("https://nextstep-backend-production.up.railway.app/api/roadmap/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            careerName: selectedCareer,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch roadmap");
        }

        const data = await response.json();
        console.log("Fetched Roadmap:", data);
        setRoadmap(data.roadmap);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setError(error.message || "Error fetching roadmap. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [selectedCareer, username]);

  // Function to process HTML and enhance links
  const processHtmlContent = (html) => {
    if (!html) return html;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = '#3182ce';
      link.style.textDecoration = 'underline';
      link.style.fontWeight = '500';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
    
    return tempDiv.innerHTML;
  };

  const processedRoadmap = processHtmlContent(roadmap);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-teal-600">Career Roadmap</h1>
          {selectedCareer && (
            <p className="text-gray-500">Step-by-step guide for {selectedCareer}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-teal-50 mr-4">
                  <FaRoad className="text-2xl text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedCareer ? `${selectedCareer} Career Path` : "Career Roadmap"}
                  </h2>
                  <p className="text-gray-500">Your personalized learning journey</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/recommendation")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <FaArrowLeft className="mr-2" />
                Back to Recommendations
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Building Your Roadmap</h3>
                <p className="text-gray-500">Creating a personalized career path for you...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading roadmap</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : processedRoadmap ? (
              <div className="space-y-6">
                <div className="prose max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div dangerouslySetInnerHTML={{ __html: processedRoadmap }} />
                </div>

                <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaProjectDiagram className="h-5 w-5 text-teal-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-teal-800">Next Steps</h3>
                      <div className="mt-2 text-sm text-teal-700">
                        <p>
                          After completing this roadmap, check out these{" "}
                          <button
                            onClick={() => navigate("/project", { state: { selectedCareer, username } })}
                            className="font-semibold hover:underline text-teal-600"
                          >
                            practical projects
                          </button>{" "}
                          to apply your skills.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaRoad className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No roadmap available
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find a roadmap for this career path
                </p>
                <button
                  onClick={() => navigate("/recommendation")}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Back to Recommendations
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add global styles for links */}
      <style jsx global>{`
        .prose a {
          color: #3182ce;
          text-decoration: underline;
          font-weight: 500;
        }
        .prose a:hover {
          color: #2c5282;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}