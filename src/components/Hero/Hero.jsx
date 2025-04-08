import React from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/features/h1.png";
import Image2 from "../../assets/features/hero2.png";
import Image3 from "../../assets/features/h5.png";
import Slider from "react-slick";
import { FaArrowRight } from "react-icons/fa";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: (
      <h1>
        Unlock Career Opportunities with{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
          NextStep 
        </span>
      </h1>
    ),
    description:
      "Discover your perfect career path with our intelligent recommendation system. NextStep analyzes your skills, interests, and market trends to provide personalized guidance.",
    cta: "Find Your Path"
  },
  {
    id: 2,
    img: Image2,
    title: (
      <h1>
        Transform Your Passion Into{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
          Your Dream Career
        </span>
      </h1>
    ),
    description:
      "Our AI-powered platform matches you with ideal career options and provides the exact skills you need to succeed in today's competitive job market.",
    cta: "Explore Careers"
  },
  {
    id: 3,
    img: Image3,
    title: (
      <h1>
        Future-Proof Your Career with{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
          Smart Skill Development
        </span>
      </h1>
    ),
    description:
      "Get personalized learning recommendations and stay ahead of industry trends with our dynamic skill-building platform.",
    cta: "Build Skills"
  },
];

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("access_token");
    navigate(token ? "/dashboard" : "/login");
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    customPaging: i => (
      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mt-8"></div>
    ),
  };

  return (
    <div className="relative overflow-hidden min-h-[600px] sm:min-h-[750px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 flex justify-center items-center duration-200">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-teal-400 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-400 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container pb-8 sm:pb-0 relative z-10">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 px-4 sm:px-6">
                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                    {data.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                    {data.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={handleGetStarted}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      {data.cta} <FaArrowRight />
                    </button>
                    <button
  className="border-2 border-teal-500 text-teal-500 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium py-3 px-8 rounded-full transition-all duration-300"
  onClick={() => {
    document.getElementById("top-products")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  How It Works
</button>

                  </div>
                </div>

                {/* Image Content */}
                <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-3xl opacity-20 blur-xl"></div>
                    <img
                      src={data.img}
                      alt="Career Growth"
                      className="relative w-full max-w-[500px] lg:max-w-none object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Hero;