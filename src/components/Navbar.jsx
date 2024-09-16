import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around bg-slate-400 p-4 fixed w-full">
      {/* Logo takaycha aahe yethe  */}
      <div className="flex">
        <img src="./img" alt="Logo" />
        {/* <p> LLI</p> */}
      </div>

      <div className="space-x-4">
        <NavLink to="About">About</NavLink>

        <NavLink to="contact">Contact</NavLink>

        <NavLink to="Project">Projects</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
