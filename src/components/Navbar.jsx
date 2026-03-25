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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-gray-100">
      <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-28 h-20 flex items-center justify-between">
        <div className="cursor-pointer">
          <img src={assets.logo} className="w-36" />
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
                        isActive ? "w-full" : "w-0 group-hover:w-full"
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

            <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
              <div className="flex flex-col gap-3 w-40 py-4 px-5 bg-white shadow-xl rounded-xl">
                <p className="text-sm">My Profile</p>
                <p className="text-sm">Orders</p>
                <p className="text-sm text-red-500">Logout</p>
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
        className={`fixed w-full top-0 bg-white  p-5 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center mb-8">
          <img src={assets.dropdownIcon} className="h-5 mr-2 rotate-180" />
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Back
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="border-b border-slate-300 pl-3 pb-2"
            >
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
