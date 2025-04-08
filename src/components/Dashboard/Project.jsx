import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCode, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

export default function Project() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCareer, username } = location.state || {};  
  const [projects, setProjects] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!selectedCareer || !username) {
      setErrorMessage("Missing selected career or username.");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        console.log("Fetching projects for:", selectedCareer, "Username:", username);

        const response = await fetch("https://nextstep-backend-production.up.railway.app/api/projects/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, careerName: selectedCareer }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Projects:", data);

        if (!data || typeof data.projects !== "string") {
          throw new Error("Invalid project data format received.");
        }

        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCareer, username]);

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

  const processedProjects = processHtmlContent(projects);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-teal-600">Career Projects</h1>
          {selectedCareer && (
            <p className="text-gray-500">Handpicked projects for {selectedCareer}</p>
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
                  <FaCode className="text-2xl text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedCareer ? `${selectedCareer} Projects` : "Recommended Projects"}
                  </h2>
                  <p className="text-gray-500">Practical projects to boost your skills</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/roadmap", { state: { selectedCareer, username } })}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <FaArrowLeft className="mr-2" />
                Back to Roadmap
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-teal-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Loading Projects</h3>
                <p className="text-gray-500">Fetching the best projects for your career path...</p>
              </div>
            ) : errorMessage ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading projects</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : processedProjects ? (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: processedProjects }} />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaCode className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No projects available
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any projects for this career path
                </p>
                <button
                  onClick={() => navigate("/roadmap", { state: { selectedCareer, username } })}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Back to Roadmap
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