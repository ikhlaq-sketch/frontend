import React from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaMobileAlt,
  FaChartLine,
  FaFileAlt,
  FaExchangeAlt
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-teal-400 text-2xl font-bold tracking-wide">NextStep</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered career guidance platform helping professionals navigate 
              their career paths with personalized recommendations and intelligent matching.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/923154252919" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaChartLine className="h-4 w-4 mt-0.5 mr-3 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">AI Career Recommendations</span>
              </li>
              <li className="flex items-start">
                <MdWorkOutline className="h-4 w-4 mt-0.5 mr-3 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Curated Job Opportunities</span>
              </li>
              <li className="flex items-start">
                <IoMdAnalytics className="h-4 w-4 mt-0.5 mr-3 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Resume Matching System</span>
              </li>
              <li className="flex items-start">
                <FaExchangeAlt className="h-4 w-4 mt-0.5 mr-3 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Career Transition Support</span>
              </li>
              <li className="flex items-start">
                <FaFileAlt className="h-4 w-4 mt-0.5 mr-3 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Resume Analysis Tool</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="h-4 w-4 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">support@nextstep.com</p>
                  <p className="text-gray-500 text-xs mt-1">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMobileAlt className="h-4 w-4 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">+92 315 4252919</p>
                  <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9am-5pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NextStep Career Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;