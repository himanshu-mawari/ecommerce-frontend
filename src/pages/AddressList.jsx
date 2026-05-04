import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAddress } from "../store/addressSlice";
import { useState } from "react";
import Toast from "../components/Toast.jsx";
import { products } from "../assets/frontend_assets/assets";
import { useGetAllAddressesQuery } from "../services/AddressService.js";
import { useGetCartQuery } from "../services/cartService.js";

const AddressList = () => {
  
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // const addresses = useSelector((store) => store.address.addresses);
  const cart = useSelector((store) => store.cart.items);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );

  const { data: addresses , isLoading } = useGetAllAddressesQuery();
  const {data:cartData} = useGetCartQuery();

  if(isLoading) return <div>Loading</div>

  const handleRadioChange = (id) => {
    dispatch(selectAddress(id));
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/address/edit/${id}`);
  };

  const handleShip = () => {
    if (!selectedAddressId || selectedAddressId.length === 0) {
      setToastMessage("Please select an address first");
      setShowToast(true);
      return;
    }

    navigate("/payment");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  console.log(cart);



  const handleSelectedAddress = (id) => {
    dispatch(selectAddress(id));
    navigate("/payment");
  };



  return (
    <div className="max-w-2xl md:max-w-full mx-auto pb-8">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 py-4 ml-0 px-5  md:px-8 lg:px-12 xl:px-24 flex gap-4 items-center">
        <Link to="/address/saved">
          {" "}
          <p className="cursor-pointer">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 md:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </p>
        </Link>
        <h1 className="text-lg md:text-xl font-semibold">Select Address </h1>
      </div>
      <div className="lg:grid lg:grid-cols-12 gap-6 xl:px-16">
        <div className="lg:col-span-8 px-5 md:px-8 lg:grid lg:grid-cols-2 lg:py-10 lg:gap-x-8 lg:gap-y-5">
          <Link
            to="/address/new"
            className="flex gap-3 items-center py-3
               lg:border lg:border-dashed lg:border-gray-300 
               lg:rounded-xl lg:flex-col lg:justify-center 
               lg:py-6 cursor-pointer hover:bg-gray-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 lg:size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <h1 className="text-md md:text-lg font-semibold">
              Add New Address
            </h1>
          </Link>

          {addresses.map((address) => (
            <div
              key={address._id}
              className={` flex gap-8 lg:gap-4 lg:px-8    py-6 lg:border border-t border-gray-300 cursor-pointer lg:rounded-xl transition-all ${
                address.id === selectedAddressId ? "bg-gray-50/50" : ""
              }`}
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                    {address.name}
                  </h1>
                </div>

                <div className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                  <p className="line-clamp-2">
                    {address.houseNo}, {address.street}
                  </p>
                  <p>
                    {address.district},{" "}
                    <span className="uppercase">{address.state}</span> -{" "}
                    {address.pincode}
                  </p>

                  <div className="mt-2 text-gray-500 font-normal">
                    {address.phone}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    className="px-6 py-2 text-sm font-semibold rounded-full border border-gray-300 hover:border-black active:scale-95 transition-all"
                    onClick={(e) => handleEdit(e, address._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="hidden lg:block px-7 py-2 text-sm font-semibold rounded-full bg-black text-white hover:bg-zinc-800 active:scale-95 transition-all"
                    onClick={() => handleSelectedAddress(address._id)}
                  >
                    Deliver here
                  </button>
                </div>
              </div>
              <div className="lg:hidden flex items-start pt-1">
                <input
                  type="radio"
                  name="address-selection"
                  checked={address._id === selectedAddressId}
                  onChange={() => handleRadioChange(address._id)}
                  className="
                appearance-none 
                w-6 h-6 
                border-2 border-gray-300 
                rounded-full 
                bg-white 
                checked:border-black 
                checked:border-[7px] 
                  transition-all duration-200
                  cursor-pointer 
                  focus:outline-none
                  "
                />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid lg:col-span-4 pt-7 h-fit sticky top-20 right-7">
          <div className="border border-gray-300 rounded-2xl bg-white overflow-hidden ">
            <div
              className="bg-white z-10 cursor-pointer border-b border-gray-200"
              onClick={() => setIsBagOpen(!isBagOpen)}
            >
              <div className="flex justify-between items-center px-5 py-4">
                <h1 className="text-xl inter font-medium">Bag</h1>
                <div className="flex gap-2 text-lg text-gray-500 font-medium items-center">
                  <p>{cart.length} Items</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-5 transition-transform duration-300 ${isBagOpen ? "" : "rotate-180"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {isBagOpen && (
              <div className="max-h-[40vh] overflow-y-auto custom-scrollbar bg-gray-50/30">
                {cartData.items.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="py-5 px-5 inter border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex gap-4 pb-2">
                        <img
                          src={items.product.images[0].url}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="pt-1 text-sm">
                          <h1 className="font-medium">{items.product.name}</h1>
                          <p className="text-gray-500">Size {items.size}</p>
                          <p className="font-semibold mt-1">
                            Rs {formatPrice(items.product.price * items.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className="bg-white z-10 cursor-pointer"
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <div className="flex justify-between items-center px-5 py-4">
                <h1 className="text-xl inter font-medium">Price Details</h1>
                <div className="flex gap-2 text-lg font-semibold items-center">
                  <p className="text-gray-500 font-medium">Rs {cartData.summary.total}</p>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-5 transition-transform duration-300 ${isPriceOpen ? "" : "rotate-180"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {isPriceOpen && (
              <div className="px-5 py-4 bg-gray-50/50 space-y-3 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <p>Bag Total</p>
                  <p>Rs {cartData.summary.subTotal} </p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>Shipping fee</p>
                  <p className=" font-medium">+ 100</p>
                </div>

                <hr className="border-gray-300" />
                <div className="flex justify-between text-lg font-bold">
                  <p>Order Total</p>
                  <p>Rs {cartData.summary.total}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 z-50">
        <div className="max-w-md md:max-w-full   mx-auto">
          <button
            className="w-full bg-black text-white py-3 rounded-full font-semibold  text-md geist active:scale-[0.98] transition-all shadow-lg"
            onClick={() => handleShip()}
          >
            Ship to this Address
          </button>
        </div>
      </div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        setIsVisible={setShowToast}
        duration={2500}
      />
    </div>
  );
};

export default AddressList;
