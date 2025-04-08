import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Web Developer at TechCorp",
    text: "NextStep completely transformed my career trajectory. Their AI-driven guidance helped me identify the exact skills I needed to transition from frontend to full-stack development, resulting in a 40% salary increase within a year.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    role: "Lead Data Scientist at Finova",
    text: "The personalized learning paths were game-changing. I went from basic Python skills to machine learning expert in 8 months, thanks to NextStep's curated resources and project recommendations.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "UX Design Lead at CreativeMinds",
    text: "As a career changer, I was lost until I found NextStep. Their skill gap analysis identified exactly what I needed to learn, and their job matching system connected me with my dream company.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    rating: 5
  },
  {
    id: 4,
    name: "Marcus Wright",
    role: "AI Research Engineer at NeuroTech",
    text: "NextStep's salary negotiation tools helped me increase my compensation package by $28,000. Their market insights gave me the confidence to ask for what I was worth.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} inline-block`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-teal-500 font-medium tracking-wider uppercase">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Transforming Careers with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">NextStep</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto mt-6"></div>
        </div>

        {/* Testimonials */}
        <div className="relative">
          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="w-32 h-32 rounded-full bg-teal-400/10 blur-3xl"></div>
          </div>

          <Slider {...settings} className="pb-16">
            {TestimonialData.map((data) => (
              <div key={data.id} className="px-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="flex items-start mb-6">
                    <div className="relative mr-5">
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur opacity-75"></div>
                      <img
                        src={data.img}
                        alt={data.name}
                        className="relative w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white">{data.name}</h3>
                      <p className="text-teal-500 text-sm font-medium">{data.role}</p>
                      <div className="mt-1">
                        {renderStars(data.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative flex-grow mb-6">
                    <FaQuoteLeft className="absolute text-teal-400/10 text-5xl -top-2 -left-2" />
                    <p className="text-gray-600 dark:text-gray-300 relative z-10 pl-8 text-lg leading-relaxed">
                      {data.text}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-teal-400/30"></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Verified User
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      
      </div>
    </section>
  );
};

export default Testimonials;