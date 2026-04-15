import { useParams } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets.js";
import ProductCard from "../components/ProductCard";
import Empty from "../components/Empty.jsx";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const { category, gender } = useParams();
  const location = useLocation();

  const categoryKey = category || "shop-all";
  const search = new URLSearchParams(location.search).get("search") || "";
  const searchKey = search.toLowerCase();
  const displayNameMap = {
    men: ["Men"],
    women: ["Women"],
    kids: ["Kids"],
    "shop-all": ["All Products"],
    "winter-collection": ["Winter", " Collection"],
  };

  const filteredProductData = products.filter((p) => {
    const name = p.name?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";
    const productCategory = p.category?.toLowerCase() || "";
    const subCategory = p.subCategory?.toLowerCase() || "";

    const matchesSearch = searchKey === "" || name.includes(searchKey) || category.includes(searchKey) ;

    const matchesShopAll = categoryKey === "shop-all";

    const matchesWinter =
      categoryKey !== "winter-collection"
        ? true
        : gender && subCategory === "winterwear" && productCategory === gender;

    const matchesCategory = productCategory === categoryKey;

    return (
      matchesSearch && (matchesShopAll || matchesWinter || matchesCategory)
    );
  });

  if (!filteredProductData || filteredProductData.length === 0) {
    return <Empty />;
  }

  const heading =
    category === "winter-collection" && gender
      ? displayNameMap[category]
      : displayNameMap[category] || [category];
  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24   border-t border-gray-300">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl xl:tracking-tight  font-semibold pt-8 pb-8 md:pb-10 poppins flex flex-col md:flex-row ">
        {heading.map((word, i) => (
          <div key={i} className="pb-3 md:pr-2 uppercase">
            {word}
          </div>
        ))}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProductData.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
