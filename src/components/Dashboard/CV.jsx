import React, { useState } from "react";
import axios from "axios";
import Logo from "../../assets/features/logo.png";

const CV = () => {
  const [showFullSkills, setShowFullSkills] = useState(false);
    const [file, setFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobLoading, setJobLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setExtractedData(null);
        setJobs([]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setExtractedData(null);
            setJobs([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a file.");
            return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post(
                "https://nextstep-backend-production.up.railway.app/api/upload-cv/",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
    
            setExtractedData(response.data);
    
            let searchQuery = response.data.cv_title;
            if (response.data.experience && response.data.experience !== "Not Found") {
                searchQuery += ` ${response.data.experience}`;
            }
    
            if (response.data.cv_title) {
                setJobLoading(true);
                const jobResponse = await fetch(
                    `https://jsearch.p.rapidapi.com/search?query=${searchQuery}`,
                    {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": "205fd467a6msh46fa28326e53b2fp13cc72jsn8d9a2714b0bd",
                            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
                        },
                    }
                );
    
                const jobData = await jobResponse.json();
                setJobs(jobData.data || []);
            }
        } catch (error) {
            console.error("Error processing:", error);
        } finally {
            setLoading(false);
            setJobLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-5 px-4 sm:px-6 lg:px-8 py-6 flex items-center">
                    <img src={Logo} alt="Logo" className="h-16 w-16 mr-4" />
                    <h1 className="text-2xl font-bold text-teal-600">Resume-Based-Search</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Your CV</h1>
                        <p className="text-gray-600">Get personalized job recommendations based on your skills and experience</p>
                    </div>

                    <form 
                        onSubmit={handleSubmit}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <svg 
                                className={`w-16 h-16 ${dragActive ? 'text-teal-500' : 'text-gray-400'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-medium text-gray-700">
                                    {file ? file.name : 'Drag & drop your CV here'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {file ? 'or upload a different file' : 'or click to browse'}
                                </p>
                            </div>
                            <label className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                                <span>Select File</span>
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                            </label>
                        </div>
                        {file && (
                            <div className="mt-6">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-white ${loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} transition-colors`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : 'Analyze CV'}
                                </button>
                            </div>
                        )}
                    </form>

                    {extractedData && (
                        <div className="mt-12">
                            <div className="bg-teal-50 rounded-lg p-6 mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Extracted Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Title</h3>
                                        <p className="text-lg text-gray-800">{extractedData.cv_title || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                                        <p className="text-lg text-gray-800">{extractedData.experience || 'Not specified'}</p>
                                    </div>
                                    <div>
            <h3 className="text-sm font-medium text-gray-500">Skills</h3>
            <div className="flex items-center gap-2">
                <p className={`text-lg text-gray-800 ${showFullSkills ? '' : 'truncate max-w-xs'}`}>
                    {extractedData.skills || 'Not specified'}
                </p>
                {extractedData.skills && extractedData.skills.length > 30 && (
                    <button 
                        onClick={() => setShowFullSkills(!showFullSkills)}
                        className="text-teal-600 hover:text-teal-800 text-sm font-medium whitespace-nowrap"
                    >
                        {showFullSkills ? 'See less' : 'See more'}
                    </button>
                )}
            </div>
        </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Education</h3>
                                        <p className="text-lg text-gray-800">{extractedData.education || 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Jobs</h2>
                                
                                {jobLoading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                                    </div>
                                ) : jobs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {jobs.map((job, index) => (
                                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                                <div className="p-6">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.job_title}</h3>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {job.employer_name} • {job.job_city}, {job.job_country}
                                                            </p>
                                                        </div>
                                                        {job.employer_logo && (
                                                            <img 
                                                                src={job.employer_logo} 
                                                                alt={job.employer_name} 
                                                                className="h-10 w-10 object-contain rounded-full border border-gray-200"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                                            {job.job_description}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                                                                {job.job_employment_type}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {job.job_posted_at_timestamp ? 
                                                                    new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString() : 
                                                                    'Posted date not available'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 px-6 py-4">
                                                    <a 
                                                        href={job.job_apply_link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                                    >
                                                        Apply Now
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">No matching jobs found</h3>
                                        <p className="mt-1 text-gray-500">We couldn't find any jobs matching your CV. Try refining your search.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CV;