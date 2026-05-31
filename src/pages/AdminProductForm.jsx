import { useState, useEffect } from "react";
import AdminProductFields from "../components/AdminProductFields";
import { useParams, useNavigate } from "react-router-dom";

const AdminProductForm = () => {
  const initialSizes = [
    { label: "S", stock: 0 },
    { label: "M", stock: 0 },
    { label: "L", stock: 0 },
    { label: "XL", stock: 0 },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    sizes: initialSizes,
    category: "men",
    subCategory: "top",
    images: [],
    previews: [],
  });


  const { productId } = useParams();
  const isEdit = Boolean(productId);
  const navigate = useNavigate();

  const stockItems = [
    {
      _id: 1,
      title: "Apple Watch Ultra 3 Titanium",
      description:
        "Premium titanium smartwatch with advanced fitness tracking and rugged outdoor design.",
      category: "Watch",
      price: 34999,
      img: "https://m.media-amazon.com/images/I/81UVCW0LijL._SX679_.jpg",
      sizes: [
        { label: "S", stock: 5 },
        { label: "M", stock: 0 },
        { label: "L", stock: 0 },
        { label: "XL", stock: 10 },
      ],
    },
    {
      _id: 2,
      title: "AirPods Pro 3 - Active Noise",
      description:
        "Wireless earbuds with active noise cancellation and immersive spatial audio experience.",
      stock: 5,
      category: "Audio",
      price: 24900,
      img: "data:image/webp;base64,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",
      sizes: [
        { label: "S", stock: 0 },
        { label: "M", stock: 0 },
        { label: "L", stock: 0 },
        { label: "XL", stock: 0 },
      ],
    },
  ];

  const selectedProduct = stockItems.find(
    (item) => item._id.toString() === productId,
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isEdit && selectedProduct) {
      setForm({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        sizes: selectedProduct.sizes.map(size => ({...size})),
        previews:[],
        images:[selectedProduct.img]
      });
    }
  }, [productId]);

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
        size.label === selectedSize ? { ...size, stock: value } : size,
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
      images: [...prev.images , ...files],
      previews: [...prev.previews , ...newPreviews]
    }));


  };

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
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-md shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
