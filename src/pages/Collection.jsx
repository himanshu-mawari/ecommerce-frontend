import ProductCard from "../components/ProductCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/productService.js";
import CategorySkeleton from "../components/CollectionSkeleton.jsx";
import useDebounce from "../helpers/useDebounce.js";

const Collection = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("q");

  const debounceSearch = useDebounce(searchText);

  const takeCategory = {
    "shop-all": "Shop All",
  };

  let filters = {};
  if (debounceSearch) {
    filters.debounceSearch = debounceSearch;
  }

  else if (category === "shop-all") {
    filters = {};
  } else if (["men", "women", "kids"].includes(category)) {
    filters.category = category;
  } else {
    filters.collectionType = category;
  }

  const { data, isLoading, error } = useGetProductsQuery(filters);

  
  const products = data?.data || {};
  console.log(products)

  if (isLoading)
    return (
      <div>
        <CategorySkeleton />
      </div>
    );
  if (error) return <p>Error...</p>;

  const capitalizeFirstAlphabet = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t border-gray-300">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold pt-8 pb-8">
        {category === "shop-all"
          ? takeCategory[category]
          : capitalizeFirstAlphabet(category)}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
