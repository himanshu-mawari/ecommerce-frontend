import React from "react";
import { TbCancel } from "react-icons/tb";
import {
  FiPackage,
  FiChevronRight,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import { CiClock1, CiCircleCheck } from "react-icons/ci";
import { statusStyles } from "../data/orderDetail";
import {
  useGetOrderDetailPageDataQuery,
  useChangeOrderStatusMutation,
} from "../services/AdminService";
import { useParams } from "react-router-dom";
import { ORDER_STEPS } from "../helpers/constant";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useGetOrderDetailPageDataQuery(orderId);
  const {
    orderId: id,
    createdAt,
    status,
    items: orderItems,
    subTotal,
    totalAmount,
    shippingFee,
  } = data || {};
  const { name, phone, houseNo, street, district, pincode, state } =
    data?.shippingAddress || {};
  const { method, status: paymentStatus } = data?.paymentDetails || {};

  const [changeOrderStatus, { isLoading: isUpdating }] =
    useChangeOrderStatusMutation(); // top-level, correct

  const handleDateFormat = (mongoDate) => {
    const dateObj = new Date(mongoDate);
    return dateObj.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const capitalize = (str) => str[0].toUpperCase(0) + str.slice(1);

  function getNextStep(orderStatus) {
    const currentIndex = ORDER_STEPS.indexOf(orderStatus);
    if (currentIndex === -1 || currentIndex === ORDER_STEPS.length - 1)
      return null; // already delivered or cancelled
    return ORDER_STEPS[currentIndex + 1];
  }

  const STEP_DATE_FIELD = {
    pending: "createdAt",
    confirmed: "confirmedAt",
    packed: "packedAt",
    shipped: "shippedAt",
    delivered: "deliveredAt",
  };

  function getTimelineSteps(status, order) {
    if (status === "cancelled") {
      const reachedIndex = ORDER_STEPS.reduce((lastIndex, step, i) => {
        const field = STEP_DATE_FIELD[step];
        return order[field] ? i : lastIndex;
      }, 0);
      return ORDER_STEPS.map((step, i) => ({
        step,
        completed: i <= reachedIndex,
        cancelled: false,
      })).concat({ step: "cancelled", completed: true, cancelled: true });
    }
    const currentIndex = ORDER_STEPS.indexOf(status);
    return ORDER_STEPS.map((step, i) => ({
      step,
      completed: currentIndex !== -1 && i <= currentIndex,
      cancelled: false,
    }));
  }
  const STEP_CONFIG = {
    pending: { label: "Order Placed", icon: FiPackage, dateField: "createdAt" },
    confirmed: {
      label: "Confirmed",
      icon: CiCircleCheck,
      dateField: "confirmedAt",
    },
    packed: { label: "Packed", icon: FiPackage, dateField: "packedAt" },
    shipped: { label: "Shipped", icon: FiTruck, dateField: "shippedAt" },
    delivered: {
      label: "Delivered",
      icon: FiCheckCircle,
      dateField: "deliveredAt",
    },
    cancelled: { label: "Cancelled", icon: TbCancel, dateField: "cancelledAt" },
  };

  const handleOrderStatusChange = async (newStatus) => {
    try {
      console.log(newStatus);
      await changeOrderStatus({ orderId, status: newStatus }).unwrap();
    } catch (err) {
      console.error("failure :" + err.message);
    }
  };

  if (isLoading) return <h1>hey dev be patient!!😌🫵🏻</h1>;
  const nextStep = getNextStep(status);
  const steps = getTimelineSteps(status);
  return (
    <div className="max-w-2xl lg:max-w-full mx-auto px-4 sm:px-0 lg:px-6 py-6 pb-24 inter">
      <div className="flex items-center gap-4 sm:gap-0 md:gap-1 w-full">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <div className="flex justify-between items-center flex-1">
          <div>
            <h1 className="text-lg font-bold lg:font-semibold tracking-tight">
              Order #{id}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Placed {handleDateFormat(createdAt)}
            </p>
          </div>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm lg:font-medium font-semibold ${
              statusStyles[status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {capitalize(status)}
          </span>
        </div>
      </div>
      <div className="md:grid md:grid-cols-[60%_1fr] gap-4 md:items-start pt-6">
        <div className=" space-y-6 pb-6">
          <div className="p-5 border border-gray-200 bg-white rounded-2xl shadow-sm flex flex-col">
            <div>
              <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Workflow
              </h2>

              {nextStep ? (
                <p className="text-base font-bold text-gray-900 mt-1 tracking-tighter">
                  Next step :
                  <span className="text-gray-600 ml-1.5 font-semibold">
                    Mark as {nextStep}
                  </span>
                </p>
              ) : status === "delivered" ? (
                <p className="text-base font-bold  mt-1 tracking-tighter">
                  Order delivered —{" "}
                  <span className="text-green-500">complete</span>
                </p>
              ) : status === "cancelled" ? (
                <p className="text-base font-bold text-red-600 mt-1 tracking-tighter">
                  Order cancelled
                </p>
              ) : null}
            </div>
            {(nextStep || !["delivered", "cancelled"].includes(status)) && (
              <div className="mt-5 flex flex-wrap md:flex-row-reverse items-center justify-start md:justify-end gap-3">
                {nextStep && (
                  <button
                    className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#0b1329] hover:bg-[#162245] text-white text-sm font-semibold rounded-xl shadow-sm gap-1.5 transition-all active:scale-[0.98]"
                    onClick={() => handleOrderStatusChange(nextStep)}
                  >
                    <span>Mark as {nextStep}</span>
                    <FiChevronRight className="size-4" />
                  </button>
                )}

                {!["delivered", "cancelled"].includes(status) && (
                  <button className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl shadow-sm gap-2 transition-colors">
                    <TbCancel className="size-4 text-red-500" />
                    <span>Cancel order</span>
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Payment Summary
              </h2>
              <span
                className={`bg-green-100  px-3 py-0.5 rounded-full text-xs font-bold uppercase ${statusStyles[paymentStatus]}`}
              >
                {paymentStatus}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500">Method</span>
              <span className="text-sm font-medium uppercase text-gray-700">
                {method}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{subTotal}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">₹{shippingFee}.00</span>
              </div>
              <div className="flex justify-between pt-3 mt-2 border-t border-gray-200">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">₹{totalAmount}.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 md:order-first">
          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
              Order Timeline
            </h2>
            <div className="space-y-0">
              {steps.map(({ step, completed, cancelled }, i) => {
                const { label, icon: Icon, dateField } = STEP_CONFIG[step];
                const isLast = i === steps.length - 1;
                const timestamp = data[dateField];

                const iconClass = cancelled
                  ? "text-red-600 bg-red-50 border-red-100"
                  : completed
                    ? "text-green-600 bg-green-50 border-green-100"
                    : "text-gray-400 bg-gray-50 border-gray-200";

                return (
                  <div
                    key={step}
                    className={`relative flex gap-4 ${isLast ? "" : "pb-8"}`}
                  >
                    {!isLast && (
                      <div className="absolute left-3.5 top-8 bottom-0 w-px bg-gray-200"></div>
                    )}
                    <div className="relative z-10 bg-white rounded-full">
                      <Icon
                        className={`border p-1.5 size-8 rounded-full ${iconClass}`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className={`font-semibold text-sm ${
                          cancelled
                            ? "text-red-600"
                            : completed
                              ? ""
                              : "text-gray-500"
                        }`}
                      >
                        {label}
                      </h3>
                      {timestamp ? (
                        <span className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                          <CiClock1 className="size-3" />{" "}
                          {new Date(timestamp).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs mt-1 italic">
                          Pending completion
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Items ({orderItems.length})
            </h2>
            <div className="divide-y divide-gray-100">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-4 gap-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover object-top bg-gray-50 border border-gray-100"
                  />
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center justify-center flex-1">
                    <div>
                      <p className="text-sm font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>Size: {item.size}</span>
                        <span className="text-gray-300">|</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="text-sm lg:text-lg lg:font-semibold font-bold text-gray-900 mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Customer
              </h2>
              <div className="mt-4 space-y-3">
                <p className="font-bold text-gray-800">{name}</p>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25Z"
                      />
                    </svg>
                    <span>+91 {phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Shipping Address
              </h2>
              <div className="mt-4 flex gap-3">
                <svg
                  className="size-5 text-gray-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-bold text-gray-800">{name}</p>
                  <p>
                    {houseNo} {street}
                  </p>
                  <p>{district}</p>
                  <p>
                    {state} : {pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button className="w-full flex items-center justify-between px-5 py-4 bg-[#0b1329] active:bg-[#162245] text-white rounded-xl shadow-lg text-sm font-semibold tracking-wide transition-all duration-150">
            <span>Mark as shipped</span>
            <FiChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
