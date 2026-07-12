import React from "react";
import ProductCard from "../components/ProductCard";

const data = [
  {
    _id: "69e4b9724a712e4371b428e2",
    name: "Women's Lavender Bloom Puff Sleeve Top",
    price: 799,
    images: [
      {
        url: "https://res.cloudinary.com/dw5lwzcoe/image/upload/v1780893968/products/pque9sok10s5xpxufgwo.png",
        public_id: "products/pque9sok10s5xpxufgwo",
        _id: "6a26490f23a14ab542e4e76b",
      },
    ],
  },
  {
    _id: "69e4ba604a712e4371b428ec",
    name: "Girl Floral Summer Dress – Pastel Bloom",
    price: 599,
    images: [
      {
        url: "https://res.cloudinary.com/dw5lwzcoe/image/upload/v1776597600/products/knkrwvira89kqipwo6e2.png",
        public_id: "products/knkrwvira89kqipwo6e2",
        _id: "69e4ba604a712e4371b428ed",
      },
    ],
  },
  {
    _id: "6a468386a9c5a1b7f626b8a3",
    name: "Women's Graphic Print Oversized Tee",
    price: 1299,
    images: [
      {
        url: "https://res.cloudinary.com/dw5lwzcoe/image/upload/v1783006085/products/fz2ykjxf9hkgkt95zpaj.jpg",
        public_id: "products/fz2ykjxf9hkgkt95zpaj",
        _id: "6a468386a9c5a1b7f626b8a4",
      },
      {
        url: "https://res.cloudinary.com/dw5lwzcoe/image/upload/v1783006085/products/ysk80gsjfztxzwrunokz.jpg",
        public_id: "products/ysk80gsjfztxzwrunokz",
        _id: "6a468386a9c5a1b7f626b8a5",
      },
      {
        url: "https://res.cloudinary.com/dw5lwzcoe/image/upload/v1783006085/products/ukddovze2is0mdkjpsxt.jpg",
        public_id: "products/ukddovze2is0mdkjpsxt",
        _id: "6a468386a9c5a1b7f626b8a6",
      },
    ],
  },
];

const Wishlist = () => {
  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 border-t">
      <div className="py-8 xl:py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-semibold">Wishlist</h1>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((product) => (
          <div className="relative" key={product._id}>
            <ProductCard data={product} variant="wishlist" />
            <div className="absolute top-1 right-2 z-10">
              <span
                className="bg-gray-100 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-200 transition-colors
              w-8 h-8 p-1.5 
                     sm:w-10 sm:h-10 sm:p-2 
                     md:w-12 md:h-12 md:p-2.5 
                     lg:w-14 lg:h-14 lg:p-3 
                     xl:w-16 xl:h-16 xl:p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x w-full h-full"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </span>
            </div>
            <div className="border border-gray-300 my-1  rounded-full inline-block text-sm ">
              <button className="py-2 px-5">Move to Bag</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
