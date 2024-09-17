import React from "react";
import { FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa"; // Using react-icons for icons
import background from "../assets/background_img.jpg";
import email_icon from "../assets/Images/email_icon.png";
import chat_icon from "../assets/Images/chat_icon.png";
import call_icon from "../assets/Images/call_icon.png";
import mail_bottom from "../assets/Images/mail_bottom.png";

const Contact_us = () => {
  return (
    <div
      id={"contact"}
      className="py-12 w-full bg-cover  bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto px-4 w-11/12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* EMAIL Section */}
          <div className="bg-white bg-opacity-80 p-6 rounded-lg flex flex-col justify-center items-center shadow-lg">
            <img
              src={email_icon}
              alt="email icon"
              className="p-3 w-16 h-16 object-contain"
            />
            <h2 className="text-2xl font-bold mb-2">EMAIL</h2>
            {/* Link to open Gmail compose page */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=thekingisback010120@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Send Gmail
            </a>
          </div>

          {/* CALL Section */}
          <div className="bg-white bg-opacity-80 p-6 rounded-lg flex flex-col justify-center items-center shadow-lg">
            <img
              src={call_icon}
              alt="call icon"
              className="p-3 w-16 h-16 object-contain"
            />
            <h2 className="text-2xl font-bold mb-2">CALL</h2>
            <p>98347XXXXX</p>
            <p>Monday–Thursday 7:00 am – 3:00 pm</p>
          </div>

          {/* CHAT Section */}
          <div className="bg-white bg-opacity-80 p-6 flex flex-col justify-center items-center rounded-lg shadow-lg">
            <img
              src={chat_icon}
              alt="chat icon"
              className="p-3 w-16 h-16 object-contain"
            />
            <h2 className="text-2xl font-bold mb-2">CHAT</h2>
            <a
              href="https://wa.me/9834XXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              On WhatsApp
            </a>
            <p>Monday – Saturday 7:00 am – 6:00 pm</p>
          </div>
        </div>

        {/* Additional Contacts Section */}
        <div className="flex justify-center items-center flex-col mt-12">
          <div className="mt-8">
            <img
              src={mail_bottom}
              alt="mail bottom"
              className="w-32 h-auto object-contain"
            />
          </div>
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">ADDITIONAL CONTACTS:</h3>
            <p>
              Press Inquiries:{" "}
              <a
                href="mailto:media@honest.com"
                className="text-blue-500 underline"
              >
                media@honest.com
              </a>
            </p>
            <p>
              Influencer Inquiries:{" "}
              <a
                href="mailto:influencers@honest.com"
                className="text-blue-500 underline"
              >
                influencers@honest.com
              </a>
            </p>
            <p>
              Social Brand Partnerships:{" "}
              <a
                href="mailto:social@honest.com"
                className="text-blue-500 underline"
              >
                social@honest.com
              </a>
            </p>
            <p>
              Giving:{" "}
              <a
                href="mailto:socialgoodness@honest.com"
                className="text-blue-500 underline"
              >
                socialgoodness@honest.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact_us;
