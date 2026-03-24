import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center  mt-5 mx-4 md:mx-10 lg:mx-28">
      <div>
        <img src={assets.logo} alt="logo" className="w-36" />
      </div>

      <div>
        <ul className=" hidden text-gray-700 font-bold lg:flex gap-7 text-sm">
            <li>Home</li>
            <li>Collection</li>
            <li>About</li>
            <li>Contact</li>
            <li>Admin Panel</li>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <img src={assets.searchIcon} alt="search icon" className="w-5" />
        </div>
        <div>
          <img src={assets.profileIcon} alt="profile icon" className="w-5" />
        </div>
        <div>
          <img src={assets.cartIcon} alt="cart icon" className="w-5" />
        </div>
        <div className="lg:hidden">
          <img src={assets.menuIcon} alt="menu icon" className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
