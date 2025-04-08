import React from "react";
import { FaRobot, FaLightbulb, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaRobot className="text-5xl" />,
    title: "AI-Powered Career Recommendations",
    description: "Get personalized career suggestions based on your skills, experience, and interests using our advanced AI model.",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher className="text-5xl" />,
    title: "Skill Development Guidance",
    description: "Enhance your expertise with AI-driven learning recommendations tailored to your career goals.",
  },
  {
    id: 3,
    icon: <FaBriefcase className="text-5xl" />,
    title: "Job Market Insights",
    description: "Stay ahead with real-time job market trends, salary insights, and high-demand career paths.",
  },
  {
    id: 4,
    icon: <FaLightbulb className="text-5xl" />,
    title: "Personalized Learning Paths",
    description: "Get course recommendations to upskill efficiently and align with industry needs.",
  },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock your full potential with cutting-edge AI-driven career guidance and skill development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/30 rounded-full group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors duration-300">
                  <div className="text-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {service.description}
                </p>
                <button className="mt-6 px-4 py-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors duration-300">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Explore All Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;