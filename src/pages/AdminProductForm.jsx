import { useState, useEffect } from "react";
import AdminProductFields from "../components/AdminProductFields";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../services/AdminService";
import { useGetProductByIdQuery } from "../services/productService";

const AdminProductForm = () => {
  const initialSizes = [
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 },
    { size: "XXL", stock: 0 },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    sizes: initialSizes,
    category: "",
    subCategory: "",
    collectionType: null,
    images: [],
    previews: [],
  });

  const { productId } = useParams();
  const isEdit = Boolean(productId);
  const navigate = useNavigate();

  const [addProduct] = useAddProductMutation();
  const { data, isLoading } = useGetProductByIdQuery(productId, {
    skip: !isEdit,
  });
  const selectedProduct = data?.data;
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (isEdit && selectedProduct) {
      setForm({
        title: selectedProduct?.name,
        description: selectedProduct?.description,
        price: selectedProduct?.price,
        category: selectedProduct?.category,
        subCategory: selectedProduct?.subCategory,
        sizes: selectedProduct?.sizes.map((size) => ({ ...size })),
        images: selectedProduct?.images.map((img) => ({
          public_id: img.public_id,
          url: img.url,
        })),
        previews: selectedProduct?.images.map((img) => ({
          public_id: img.public_id,
          url: img.url,
        })),
      });
    }
  }, [isEdit, selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStockChange = (selectedSize, value) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((size) =>
        size.size === selectedSize ? { ...size, stock: value } : size,
      ),
    }));
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    if (files.length + form.images.length > 4) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      previews: [...prev.previews, ...newPreviews],
    }));
  };

  const handleProductAdd = async () => {
    const formData = new FormData();

    formData.append("name", form?.title);
    formData.append("description", form?.description);
    formData.append("category", form?.category);
    formData.append("subCategory", form?.subCategory);
    formData.append("price", form?.price);
    if (form?.collectionType) {
      formData.append("collectionType", form?.collectionType);
    }
    formData.append("sizes", JSON.stringify(form?.sizes));

    form?.images.forEach((file, index) =>
      formData.append(`image${index + 1}`, file),
    );

    try {
      if (isEdit) {
        console.log(productId)
        await updateProduct({ data: formData, productId }).unwrap();
      } else {
        await addProduct(formData).unwrap();
        setForm({
          title: "",
          description: "",
          price: "",
          sizes: initialSizes,
          category: "men",
          subCategory: "top",
          images: [],
          previews: [],
        });
      }
    } catch (err) {
      console.error("failed :", err.message);
    }
  };

  if (isLoading) return <div>be patient</div>;

  return (
    <div className="max-w-md mx-auto md:max-w-full px-5 md:px-12 lg:px-6 py-6  min-h-screen font-sans pb-32">
      <div className="mb-6 lg:flex lg:justify-between lg:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-2xl lg:font-semibold font-bold tracking-tight text-gray-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isEdit
              ? "Update product details, pricing, stock, images"
              : "Create a new product for your store"}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-700 text-white hover:bg-indigo-800 hover:shadow-sm rounded-lg font-medium px-6 py-2 text-sm transition-colors cursor-pointer"
          >
            Save Product
          </button>

          <button
            type="button"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium px-6 py-2 text-sm transition-colors cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
      <AdminProductFields
        form={form}
        handleChange={handleChange}
        handleStockChange={handleStockChange}
        handleImage={handleImage}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50 lg:hidden">
        <div className="max-w-md mx-auto">
          <button
            className="w-full bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-md shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
            onClick={() => handleProductAdd()}
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
