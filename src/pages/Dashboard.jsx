import React from "react";
import { FiPackage } from "react-icons/fi";
import {
  CiShoppingCart,
  CiClock1,
  CiCircleCheck,
  CiWarning,
} from "react-icons/ci";
import { PiCurrencyInr } from "react-icons/pi";
import { Link } from "react-router-dom";
import { orders } from "../data/orderDetail";

const stats = [
  {
    label: "TOTAL PRODUCTS",
    value: "12",
    icon: <FiPackage />,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    label: "TOTAL ORDERS",
    value: "8",
    icon: <CiShoppingCart />,
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
  {
    label: "PENDING ORDERS",
    value: "4",
    icon: <CiClock1 />,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "COMPLETE ORDERS",
    value: "2",
    icon: <CiCircleCheck />,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const getInitials = (fullName) => {
  const words = fullName.trim().split(/\s+/);
  
  const firstInitial = words[0].charAt(0).toUpperCase();
  
  // 3. Get the first letter of the last word (if a last name exists)
  const lastInitial = words.length > 1 
    ? words[words.length - 1].charAt(0).toUpperCase() 
    : ''; 
  return firstInitial + lastInitial;
};


const stockItems = [
  {
    id: 1,
    name: "Apple Watch Ultra 3",
    count: "2 left",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MFTH4ref_VW_34FR+watch-case-49-titanium-natural-ultra3_VW_34FR+watch-face-49-alpine-ultra3_VW_34FR_GEO_IN?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=OWdzNm84VjF3NmhsVTNHd3Myb2gxM2pDV2hhem5qNnpDenFtKzI1OXdzYkpncG05NXptdno5VmVNOFY1RGFaTGY4aHdOQjBiNSszby9Kd0FnejRCcGlCYWZ0M2xobjlJWjF6VEVYcVFORGZDcEVTaFN0QUo1Y1N6Zkw5RjVkNWR1a2gzUUplbzlQZFY1dHUxcGoxNCtKR3ZiM1VVanlXUmVvN3dXbUd0SjFNcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCVVhmcktjOHZXcnlYaElpWVVIbHBSbw",
  },
  {
    id: 2,
    name: "AirPods Pro 3",
    count: "Out of stock",
    img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509?wid=976&hei=916&fmt=jpeg&qlt=90&.v=cmp4MmZ6OWxOeHNNTXh4SzlBNUpEb1RucE9zZTI5eEREaWZpY29lSld3eWVDYXovZDMyN1dXU211bjZoVlVUcWJGcXNRQnFCV0w3WVRjTExvdm1ic1YxRUxFRmRlWDBITzhnRmZ5OTRmaVdKTExiOEFsRmxtQ2Nua0tRSC83MkI",
  },
];

const AdminDashboard = () => {
  return (
    <div className="px-4 py-6 sm:px-12  min-h-screen space-y-6 pb-10">
      <header>
        <div className="flex flex-col  sm:justify-between gap-4 border-gray-100">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back. Here's your store overview.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-3">
            <Link
              to="/admin/products/add"
              className="col-span-2 sm:col-span-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg text-center text-md shadow-sm hover:bg-indigo-700 transition sm:w-48"
            >
              + Add Product
            </Link>
            <Link
              to="/admin/products"
              className="px-4 py-2 bg-white border sm:flex items-center justify-center border-gray-200 text-gray-700 font-medium rounded-lg text-center text-sm shadow-sm hover:bg-gray-50 transition sm:w-44"
            >
              View Products
            </Link>
            <Link
              to="/admin/orders"
              className="px-4 py-2 bg-white border sm:flex items-center justify-center border-gray-200 text-gray-700 font-medium rounded-lg text-center text-sm shadow-sm hover:bg-gray-50 transition sm:w-44"
            >
              View Orders
            </Link>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-2 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-4 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[130px]"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                {item.label}
              </span>
              <div
                className={`${item.bg} ${item.color} p-2 rounded-lg text-xl`}
              >
                {item.icon}
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-800">{item.value}</p>
          </div>
        ))}
      </section>
      <section className="bg-white border border-gray-200 p-5 rounded-2xl hover:shadow-md transition-all flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
            TOTAL REVENUE
          </span>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹2,80,000</p>
        </div>
        <div className="bg-lime-50 text-lime-600 p-3 rounded-xl text-2xl">
          <PiCurrencyInr />
        </div>
      </section>
      <section className="bg-white border border-gray-200 p-5 rounded-2xl hover:shadow-md transition-all flex flex-col">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h2 className="font-semibold">Recent Orders</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest activity from your store
            </p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-4.5 standard-row"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-base tracking-wide">
                  {getInitials(order.customer.name)}
                </div>
                <div>
                  <div className="flex flex-col items-baseline mb-0.5">
                    <span className="font-semibold">{order.id}</span>
                    <span className="text-xs text-gray-400 ">
                      {order.customer.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-lg font-semibold text-gray-900">
                ₹{order.payment.total}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-2">
          <CiWarning className="text-orange-500 text-xl font-bold" />
          <h2 className="font-semibold ">Low Stock Alerts</h2>
        </div>
        <div className="p-4 space-y-4">
          {stockItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${item.count.includes("Out") ? "text-red-500" : "text-orange-500"}`}
                >
                  {item.count}
                </p>
              </div>
            </div>
          ))}
          <button className="w-full mt-2 py-2.5 text-indigo-700 text-sm font-medium border border-indigo-100 rounded-xl bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer">
            View inventory
          </button>
        </div>
      </section>
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50">
          <h2 className="font-semibold">Pending Action</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <CiClock1 className="text-indigo-600 text-xl" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              There are{" "}
              <span className="font-bold text-gray-900">2 orders</span> waiting
              to be processed.
            </p>
          </div>
          <button className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 transition-all text-white rounded-xl font-medium shadow-sm active:scale-[0.98] cursor-pointer">
            Review now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
