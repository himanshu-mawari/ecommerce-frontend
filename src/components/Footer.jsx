import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="pt-28 pb-6 px-7 md:px-24 lg:px-28">
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8">
          <div>
            <img src={assets.logo} className="w-32 mb-4" />
            <p className="text-sm text-gray-600">
              Quality products. Seamless shopping. Delivered to your door.
            </p>
          </div>

          <div>
            <h1 className="text-lg font-medium mb-4">Company</h1>
            <ul className="text-sm text-gray-600 flex flex-col gap-1">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          <div>
            <h1 className="text-lg font-medium mb-4">Contact</h1>
            <ul className="text-sm text-gray-600 flex flex-col gap-1">
              <li>+1-212-456-7890</li>
              <li>contact@foreveryou.com</li>
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
      <div className="border-t border-gray-200 mt-10 mb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-28 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2026 Forever. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs sm:text-sm text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
