import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // For the mobile menu toggle

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle logout (optional)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false); // Close menu on mobile after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
          <div className="flex items-center space-x-2">
            {/* <img src="./img" alt="Logo" className="w-10 h-10" /> */}
            <p className="text-xl font-bold">Legacy Land Investment</p>
          </div>
        </NavLink>

        {/* Centered links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Projects
          </NavLink>
        </div>

        {/* Right-aligned Login/Signup or Profile/Logout */}
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 font-semibold"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 font-semibold"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 hover:text-white transition duration-300 font-semibold">
                Profile
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-white" />
            ) : (
              <HiMenu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 mt-4">
          <NavLink
            to="/about"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/projects"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </NavLink>

          {/* Mobile Login/Signup or Profile/Logout */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="block px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
