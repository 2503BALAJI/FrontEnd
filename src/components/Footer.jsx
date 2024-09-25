import React from 'react';
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
    <footer className='w-full py-8'>
      <div className='container mx-auto w-11/12 bg-white  py-6 rounded-2xl'>
        
        {/* Navigation links */}
        <nav className='w-full flex justify-center items-center gap-6 mb-8'>
          <a href='#project' className=' hover:underline'>Project</a>
          <a href='#question' className='hover:underline'>Question</a>
          <a href='#about' className=' hover:underline'>About Us</a>
        </nav>

        {/* Social icons */}
        <div className='flex justify-center gap-6 mb-8'>

          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
            <img src={facebook} alt='Facebook' className='h-8 w-8 hover:opacity-75' />
          </a>
          <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
            <img src={linkedin} alt='LinkedIn'  className='h-8 w-8 hover:opacity-75' />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
            <img src={instagram} alt='Instagram'  className='h-8 w-8 hover:opacity-75' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
            <img src={twitter} alt='Twitter' className='h-8 w-7 hover:opacity-75' />
          </a>
          <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
            <img src={youtube} alt='Youtube' className='h-8 w-8 hover:opacity-75' />
          </a>

        </div>

        {/* Description or text */}
        <div className='text-center  mb-8'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a arcu nisi. Nullam nec odio metus.</p>
        </div>

        {/* Contact details */}
        <div className='flex justify-center space-x-6'>
  <p className='flex items-center gap-2 '>
    <span className='h'>
      <IoIosMail size={24} /> {/* Adjust the size as needed */}
    </span>
    example23@gmail.com
  </p>
  <p className='flex items-center gap-2 '>
    <span className='icon-phone'>
      <LuPhoneCall size={24} /> {/* Adjust the size as needed */}
    </span>
    983423XXXX
  </p>
  <p className='flex items-center gap-2 '>
    <span className='icon-home'>
      <FaRegAddressCard size={24} /> {/* Adjust the size as needed */}
    </span>
    Address goes here
  </p>
</div>

            {/* Copyright and Legal Information */}
        <div className='text-center flex justify-center  mt-8 border-t border-white pt-4'>
          <p>© 2024 Legacy Land Investment . All rights reserved.</p>
          <p>
            <a href='/privacy-policy' className='hover:underline'>Privacy Policy</a> | 
            <a href='/terms-of-service' className='hover:underline'> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
