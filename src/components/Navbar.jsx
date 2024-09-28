import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // For the mobile menu toggle
import { useAtom } from "jotai";
import { userAtom } from "../store"; // Import userAtom
import Cookies from "js-cookie"; // Import Cookies

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom); // Get user state from Jotai
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if user UID is stored in cookies
    const uid = Cookies.get("userUid");
    setIsLoggedIn(!!uid); // Update login state based on UID presence
    setUser("in");
  }, [user]); // Re-run the effect when user state changes

  console.log(user);
  // Function to handle logout
  const handleLogout = () => {
    setUser("out"); // Clear user in Jotai state
    Cookies.remove("userUid"); // Remove user UID from cookies
    Cookies.remove("userEmail"); // Remove user email from cookies
    setIsLoggedIn(false); // Set login state to false
    setIsMenuOpen(false); // Close menu on mobile after logout
  };

  // Check if current route is home ("/")
  const isHome = location.pathname === "/";

  return (
    <nav className="bg-blue-600 w-full text-white p-4 shadow-lg fixed top-0 z-50">
      <div className="container w-11/12 mx-auto flex justify-between items-center bg-red-500">
        <a href="/" className="flex items-center space-x-2">
          <p className="text-xl font-bold">Legacy Land Investment</p>
        </a>

        <div className="hidden md:flex space-x-6">
          {isHome && (
            <>
              <a
                href="#about"
                className="hover:text-yellow-200 transition duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-yellow-200 transition duration-300"
              >
                Contact
              </a>
            </>
          )}

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/question"
            className={({ isActive }) =>
              isActive ? "text-yellow-300" : "hover:text-yellow-200"
            }
          >
            Questions
          </NavLink>
        </div>

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
              <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <NavLink
                  to="/profile"
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col md:hidden bg-blue-600 text-white mt-4">
          {isHome && (
            <>
              <a href="#about" className="py-2 px-4 hover:bg-blue-500">
                About
              </a>
              <a href="#contact" className="py-2 px-4 hover:bg-blue-500">
                Contact
              </a>
            </>
          )}
          <NavLink to="/projects" className="py-2 px-4 hover:bg-blue-500">
            Projects
          </NavLink>
          <NavLink to="/question" className="py-2 px-4 hover:bg-blue-500">
            Questions
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="py-2 px-4 hover:bg-blue-500">
                Login
              </NavLink>
              <NavLink to="/signup" className="py-2 px-4 hover:bg-blue-500">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="py-2 px-4 hover:bg-blue-500">
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="py-2 px-4 hover:bg-blue-500"
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
