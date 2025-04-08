import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaFileAlt, FaChartBar, FaTrophy, FaInfoCircle } from "react-icons/fa";
import { MdDescription, MdOutlineScore } from "react-icons/md";
import Logo from "../../assets/features/logo.png";

const JobMatch = () => {
    const [resumeFiles, setResumeFiles] = useState([]);
    const [jobDescription, setJobDescription] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setResumeFiles(Array.from(e.target.files));
        setResults(null);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!resumeFiles.length || !jobDescription) {
            setError("Please upload resumes and enter a job description.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("job_description", jobDescription);
            resumeFiles.forEach(file => {
                formData.append("resumes", file);
            });

            const response = await axios.post(
                "https://nextstep-backend-production.up.railway.app/api/match-resumes/",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setResults(response.data.results);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred while processing your request.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-5 px-1 py-6 flex items-center">
                  <img src={Logo} alt="Logo" className="h-20 w-20 mr-1" />
                    <h1 className="text-2xl font-bold text-teal-600">Resume Matcher</h1>
                
                </div>
                
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <FaFileAlt className="mr-2 text-teal-600" />
                                    Upload Resumes & Job Description
                                </h2>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload Your Resumes
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-300 border-dashed rounded-xl">
                                            <div className="space-y-3 text-center">
                                                <FaUpload className="mx-auto h-10 w-10 text-gray-400" />
                                                <div className="flex flex-col items-center text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"
                                                    >
                                                        <span>Browse files</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            multiple
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                            accept=".pdf,.docx,.txt"
                                                        />
                                                    </label>
                                                    <p className="mt-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {resumeFiles.length > 0 
                                                        ? `${resumeFiles.length} file(s) selected`
                                                        : "Supports PDF, DOCX, TXT (max 10MB each)"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div>
                                        <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <MdDescription className="mr-2 text-teal-600" />
                                            Job Description
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <textarea
                                                id="job-description"
                                                rows={8}
                                                className="focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                                                placeholder="Paste the complete job description here..."
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="rounded-md bg-red-50 p-4">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                                                loading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
                                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Results'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-1">
                        {results ? (
                            <div className="space-y-6">
                                {/* Stats Cards */}
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                            <FaChartBar className="mr-2 text-teal-600" />
                                            Matching Statistics
                                        </h2>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                                                <FaFileAlt className="h-6 w-6 text-teal-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Total Resumes</h3>
                                                <p className="text-2xl font-semibold text-gray-900">{resumeFiles.length}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                                                <MdOutlineScore className="h-6 w-6 text-teal-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
                                                <p className="text-2xl font-semibold text-gray-900">
                                                    {(results.reduce((sum, result) => sum + result.score, 0) / results.length).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
                                                <FaTrophy className="h-6 w-6 text-teal-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Top Score</h3>
                                                <p className="text-2xl font-semibold text-gray-900">{results[0].score}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Top Matches */}
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-800">Top Matching </h2>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {results.slice(0, 5).map((result, index) => (
                                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                                            <span className="text-teal-600 font-medium">{index + 1}</span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                                                                {result.filename}
                                                            </h3>
                                                            <div className="flex items-center mt-1">
                                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className="h-full bg-teal-600" 
                                                                        style={{ width: `${result.score * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="ml-2 text-xs font-medium text-gray-500">
                                                                    {result.score.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full 
                                                        ${result.score > 0.7 ? 'bg-green-100 text-green-800' : 
                                                          result.score > 0.4 ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {result.score > 0.7 ? 'Excellent' : 
                                                         result.score > 0.4 ? 'Good' : 'Fair'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        <FaInfoCircle className="mr-2 text-teal-600" />
                                        How It Works
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <ol className="space-y-4 text-sm text-gray-600">
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2">1.</span>
                                            <span>Upload multiple  resumes (PDF, DOCX, or TXT)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2">2.</span>
                                            <span>Paste the complete job description in the text area</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2">3.</span>
                                            <span>Click "Match Resumes" to analyze compatibility</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2">4.</span>
                                            <span>View ranked resumes with match scores</span>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Full Results Table (shown when there are results) */}
                {results && (
                    <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">All Resume Matches</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rank
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Resume
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Match Score
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((result, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.filename}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-teal-600" 
                                                            style={{ width: `${result.score * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="ml-2 text-sm font-medium text-gray-500">
                                                        {result.score.toFixed(2)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full 
                                                    ${result.score > 0.7 ? 'bg-green-100 text-green-800' : 
                                                      result.score > 0.4 ? 'bg-yellow-100 text-yellow-800' : 
                                                      'bg-red-100 text-red-800'}`}>
                                                    {result.score > 0.7 ? 'Excellent match' : 
                                                     result.score > 0.4 ? 'Good match' : 'Low match'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobMatch;