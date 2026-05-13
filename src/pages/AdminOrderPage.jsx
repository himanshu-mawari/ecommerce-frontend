import React from "react";
import { CiClock1 } from "react-icons/ci";
import { ImCancelCircle  } from "react-icons/im";

const AdminOrderPage = () => {
    const stats = [ 
        {
        label: "PENDING ORDERS",
        value: "4",
        icon: <CiClock1 />,
        color: "text-orange-600",
        bg: "bg-orange-50",
      },
        {
        label: "CANCELLED ORDERS",
        value: "4",
        icon: <ImCancelCircle  />,
        color: "text-red-600",
        bg: "bg-red-50",
      }
    ]
  return (
    <div className="p-5">
      <div>
        <h1 className="text-3xl font-medium inter mb-0.5">Orders</h1>
        <p className="text-xs text-gray-500">
          Monitor, manage, and process customer purchases.
        </p>
      </div>
      <div className="flex gap-3 mt-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200  rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col p-3 "
          >
            <div className="flex">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                {item.label}
              </span>
              <div
                className={`${item.bg} ${item.color} p-2 rounded-lg text-xl`}
              >
                {item.icon}
              </div>
            </div>
            <p className="text-xl font-medium text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderPage;
