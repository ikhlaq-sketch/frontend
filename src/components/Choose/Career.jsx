import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AICareerGuidance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <Navbar />

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              AI Career Guidance
            </span>
          </h1>
          <p className="text-xl text-teal-600 dark:text-teal-400 font-medium mb-2">
            Your Smart Career Companion
          </p>
        </div>
        
        <div className="space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Leverage cutting-edge artificial intelligence to navigate your career journey. 
              Our system analyzes your skills, aspirations, and market trends to provide 
              personalized advice that accelerates your career growth.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you're exploring AI careers, developing skills, or preparing for emerging tech roles, 
              our AI-powered platform helps you make data-driven decisions with confidence.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform analyzes your strengths and weaknesses, recommending relevant courses, 
              certifications, and job opportunities that align with your career goals.
            </p>
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Login">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
            
            <button className="px-8 py-3 border-2 border-teal-500 text-teal-500 dark:text-teal-400 font-medium rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-300">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            How Our AI Helps You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Personalized Recommendations",
                description: "Get career suggestions tailored to your unique skills and interests",
                icon: "🎯"
              },
              {
                title: "Skill Gap Analysis",
                description: "Identify exactly what skills you need to reach your career goals",
                icon: "📊"
              },
              {
                title: "Market Insights",
                description: "Stay ahead with real-time data on job trends and opportunities",
                icon: "🔍"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerGuidance;