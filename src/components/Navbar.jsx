import { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "COLLECTION", path: "/collection" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-14 xl:px-24 h-20 flex items-center justify-between">
        <div className="cursor-pointer">
          <NavLink to={"/"}>

          <img src={assets.logo} className="w-36" />
          </NavLink>
        </div>

        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gray-700 transition-all duration-300 ${
                        isActive ? " ml-4 rounded-full w-1" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          <li>
            <button className="ml-4 px-6 py-1.5 border border-gray-800 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-gray-800 hover:text-white transition-all duration-300">
              Admin Panel
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <img src={assets.searchIcon} className="w-5 cursor-pointer" />

          <div className="relative group cursor-pointer">
            <img src={assets.profileIcon} className="w-5" />

            <div className="absolute top-full left-0 pt-4 hidden group-hover:block transition-all">
              <div className="flex flex-col gap-1 w-40 py-3 px-0 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.1)] rounded-lg border border-gray-100 overflow-hidden animate-fadeIn">
                <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                  My Profile
                </p>
                <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                  Orders
                </p>
                <div className="my-1 border-t border-gray-100"></div>{" "}
                {/* Subtle Divider */}
                <p className="px-5 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors duration-200 font-medium">
                  Logout
                </p>
              </div>
            </div>
          </div>

          <div className="relative cursor-pointer">
            <img src={assets.cartIcon} className="w-5" />
            <p className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-black text-white text-[9px] rounded-full">
              1
            </p>
          </div>

          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img src={assets.menuIcon} className="w-5" />
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full  w-full sm:w-1/3 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 p-3 cursor-pointer"
          >
            <img src={assets.dropdownIcon} className="h-4 rotate-180" />
            <p className="sm:text-lg">Back</p>
          </div>

          <div className="flex flex-col ml-4  text-lg sm:ml-6 sm:text-xl font-medium">
            <NavLink
              onClick={() => setIsOpen(false)}
              className="py-3 pl-6 border-b"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              className="py-3 pl-6 border-b"
              to="/collection"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              className="py-3 pl-6 border-b"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setIsOpen(false)}
              className="py-3 pl-6 border-b"
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
