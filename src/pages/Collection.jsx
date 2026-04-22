import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/productService.js";

const Collection = () => {
  const { category } = useParams();

  let filters = {};

  if (category === "shop-all") {
    filters = {};
  } else if (["men", "women", "kids"].includes(category)) {
    filters.category = category;
  } else {
    filters.collectionType = category;
  }

  const { data, isLoading, error } = useGetProductsQuery(filters);
  console.log(data);

  const products = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t border-gray-300">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold pt-8 pb-8">
        {category}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
