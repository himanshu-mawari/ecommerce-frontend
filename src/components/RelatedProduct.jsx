import { enrichedProducts } from "../assets/frontend_assets/assets.js";
import ProductCard from "../components/ProductCard.jsx";

const RelatedProduct = ({ currentProduct }) => {
  const similiar = enrichedProducts.filter(
    (p) =>
      p._id !== currentProduct._id &&
      p.category === currentProduct.category &&
      p.subCategory === currentProduct.subCategory,
  );

  return (
    <>
    <div className="pb-6">

      <h1 className="text-4xl font-medium">
        Related<span className="playfair-italic font-light ml-2">products</span>
      </h1>
    </div>
      <div className="grid grid-cols-2 gap-4">
        {similiar.map((p) => (
          <ProductCard data={p} />
        ))}
      </div>
    </>
  );
};

export default RelatedProduct;
