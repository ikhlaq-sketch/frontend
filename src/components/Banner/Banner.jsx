import React from "react";
import BannerImg from "../../assets/features/data-report-illustration-concept.png";
import { GiBookshelf } from 'react-icons/gi';
import { FaUserAlt, FaRegHandshake, FaRegClock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    const token = localStorage.getItem("access_token");
    navigate(token ? "/dashboard" : "/login");
  };
  const features = [
    {
      icon: <FaUserAlt className="text-xl" />,
      title: "Interactive Profile",
      description: "Guided professional profile setup",
      color: "text-teal-600 dark:text-teal-400"
    },
    {
      icon: <GiBookshelf className="text-xl" />,
      title: "Skill Development",
      description: "Curated learning resources",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: <FaRegHandshake className="text-xl" />,
      title: "Smart Matching",
      description: "AI-powered opportunity matching",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <FaRegClock className="text-xl" />,
      title: "24/7 Access",
      description: "Available whenever you need",
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image section - reduced size */}
          <div className="flex justify-center">
            <img
              src={BannerImg}
              alt="Career growth illustration"
              className="w-full max-w-md object-contain"
              loading="lazy"
            />
          </div>

          {/* Text content section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Elevate Your Career with {" "}
                <span className="text-teal-600 dark:text-teal-400">NextStep</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Personalized career guidance and resources tailored to your professional journey.
              </p>
            </div>

            {/* Minimalist features grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 border border-gray-100 dark:border-gray-700 rounded-lg"
                >
                  <div className={`mt-0.5 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Single refined CTA */}
            <button className="mt-4 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300" onClick={handleGetStarted}>
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;