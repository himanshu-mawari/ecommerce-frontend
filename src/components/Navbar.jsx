import { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWinterOpen, setIsWinterOpen] = useState(false);

  const navLinks = [
    { label: "MEN", path: "/men" },
    { label: "WOMEN", path: "/women" },
    { label: "KIDS", path: "/kids" },
    { label: "WINTERS", path: "/winter-collection" },
    { label: "SHOP All", path: "/shop-all" },
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
                to={`/collections/${link.path}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
              <div>
                {link.label === "WINTERS" ? (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block transition-all duration-300 z-50">
                    <div className="flex flex-col w-44 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.15)] rounded-xl border border-gray-100 overflow-hidden animate-fadeIn">
                      <NavLink
                        to="/collections/winter-collection/men"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className={({ isActive }) =>
                          `px-5 py-3 text-sm flex items-center justify-between transition-all duration-200 group/item
                          ${isActive ? "bg-gray-50 text-black font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`
                        }
                      >
                        <span>Men</span>
                        <span className="text-xs opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200">
                          →
                        </span>
                      </NavLink>

                      {/* Elegant Divider */}
                      <div className="h-[1px] w-[85%] bg-gray-100 mx-auto"></div>

                      {/* Women Link */}
                      <NavLink
                        to="/collections/winter-collection/women"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className={({ isActive }) =>
                          `px-5 py-3 text-sm flex items-center justify-between transition-all duration-200 group/item
                          ${isActive ? "bg-gray-50 text-black font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`
                        }
                      >
                        <span>Women</span>
                        <span className="text-xs opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200">
                          →
                        </span>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 ">
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
                <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                  Admin Panel
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
            <Link to="/checkout">
              <img src={assets.cartIcon} className="w-5" />
            </Link>
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
        <div className="flex flex-col text-gray-600  h-full">
          <div
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 p-3 cursor-pointer"
          >
            <img src={assets.dropdownIcon} className="h-4 rotate-180" />
            <p className="sm:text-lg">Back</p>
          </div>

          <div className="flex flex-col ml-4 text-lg sm:ml-6 sm:text-lg font-medium">
            {navLinks.map((link) => {
              if (link.label === "WINTERS") {
                return (
                  <div key={link.label} className="flex flex-col border-b">
                    <div
                      onClick={() => setIsWinterOpen(!isWinterOpen)}
                      className="py-3 pl-6 flex justify-between items-center pr-6 cursor-pointer hover:text-black"
                    >
                      <span>{link.label}</span>
                      <img
                        src={assets.dropdownIcon}
                        className={`h-3 transition-transform ${isWinterOpen ? "-rotate-90" : "rotate-0"}`}
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 bg-gray-50 ${isWinterOpen ? "max-h-40" : "max-h-0"}`}
                    >
                      <NavLink
                        to="/collections/winter-collection/men"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="py-3 pl-12 block text-sm border-b hover:text-black"
                      >
                        Men
                      </NavLink>
                      <NavLink
                        to="/collections/winter-collection/women"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="py-3 pl-12 block text-sm hover:text-black"
                      >
                        Women
                      </NavLink>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  onClick={() => setIsOpen(false)}
                  className="py-3 pl-6 border-b hover:text-black"
                  to={`/collections/${link.path}`}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
