import ProductCard from "../components/ProductCard.jsx";
import {
  useGetRelatedProductQuery,
} from "../services/productService.js";


const RelatedProduct = ({ productId }) => {
  
    const {data:relatedProduct} = useGetRelatedProductQuery(productId);


  return (
    <>
    <div className="pb-6">

      <h1 className="text-4xl font-medium">
        Related<span className="playfair-italic font-light ml-2">products</span>
      </h1>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {relatedProduct?.data.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </>
  );
};

export default RelatedProduct;
