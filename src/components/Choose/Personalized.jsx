import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const PersonalizedLearningPaths = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              Personalized Learning Paths
            </span>
          </h1>
          <p className="text-xl text-teal-600 dark:text-teal-400 font-medium">
            Your Custom Roadmap to Career Success
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 max-w-4xl mx-auto">
          <div className="space-y-6 mb-10">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Our AI-powered system crafts a customized learning journey by analyzing your unique profile, including your education, experience, and career aspirations. We identify key skill gaps and recommend the most relevant resources to accelerate your professional growth.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your learning path dynamically evolves as you progress, combining courses, certifications, and practical projects tailored to your specific career goals. Whether you're starting fresh or advancing in your field, we provide the roadmap to make your development both efficient and effective.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "Goal-Oriented Curriculum",
                description: "Aligned with your specific career objectives"
              },
              {
                icon: "📈",
                title: "Adaptive Learning",
                description: "Adjusts based on your progress and feedback"
              },
              {
                icon: "🏆",
                title: "Skill Validation",
                description: "Certifications and projects to prove your expertise"
              },
              {
                icon: "🔄",
                title: "Continuous Updates",
                description: "Regularly refreshed with industry-relevant content"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 mb-10">
            <p className="italic text-gray-700 dark:text-gray-300 mb-3">
              "This personalized approach helped me transition into data science 3x faster than traditional learning methods. The customized path saved me countless hours of irrelevant study."
            </p>
            <p className="font-medium text-teal-600 dark:text-teal-400">
              — Sarah K., Data Scientist
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Login">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Start Your Learning Path
              </button>
            </Link>
            <button className="px-8 py-3 border-2 border-teal-500 text-teal-500 dark:text-teal-400 font-medium rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-300">
              See Sample Paths
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedLearningPaths;