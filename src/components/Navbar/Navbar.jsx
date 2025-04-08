import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToFooter = () => {
    const footerSection = document.getElementById("footer");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const Menu = [
    { id: 1, name: "About us", path: "/about" },
    { id: 2, name: "Services", path: "/service" },
    { id: 3, name: "Contact", action: scrollToFooter },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              NextStep
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {Menu.map((data) => (
                <li key={data.id}>
                  {data.path ? (
                    <button
                      onClick={() => navigate(data.path)}
                      className="font-medium hover:text-gray-200 transition-colors duration-300 px-2 py-1 rounded-md hover:bg-white/10"
                    >
                      {data.name}
                    </button>
                  ) : (
                    <button
                      onClick={data.action}
                      className="font-medium hover:text-gray-200 transition-colors duration-300 px-2 py-1 rounded-md hover:bg-white/10"
                    >
                      {data.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login">
                <button className="font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded-full hover:shadow-md">
                  Login
                </button>
              </Link>
              <Link to="/Reg">
                <button className="font-medium bg-white text-teal-600 hover:bg-gray-100 transition-all duration-300 py-2 px-4 rounded-full hover:shadow-md">
                  Sign Up
                </button>
              </Link>
              <DarkMode />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <DarkMode className="mr-4" />
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-teal-700 to-cyan-700 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-3">
              {Menu.map((data) => (
                <li key={data.id}>
                  {data.path ? (
                    <button
                      onClick={() => {
                        navigate(data.path);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-medium hover:text-gray-200 transition-colors duration-300 px-4 py-3 rounded-md hover:bg-white/10"
                    >
                      {data.name}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        data.action();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-medium hover:text-gray-200 transition-colors duration-300 px-4 py-3 rounded-md hover:bg-white/10"
                    >
                      {data.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-white/20">
              <Link to="/login">
                <button className="w-full font-medium bg-white/10 hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
              <Link to="/Reg">
                <button className="w-full font-medium bg-white text-teal-600 hover:bg-gray-100 transition-all duration-300 py-2 px-4 rounded-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;