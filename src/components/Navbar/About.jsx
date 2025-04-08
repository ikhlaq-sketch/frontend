import React from "react";
import TeamMember1 from "../../assets/features/ik.png";
import TeamMember2 from "../../assets/features/fa.jpeg";
import TeamMember3 from "../../assets/features/ra.jpeg";

const teamMembers = [
  {
    id: 1,
    img: TeamMember1,
    name: "Ikhlaq Ahmad",
    role: "AI/ML Engineer & Backend Developer",
    description:
      "Ikhlaq specializes in AI-driven solutions and backend architecture, ensuring seamless integration and performance.",
  },
  {
    id: 2,
    img: TeamMember2,
    name: "Faraz Ahmad",
    role: "Frontend Developer",
    description:
      "Faraz specializes in crafting seamless and interactive user experiences, ensuring our platform is both visually stunning and highly functional.",
  },
  {
    id: 3,
    img: TeamMember3,
    name: "Raza Ul Mustafa",
    role: "UI/UX Designer",
    description:
      "Raza transforms complex ideas into intuitive and user-friendly designs, enhancing the overall usability and aesthetic appeal of our platform.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
            Meet Our Team
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A passionate group of innovators dedicated to transforming career
            guidance with AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-3 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-8 flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-teal-100 dark:border-teal-900 group-hover:border-teal-300 transition-all duration-500 z-10"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h2>
                <h3 className="text-lg font-semibold text-teal-500 mb-5 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  {member.role}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                  {member.description}
                </p>
              </div>
              <div className="px-8 pb-8 text-center">
                <button className="px-6 py-2.5 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-all duration-300 rounded-full border border-teal-400 dark:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-teal-500/20">
            Join Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;