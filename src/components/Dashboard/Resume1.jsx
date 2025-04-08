import React, { useEffect, useState } from 'react';
import { FaFileUpload, FaChartPie, FaLightbulb, FaBook, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlineWork, MdOutlineVideoLibrary } from 'react-icons/md';
import Logo from "../../assets/features/logo.png";

function Resume1() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('analysis');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://nextstep-backend-production.up.railway.app/api/upload-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setAnalysis(data);
      setActiveTab('analysis');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
  <div className="max-w-7xl mx-5 px-1 py-6 flex items-center">
    <img src={Logo} alt="Logo" className="h-20 w-20 mr-1" />
    <h1 className="text-2xl font-bold text-teal-600">Smart Resume Analyzer</h1>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-teal-50">
                <FaFileUpload className="text-2xl text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Upload Your Resume</h2>
                <p className="text-gray-500">Get personalized feedback and recommendations</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF Resume (Max 5MB)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-teal-50 file:text-teal-700
                      hover:file:bg-teal-100"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isUploading || !file}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isUploading || !file ? 'bg-teal-600' : 'bg-teal-700 hover:bg-teal-800'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Resume Preview */}
        {previewUrl && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-800">Resume Preview</h2>
            </div>
            <div className="p-0">
              <iframe 
                src={previewUrl} 
                className="w-full h-[500px] border-0"
                title="Resume Preview"
              />
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'analysis'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaChartPie className="mr-2" />
                  Analysis
                </button>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'recommendations'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaLightbulb className="mr-2" />
                  Recommendations
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'resources'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaBook className="mr-2" />
                  Resources
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'analysis' && <AnalysisTab analysis={analysis} />}
              {activeTab === 'recommendations' && <RecommendationsTab analysis={analysis} />}
              {activeTab === 'resources' && <ResourcesTab analysis={analysis} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced AnalysisTab component with improved UI
function AnalysisTab({ analysis }) {
  return (
    <div className="space-y-6">
      <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FaChartPie className="h-5 w-5 text-teal-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-teal-800">Resume Analysis Report</h3>
            <div className="mt-2 text-sm text-teal-700">
              <p>Here's your personalized resume analysis! </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Basic Information</h4>
          <ul className="space-y-2 text-sm">
            {/* <li className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium">{analysis.basic_info.name}</span>
            </li> */}
            <li className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{analysis.basic_info.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Contact:</span>
              <span className="font-medium">{analysis.basic_info.contact || 'Not provided'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Experience Level:</span>
              <span className="font-medium capitalize">{analysis.basic_info.level}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Resume Score</h4>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Completion</span>
              <span className="text-sm font-medium text-teal-600">{analysis.score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-teal-600 h-2.5 rounded-full" 
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            This score evaluates the completeness and effectiveness of your resume content.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Feedback & Suggestions</h4>
        <ul className="space-y-3">
          {analysis.feedback.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2 mt-0.5">•</span>
              <span className="text-sm" dangerouslySetInnerHTML={{ __html: item }}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Enhanced RecommendationsTab component
function RecommendationsTab({ analysis }) {
  const [enhancedRecommendations, setEnhancedRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (analysis?.skills?.existing?.length > 0) {
      fetchEnhancedRecommendations();
    }
  }, [analysis]);

  // const fetchEnhancedRecommendations = async () => {
  //   setLoading(true);
  //   try {
  //     // Mock API call - replace with actual implementation
  //     await new Promise(resolve => setTimeout(resolve, 1500));
  //     setEnhancedRecommendations([
  //       "Advanced Data Visualization",
  //       "Cloud Architecture",
  //       "Machine Learning Operations",
  //       "Agile Project Management"
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching enhanced recommendations:", error);
  //     setEnhancedRecommendations(analysis.skills.recommended || []);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchEnhancedRecommendations = async () => {
    setLoading(true);
    try {
      // Get the user's existing skills from the analysis
      const existingSkills = analysis.skills.existing.join(", ");
      const experienceLevel = analysis.basic_info.level;
      const field = analysis.skills.field || "technology"; // Default to technology if field not specified
  
      // Call Mistral API with a well-structured prompt
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}` // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            {
              role: "system",
              content: `You are a career advisor specializing in ${field}. Provide 4-6 specific skill recommendations that would complement the user's existing skills and help them progress in their career. Consider their experience level (${experienceLevel}). Return only a JSON array of skill names, no additional text.`
            },
            {
              role: "user",
              content: `My current skills are: ${existingSkills}. What specific skills should I learn next to advance my career in ${field} as a ${experienceLevel} professional?`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3 // Lower temperature for more focused recommendations
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
  
      const data = await response.json();
      const recommendations = JSON.parse(data.choices[0].message.content);
      
      // Ensure we always have an array to work with
      if (Array.isArray(recommendations)) {
        setEnhancedRecommendations(recommendations);
      } else {
        // Fallback to system recommendations if API response format is unexpected
        setEnhancedRecommendations(analysis.skills.recommended || []);
      }
    } catch (error) {
      console.error("Error fetching enhanced recommendations:", error);
      // Fallback to system recommendations if API fails
      setEnhancedRecommendations(analysis.skills.recommended || []);
    } finally {
      setLoading(false);
    }
  };

  const hasSystemRecommendations = analysis.skills.recommended?.length > 0;
  const hasAIRecommendations = enhancedRecommendations?.length > 0;

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FaLightbulb className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Skills Analysis</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Based on your current skills and experience level.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Your Current Skills</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.skills.existing.map((skill, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {hasSystemRecommendations && (
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Recommended Skills</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.recommended.map((skill, index) => (
              <span 
                key={`sys-${index}`} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-gray-800">AI-Enhanced Recommendations</h4>
          {loading && (
            <span className="inline-flex items-center text-sm text-teal-600">
              <FaSpinner className="animate-spin mr-2" />
              Analyzing...
            </span>
          )}
        </div>
        
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        ) : hasAIRecommendations ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enhancedRecommendations.map((skill, index) => (
              <div key={`ai-${index}`} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <span className="flex-shrink-0 h-5 w-5 text-purple-500 mr-2">•</span>
                  <span className="font-medium text-gray-800">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {hasSystemRecommendations 
              ? "Using system recommendations as fallback"
              : "No skill recommendations available"}
          </p>
        )}
      </div>
    </div>
  );
}

// Enhanced ResourcesTab component
function ResourcesTab({ analysis }) {
  const [aiCourses, setAiCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call - replace with actual implementation
  
    const fetchAiCourseRecommendations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Extract relevant user data from analysis
        const existingSkills = analysis.skills.existing.join(", ");
        const field = analysis.skills.field || "technology";
        const experienceLevel = analysis.basic_info.level;
    
        // Call Mistral API for course recommendations
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`
          },
          body: JSON.stringify({
            model: "mistral-tiny",
            messages: [
              {
                role: "system",
                content: `You are a ${field} career advisor. Recommend 4-6 online courses with:
                - Exact course name
                - Platform (Coursera, Udemy, edX)
                - Direct URL
                - 1-sentence relevance explanation
                Return JSON format: { courses: [{ name, platform, url, reason }] }`
              },
              {
                role: "user",
                content: `I'm a ${experienceLevel} in ${field} with skills: ${existingSkills}.
                Suggest courses to advance my career.`
              }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });
    
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    
        const data = await response.json();
        const result = JSON.parse(data.choices[0]?.message?.content || '{}');
        
        if (result?.courses?.length > 0) {
          setAiCourses(result.courses.map(course => ({
            name: course.name || "Unnamed Course",
            link: course.url || "#",
            platform: course.platform || "Unknown Platform",
            reason: course.reason || "Recommended for your career growth"
          })));
        } else {
          throw new Error("No courses found in response");
        }
    
      } catch (err) {
        console.error("Course recommendation error:", err);
        setError("Personalized recommendations unavailable. Showing default courses.");
        
        // Fallback default courses
        setAiCourses([
          { 
            name: `${field} Fundamentals`, 
            link: "https://www.coursera.org/search?query=" + encodeURIComponent(field),
            platform: "Coursera",
            reason: "Great starting point for your field"
          },
          { 
            name: `Advanced ${field} Specialization`, 
            link: "https://www.edx.org/search?q=" + encodeURIComponent(field),
            platform: "edX",
            reason: "For deeper knowledge in your area"
          },
          { 
            name: `${field} Professional Certificate`, 
            link: "https://www.udemy.com/courses/search/?q=" + encodeURIComponent(field),
            platform: "Udemy",
            reason: "Practical skills for professionals"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAiCourseRecommendations();
  }, [analysis]);

  return (
    <div className="space-y-8">
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FaBook className="h-5 w-5 text-purple-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800">Learning Resources</h3>
            <div className="mt-2 text-sm text-purple-700">
              <p>Curated resources to help you grow professionally.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-800">
            Recommended Courses for {analysis.skills.field}
          </h4>
          {loading && (
            <span className="inline-flex items-center text-sm text-teal-600">
              <FaSpinner className="animate-spin mr-2" />
              Loading...
            </span>
          )}
        </div>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-gray-200 rounded mr-3 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : aiCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiCourses.map((course, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <a 
                      href={course.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base font-medium text-gray-800 hover:text-teal-600 hover:underline flex items-center"
                    >
                      {course.name}
                      <FaExternalLinkAlt className="ml-1.5 text-xs text-gray-400" />
                    </a>
                    <div className="mt-1 text-xs text-gray-500">
                      {course.link ? new URL(course.link).hostname.replace('www.', '') : 'Unknown source'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No course recommendations available</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <MdOutlineVideoLibrary className="mr-2 text-teal-600" />
            Resume Writing Tips
          </h4>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm">
            <iframe 
              src={`https://www.youtube.com/embed/${analysis.videos.resume.split('v=')[1]}`}
              title="Resume Tips"
              allowFullScreen
              className="w-full h-64"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <MdOutlineWork className="mr-2 text-teal-600" />
            Interview Preparation
          </h4>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm">
            <iframe 
              src={`https://www.youtube.com/embed/${analysis.videos.interview.split('v=')[1]}`}
              title="Interview Tips"
              allowFullScreen
              className="w-full h-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume1;