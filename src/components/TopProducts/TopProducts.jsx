import React from "react";
import Img1 from "../../assets/work/profile.png";
import Img2 from "../../assets/work/goals.png";
import Img3 from "../../assets/work/rec.png";
import Img4 from "../../assets/work/job.png";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Create Your Profile",
    description: "Sign up and let us know your career goals and skills.",
    step: "01"
  },
  {
    id: 2,
    img: Img2,
    title: "Set Career Goals",
    description: "Define where you want to go, and we'll help you get there.",
    step: "02"
  },
  {
    id: 3,
    img: Img3,
    title: "Get Recommendations",
    description: "Receive AI-driven advice tailored to your aspirations.",
    step: "03"
  },
  {
    id: 4,
    img: Img4,
    title: "Apply for Jobs",
    description: "Seamlessly connect with opportunities that match your goals.",
    step: "04"
  },
];


const TopProducts = () => {

  const navigate = useNavigate();
const handleGetStarted = () => {
  const token = localStorage.getItem("access_token");
  navigate(token ? "/dashboard" : "/login");
};
 
  return (
    <section id="top-products">
    <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
              How It Works
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get started in just a few simple steps and unlock your full career potential
          </p>
        </div>

        {/* Body Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Step Number */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                {data.step}
              </div>
              
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Details Section */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {data.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {data.description}
                </p>
                <div className="flex items-center justify-center text-teal-500 font-medium">
                  Learn more <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default TopProducts;