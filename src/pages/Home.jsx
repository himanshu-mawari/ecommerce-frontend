import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import { products } from "../assets/frontend_assets/assets.js";
import ProductCard from "../components/ProductCard.jsx";
import { assets } from "../assets/assets.js";
import { userProfile } from "../services/userService.js";
import { addUser } from "../store/userSlice.js";
import { useDispatch } from "react-redux";

const Home = () => {
  const latestProducts = [...products].sort((a, b) => b.date - a.date);
  const latestCollection = latestProducts.slice(0, 10);

  const bestSellers = [...products].filter((p) => p.bestseller);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const userData = await userProfile();
    dispatch(addUser(userData?.data?.user));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="px-4  sm:px-12 lg:px-28 ">
      <div>
        <Hero />
      </div>

      <div className="flex flex-col items-center mt-14">
        <div className="flex flex-col md:flex-row md:items-center md:pb-3 lg:justify-center">
          <h1 className="text-4xl md:text-3xl lg:text-5xl text-gray-500 mr-2 text-center md:font-medium tracking-wide">
            LATEST
          </h1>
          <div className="flex items-center">
            <h1 className="text-3xl lg:text-4xl text-gray-700 font-medium md:font-semibold mr-2 pb-3 md:pb-0">
              COLLECTIONS
            </h1>
            <div className="w-8 lg:w-12 h-[1.5px] bg-gray-700"></div>
          </div>
        </div>

        <p className="text-center px-9 pb-10 md:pb-12 text-xs font-medium text-gray-600">
          Discover fresh styles curated for the season—crafted to keep you ahead
          in fashion.
        </p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
          {latestCollection.map((productData) => (
            <ProductCard key={productData._id} data={productData} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-14">
        <div className="flex  md:flex-row md:items-center md:pb-3 lg:justify-center">
          <h1 className="text-3xl font-medium md:text-3xl lg:text-5xl text-gray-500 mr-2 text-center md:font-medium tracking-wide">
            BEST
          </h1>
          <div className="flex items-center">
            <h1 className="text-3xl lg:text-4xl text-gray-700 font-medium md:font-semibold mr-2 pb-3 md:pb-0">
              SELLERS
            </h1>
            <div className="w-8 lg:w-12 h-[1.5px] bg-gray-700"></div>
          </div>
        </div>

        <p className="text-center px-9 pb-10 md:pb-12 text-xs font-medium text-gray-600">
          Discover our top picks this season—designed to stay ahead of trends.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4">
          {bestSellers.map((productData) => (
            <ProductCard data={productData} key={productData._id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center py-24  md:py-20 lg:py-24 gap-12 lg:gap-40">
        <div className="flex flex-col items-center text-center">
          <img src={assets.exchangeIcon} className="w-16 pb-4" />
          <p className="font-medium mt-2">Easy Exchange Policy</p>
          <p className="text-sm text-gray-400">
            We offer hassle free exchange policy
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img src={assets.qualityIcon} className="w-16 pb-4" />
          <p className="font-medium mt-2">7 Days Return Policy</p>
          <p className="text-sm text-gray-400">
            We provide 7 day free return policy
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <img src={assets.supportImage} className="w-16 pb-4" />
          <p className="font-medium mt-2">Best Customer Support</p>
          <p className="text-sm text-gray-400">
            We provide 24/7 customer support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
