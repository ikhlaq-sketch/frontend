import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Image imports
import Img2 from "../../assets/features/01.jpg";
import Img3 from "../../assets/features/02.jpg";
import Img1 from "../../assets/features/03.jpg";

const ProductsData = [
  {
    id: 2,
    img: Img2,
    title: "Personalized Learning Paths",
    description: "Get recommendations tailored to your career goals",
    link: "/Personalized",
  },
  {
    id: 3,
    img: Img3,
    title: "AI Career Guidance",
    description: "AI-driven insights to boost your career trajectory",
    link: "/Career",
  },
  {
    id: 4,
    img: Img1,
    title: "Jobs Made Easy",
    description: "Unlock the best opportunities for your future",
    link: "/Job",
  },
];


const Products = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">NextStep?</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover how our platform transforms your career journey
          </p>
        </div>

        {/* Cards section with perfectly aligned images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ProductsData.map((data) => (
            <Link to={data.link} key={data.id} className="group">
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Image container with perfect alignment */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                    {data.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {data.description}
                  </p>
                  <div className="flex items-center text-teal-500 text-sm font-medium">
                    Learn more <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Link to="/services">
            <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-md transition-all duration-300">
              Explore All Features
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;