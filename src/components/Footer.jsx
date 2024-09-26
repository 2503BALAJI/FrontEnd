import React from "react";
import facebook from "../assets/social-icon/icons8-facebook.svg";
import instagram from "../assets/social-icon/icons8-instagram.svg";
import linkedin from "../assets/social-icon/icons8-linkedin.svg";
import twitter from "../assets/social-icon/icons8-x.svg";
import youtube from "../assets/social-icon/icons8-youtube.svg";
import { IoIosMail } from "react-icons/io";
import { LuPhoneCall } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-gray-100">
      <div className="container mx-auto w-11/12 bg-white py-6 px-4 md:px-8 rounded-2xl">
        {/* Navigation links */}
        <nav className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-8">
          <a
            href="#project"
            className="hover:underline text-sm sm:text-base md:text-lg text-gray-700"
          >
            Project
          </a>
          <a
            href="#question"
            className="hover:underline text-sm sm:text-base md:text-lg text-gray-700"
          >
            Question
          </a>
          <a
            href="#about"
            className="hover:underline text-sm sm:text-base md:text-lg text-gray-700"
          >
            About Us
          </a>
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="h-6 w-6 sm:h-8 sm:w-8 hover:opacity-75"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedin}
              alt="LinkedIn"
              className="h-6 w-6 sm:h-8 sm:w-8 hover:opacity-75"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="h-6 w-6 sm:h-8 sm:w-8 hover:opacity-75"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={twitter}
              alt="Twitter"
              className="h-6 w-6 sm:h-8 sm:w-8 hover:opacity-75"
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={youtube}
              alt="Youtube"
              className="h-6 w-6 sm:h-8 sm:w-8 hover:opacity-75"
            />
          </a>
        </div>

        {/* Description or text */}
        <div className="text-center mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Legacy Land Investment is dedicated to providing the highest quality
            investment opportunities. Stay connected for more updates.
          </p>
        </div>

        {/* Contact details */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-gray-700 text-sm sm:text-base md:text-lg mb-8">
          <p className="flex items-center gap-2">
            <IoIosMail size={20} /> {/* Adjust the size as needed */}
            example23@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <LuPhoneCall size={20} /> {/* Adjust the size as needed */}
            983423XXXX
          </p>
          <p className="flex items-center gap-2">
            <FaRegAddressCard size={20} /> {/* Adjust the size as needed */}
            Address goes here
          </p>
        </div>

        {/* Copyright and Legal Information */}
        <div className="text-center flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-8 pt-4 border-t border-gray-200 text-gray-500 text-sm sm:text-base">
          <p>© 2024 Legacy Land Investment. All rights reserved.</p>
          <div>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |
            <a href="/terms-of-service" className="hover:underline">
              {" "}
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
