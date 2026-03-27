import Hero from "../components/Hero.jsx";
import { products } from "../assets/frontend_assets/assets.js";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const latestProducts = [...products].sort((a, b) => b.date - a.date);
  const latestCollection = latestProducts.slice(0, 10);

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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
          {latestCollection.map((productData) => (
            <ProductCard data={productData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
