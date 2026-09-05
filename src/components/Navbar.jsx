import { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { FiHeart } from "react-icons/fi";
import { UserRound, ShoppingCart, Search } from "lucide-react";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWinterOpen, setIsWinterOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, user } = useAuth();
  // const cart = useSelector((store) => store.cart.items)

  const { data: cartData = [] } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

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
    navigate(`/collections/shop-all?q=${searchTerm}`);
  };

  const handleLogout = async () => {
    dispatch(removeUser());
    navigate("/");
    dispatch(showToast("Logout successful"));
  };

  return (
<>
  <div className="max-w-8xl mx-auto px-4 md:px-12 lg:px-14 xl:px-24 h-20 flex items-center justify-between">
    {/* Brand Logo */}
    <div className="cursor-pointer">
      <NavLink to={"/"}>
        <h1 className="monteserrat tracking-tighter font-medium text-4xl flex items-end">
          FOREVER
          <span className="mb-2 ml-1 h-2 w-2 rounded-full bg-indigo-300"></span>
        </h1>
      </NavLink>
    </div>

    {/* Desktop Navigation Links */}
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
        </li>
      ))}
    </ul>

    {/* Header Action Icons */}
    <div className="flex items-center gap-4">
      {/* Search Toggle */}
      <Search
        className="w-5.5 cursor-pointer active:scale-95 transition-transform"
        onClick={() => {
          setIsSearchOpen(!isSearchOpen);
          navigate("/collections/shop-all");
        }}
      />

      {/* Wishlist Link */}
      <Link to="/wishlist">
        <FiHeart className="w-5.5 h-5.5 active:scale-95" />
      </Link>

      {/* Desktop User Profile Icon & Dropdown */}
      <div
        className="relative hidden lg:flex cursor-pointer active:scale-95"
        onMouseEnter={() => window.innerWidth > 768 && setIsDropDown(true)}
        onMouseLeave={() => window.innerWidth > 768 && setIsDropDown(false)}
      >
        <UserRound
          onClick={(e) => {
            e.stopPropagation();
            setIsDropDown(!isDropDown);
          }}
        />

        {/* Desktop Profile Dropdown */}
        {isDropDown && (
          <div className="absolute right-0 top-full pt-2 w-48 z-50">
            <div className="rounded-lg border border-gray-100 bg-white p-2 shadow-xl">
              {isAuthenticated ? (
                <>
                  <div className="border-b border-gray-100 px-3 py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Signed in as
                    </p>
                    <p className="truncate text-xs font-semibold text-gray-900">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <div className="pt-1 flex flex-col gap-0.5">
                    <Link
                      to="/profile-page"
                      onClick={() => setIsDropDown(false)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <UserRound className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsDropDown(false)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setIsDropDown(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsDropDown(false)}
                  className="block rounded-md px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-black text-center"
                >
                  Login / Sign up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Icon */}
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
        {cartData?.items?.length ? (
          <div className="absolute text-white rounded-full bg-black -right-2 bottom-3">
            <p className="w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              {cartData.items.length}
            </p>
          </div>
        ) : null}
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="lg:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img src={assets.menuIcon} className="w-5" alt="menu" />
      </div>
    </div>
  </div>

  {/* Search Bar Dropdown */}
  {isSearchOpen && (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
        isSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
      }`}
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

  {/* Mobile Drawer Overlay Backdrop */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
      onClick={() => setIsOpen(false)}
    />
  )}

  {/* Mobile Navigation Drawer */}
  <div
    className={`fixed top-0 right-0 h-full w-10/12 sm:w-5/12 bg-white z-50 transform transition-transform duration-300 overflow-auto ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex flex-col h-full">
      <div
        onClick={() => setIsOpen(false)}
        className="flex justify-end gap-2 px-8 pt-8 cursor-pointer"
      >
        <X className="size-7" />
      </div>

      <div className="flex min-h-screen flex-col bg-white pt-8 text-black font-sans">
        {/* Mobile Auth Section */}
        <div className="border-b border-gray-100 px-8 pb-5">
          {isAuthenticated ? (
            <Link
              to="/profile-page"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg p-2 -mx-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <p className="text-xl font-semibold tracking-tight text-gray-900">
                Hi, {user?.name || "User"}
              </p>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="inline-block rounded-lg p-2 -mx-2 text-xl font-semibold tracking-tight text-black cursor-pointer hover:bg-gray-50 transition-all"
            >
              Login / Sign up →
            </Link>
          )}
        </div>

        {/* Mobile Nav Links */}
        <div className="flex flex-col py-2">
          {navLinks.map((link) => {
            const isWinter = link.label.toUpperCase() === "WINTERS";

            if (isWinter) {
              return (
                <div key={link.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setIsWinterOpen(!isWinterOpen)}
                    className="flex w-full items-center justify-between px-8 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="text-2xl font-medium tracking-tight">
                      {link.label}
                    </span>
                    <ChevronRight
                      className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                        isWinterOpen ? "rotate-90 text-black" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isWinterOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="my-1 flex flex-col bg-gray-50/60 py-2 pl-12 border-l-2 border-black ml-8">
                      <NavLink
                        to="/collections/winter-collection?gender=men"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 text-base font-medium text-gray-600 transition-colors hover:text-black"
                      >
                        Men
                      </NavLink>
                      <NavLink
                        to="/collections/winter-collection?gender=women"
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 text-base font-medium text-gray-600 transition-colors hover:text-black"
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
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-8 py-3 text-2xl font-medium tracking-tight transition-colors hover:bg-gray-50"
              >
                <span>{link.label}</span>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Footer Links */}
        <div className="mt-auto border-t border-gray-100 px-8 py-8">
          <div className="flex flex-col gap-6">
            <NavLink
              to="/help"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 text-base font-medium text-gray-700 transition-colors hover:text-black"
            >
              <HelpCircle className="h-5 w-5 text-gray-400" />
              <span>Help</span>
            </NavLink>

            <NavLink
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 text-base font-medium text-gray-700 transition-colors hover:text-black"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-gray-400" />
                {cartData?.items?.length ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {cartData.items.length}
                  </span>
                ) : null}
              </div>
              <span>Bag</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 text-base font-medium text-gray-700 transition-colors hover:text-black"
            >
              <Heart className="h-5 w-5 text-gray-400" />
              <span>Favourites</span>
            </NavLink>

            <NavLink
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 text-base font-medium text-gray-700 transition-colors hover:text-black"
            >
              <Package className="h-5 w-5 text-gray-400" />
              <span>Orders</span>
            </NavLink>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3.5 text-base font-medium text-red-600 transition-colors hover:text-red-700 pt-2"
              >
                <LogOut className="h-5 w-5 text-red-500" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  );
};

export default Navbar;
