import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAddress } from "../store/addressSlice";
import { useState } from "react";
import Toast from "../components/Toast.jsx";

const AddressList = () => {
  const addresses = useSelector((store) => store.address.addresses);
  const cart = useSelector((store) => store.cart.items);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const [isOpen , setIsOpen] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="max-w-2xl md:max-w-full mx-auto pb-8">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 py-4 ml-0 px-5  md:px-8 flex gap-4 items-center">
        <Link to="/address/saved">
          <p className="cursor-pointer">
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
      <div className="lg:flex">
        <div className="lg:flex-9/12 px-5 md:px-8  lg:grid lg:grid-cols-2 lg:gap-5 lg:py-10">
          <div className="flex gap-3 items-center py-4 lg:border lg:border-dashed lg:border-gray-300 lg:rounded-xl lg:flex-col lg:justify-center ">
            <Link to="/address/new">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
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
            </Link>
            <h1 className="text-md md:text-lg  font-semibold">
              Add New Address
            </h1>
          </div>

          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => handleRadioChange(address.id)}
              className={` flex gap-8 lg:px-6 lg:gap-8   py-6 lg:border border-t border-gray-300 cursor-pointer lg:rounded-xl transition-all ${
                address.id === selectedAddressId ? "bg-gray-50/50" : ""
              }`}
            >
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-semibold mb-1">
                  {address.name}
                </h1>
                <div className=" leading-5 md:leading-6 text-sm md:text-lg font-medium geist  w-auto">
                  <p className="line-clamp-2">
                    {address.houseNo}, {address.street}
                  </p>
                  <p>
                    {address.district},{" "}
                    <span className="uppercase">{address.state}</span> -{" "}
                    {address.pincode}
                  </p>
                </div>
                <p className="text-gray-500 mb-4 md:mt-1 geist">
                  {address.phone}
                </p>

                <button
                  className="border border-gray-500 py-2 px-5 text-sm md:text-lg   font-bold rounded-full hover:bg-black hover:text-white transition-all"
                  onClick={(e) => handleEdit(e, address.id)}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-start pt-1">
                <input
                  type="radio"
                  name="address-selection"
                  checked={address.id === selectedAddressId}
                  onChange={() => handleRadioChange(address.id)}
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
        <div className="border lg:flex-3/12">
          <div>
            <div className="flex justify-between px-4">
              <h1>Bag</h1>
              <div className="flex gap-2">
                <p>{cart.length} Items</p>
                <p onClick={setIsOpen(!isOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </p>
                {<div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 z-50">
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
