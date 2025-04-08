import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const JobsMadeEasy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              Jobs Made Easy
            </span>
          </h1>
          <p className="text-xl text-teal-600 dark:text-teal-400 font-medium">
            Your Smart Job Search Companion
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Jobs Made Easy is designed to simplify the job search and application process. Whether you're looking for your first job, 
              switching careers, or advancing in your field, we make it easier to find the right opportunities. Our AI-powered 
              matching connects you with job listings tailored to your skills, experience, and career goals.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform helps you streamline your job search by offering personalized job recommendations, 
              real-time alerts for openings, and comprehensive application guidance. With intuitive navigation 
              and smart tools, applying for jobs has never been more straightforward.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🔍",
                title: "Smart Matching",
                description: "AI-powered job recommendations based on your profile"
              },
              {
                icon: "⏰",
                title: "Real-time Alerts",
                description: "Instant notifications for new job postings"
              },
              {
                icon: "📝",
                title: "Application Tools",
                description: "Resume builder and cover letter templates"
              },
              {
                icon: "📊",
                title: "Career Insights",
                description: "Salary data and company information"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
              >
                <span className="text-2xl mt-1">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Login">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <button className="px-8 py-3 border-2 border-teal-500 text-teal-500 dark:text-teal-400 font-medium rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-300">
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsMadeEasy;