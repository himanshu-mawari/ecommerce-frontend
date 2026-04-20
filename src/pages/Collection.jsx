import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { listProduct } from "../services/productService.js";
import { useParams } from "react-router-dom";

const Collection = () => {
  const [product, setProduct] = useState([]);
  const {category} = useParams();

  const fetchCollectionProduct = async () => {
    let filters = {};

    if(category === "shop-all"){
      filters = {}
    }
    else if( ["men","women","kids"].includes(category)){
      filters.category = category;
    }
    else{
      filters.collectionType = category
    }

    const res = await listProduct(filters);
    setProduct(res?.data?.data || []);
  };

  useEffect(() => {
    fetchCollectionProduct();
  }, [category]);
  console.log(product);

  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t border-gray-300">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold pt-8 pb-8">
        {category}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {product.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
