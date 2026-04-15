import { assets } from "../assets/assets";

const Footer = () => {
  const linkStyle = "relative w-fit cursor-pointer group hover:text-black pb-1";
  const underlineStyle =
    "absolute bottom-0 left-0 w-0 h-[2px] bg-gray-700 transition-all duration-300 group-hover:w-full ";

  return (
    <div>
      <div className="pt-20 pb-10  px-7 md:px-24 lg:px-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:pb-10">
          <div>
            <img src={assets.logo} className="w-32 mb-4" alt="Logo" />
            <p className="text-sm text-gray-600">
              Quality products. Seamless shopping. Delivered to your door.
            </p>
          </div>

          <div>
            <h1 className="text-lg font-medium mb-4 uppercase">Quick links</h1>
            <ul className="text-sm text-gray-600 flex flex-col gap-2">
              <li className={linkStyle}>
                Privacy Policy
                <span className={underlineStyle}></span>
              </li>
              <li className={linkStyle}>
                Returns & Shipping Policy
                <span className={underlineStyle}></span>
              </li>
              <li className={linkStyle}>
                Term & Condition
                <span className={underlineStyle}></span>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-lg font-medium mb-4 uppercase">
              Connect with us
            </h1>
            <ul className="text-sm text-gray-600 flex flex-col gap-2">
              <li className={linkStyle}>
                About Us
                <span className={underlineStyle}></span>
              </li>
              <li className={linkStyle}>
                Contact Us
                <span className={underlineStyle}></span>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-lg font-medium mb-4">Subscribe</h1>
            <div className="flex border border-gray-300 overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                disabled
                className="flex-1 px-3 py-2 text-sm bg-gray-100 outline-none cursor-not-allowed"
              />
              <button
                disabled
                className="bg-black text-white px-4 text-sm opacity-60 cursor-not-allowed shrink-0"
              >
                Join
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Coming soon</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-28 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left */}
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © 2026 Forever. All rights reserved.
          </div>

          {/* Center (optional personal) */}
          <div className="text-xs text-gray-400">Built by Himanshu</div>

          {/* Right */}
          <div className="flex gap-4 text-xs sm:text-sm text-gray-500">
            <span className={linkStyle}>
              Privacy Policy
              <span className={underlineStyle}></span>
            </span>
            <span className={linkStyle}>
              Terms
              <span className={underlineStyle}></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
