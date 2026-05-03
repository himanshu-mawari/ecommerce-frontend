import { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronRight,
  HelpCircle,
  Heart,
  Package,
  LogOut,
  X,
} from "lucide-react";
import { removeUser } from "../store/userSlice.js";
import { showToast } from "../store/toastSlice";
import { useGetCartQuery } from "../services/cartService.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWinterOpen, setIsWinterOpen] = useState(false);
  const [isDropDowm, setIsDropDown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cart = useSelector((store) => store.cart.items);

  const { data: cartData = [] , isLoading} = useGetCartQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { label: "Men", path: "/men" },
    { label: "Women", path: "/women" },
    { label: "Kids", path: "/kids" },
    { label: "Winters", path: "/winter-collection" },
    { label: "Shop all", path: "/shop-all" },
  ];

  const handleSearch = (searchTerm) => {
    navigate(`/collections/shop-all?search=${searchTerm}`);
  };

  const handleLogout = async () => {
    dispatch(removeUser());
    navigate("/");
    dispatch(showToast("Logout successful"));
  };


  return (
    <>
      <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-14 xl:px-24 h-20 flex items-center justify-between">
        <div className="cursor-pointer">
          <NavLink to={"/"}>
            <h1 className="monteserrat tracking-tighter font-medium text-4xl flex items-end">
              FOREVER
              <span className="mb-2 ml-1 h-2 w-2 rounded-full bg-indigo-300"></span>
            </h1>
          </NavLink>
        </div>
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group uppercase">
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
                {link.label.toUpperCase() === "WINTERS" ? (
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

                      <div className="h-1px w-[85%] bg-gray-100 mx-auto"></div>

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

        <div className="flex items-center gap-6  ">
          <img
            src={assets.searchIcon}
            className="w-5 cursor-pointer active:scale-95  transition-transform"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            alt="search toggle"
          />

          <div
            className="relative  cursor-pointer active:scale-95"
            onMouseEnter={() =>
              window.innerWidth > 768 && setIsDropDown(!isDropDowm)
            }
            onMouseLeave={() => window.innerWidth > 768 && setIsDropDown(false)}
          >
            <img
              src={assets.profileIcon}
              className="w-5"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropDown(!isDropDowm);
              }}
            />

            <div
              className={`absolute top-full -right-24 pt-4 z-50 ${isDropDowm ? "block" : "hidden"}   transition-all`}
            >
              <div className="flex flex-col gap-1 w-32 py-3 px-0 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.1)] rounded-lg border border-gray-100 overflow-hidden animate-fadeIn">
                <Link to="/profile-page">
                  <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                    My Profile
                  </p>
                </Link>
                <Link to="/orders">
                  <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                    Orders
                  </p>
                </Link>
                <p className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors duration-200">
                  Admin Panel
                </p>
                <div className="my-1 border-t border-gray-100"></div>{" "}
                {/* Subtle Divider */}
                <p
                  className="px-5 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors duration-200 font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>

          <div className="relative cursor-pointer active:scale-95">
            <Link to="/checkout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
            <div
              className={`absolute text-white rounded-full ${cartData?.items?.length ? "bg-black" : ""} -right-2 bottom-3`}
            >
              <p className=" w-4 h-4 flex justify-center text-xs ">
                {cartData?.items?.length ? cartData?.items?.length : ""}
              </p>
            </div>
          </div>

          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img src={assets.menuIcon} className="w-5" />
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${isSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-10 focus:outline-none focus:border-black transition-all text-sm"
                autoFocus
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
              />
              <img
                src={assets.searchIcon}
                className="w-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
                alt="search"
              />
            </div>

            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="size-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-10/12  sm:w-5/12 bg-white z-50 transform transition-transform duration-300 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col  h-full">
          <div
            onClick={() => setIsOpen(false)}
            className="flex justify-end gap-2 px-8 pt-8 cursor-pointer"
          >
            <X className="size-7" />
          </div>

          <div className="flex flex-col bg-white min-h-screen text-black font-sans pt-20 ">
            {navLinks.map((link) => {
              if (link.label.toUpperCase() === "WINTERS") {
                return (
                  <div key={link.label} className="flex flex-col">
                    {/* Main Link Row */}
                    <div
                      onClick={() => setIsWinterOpen(!isWinterOpen)}
                      className="flex items-center justify-between px-8 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl font-medium tracking-tight">
                        {link.label}
                      </span>
                      <ChevronRight
                        className={`w-7 h-7 transition-transform duration-300  ${
                          isWinterOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isWinterOpen
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col pb-2">
                        <NavLink
                          to="/collections/winter-collection"
                          onClick={() => setIsOpen(false)}
                          className="py-3 pl-10 text-lg text-gray-600 hover:text-black transition-colors"
                        >
                          Men
                        </NavLink>
                        <NavLink
                          to="/collections/winter-collection"
                          onClick={() => setIsOpen(false)}
                          className="py-3 pl-10 text-lg text-gray-600 hover:text-black transition-colors"
                        >
                          Women
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  to={`/collections/${link.path}`}
                  className="flex items-center justify-between px-8 py-2  text-2xl inter  font-medium tracking-tight hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-7 h-7 " />
                </NavLink>
              );
            })}
            <div className="mt-auto px-8 py-8 flex flex-col pt-20 gap-6">
              <div className="flex flex-col gap-6">
                <NavLink
                  to="/help"
                  className="flex items-center gap-4 text-xl font-medium"
                >
                  <HelpCircle className="w-6 h-6 text-gray-500" />
                  <span>Help</span>
                </NavLink>

                <NavLink
                  to="/cart"
                  className="flex items-center gap-4 text-xl font-medium"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-7" // Increased size slightly for the mobile menu look
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

                    <p className="absolute -top-1 -right-1 bg-black text-[9px] flex items-center justify-center text-white rounded-full w-4 h-4">
                      1
                    </p>
                  </div>

                  <span>Bag</span>
                </NavLink>
                <NavLink
                  to="/favourites"
                  className="flex items-center gap-4 text-xl font-medium"
                >
                  <Heart className="w-6 h-6 text-gray-500" />
                  <span>Favourites</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  className="flex items-center gap-4 text-xl font-medium"
                >
                  <Package className="w-6 h-6 text-gray-500" />
                  <span>Orders</span>
                </NavLink>

                <button
                  className="flex items-center gap-4 text-xl font-medium mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-6 h-6 text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
