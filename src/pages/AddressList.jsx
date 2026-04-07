import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAddress } from "../store/addressSlice";
import { useState } from "react";
import Toast from "../components/Toast.jsx"

const AddressList = () => {
  const addresses = useSelector((store) => store.address.addresses);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
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

  navigate("/payment")
  
};

  return (
    <div className="pt-4 max-w-2xl mx-auto pb-8">
      <div
        className="mb-4 ml-5 flex gap-4 items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="text-md font-semibold">Select Address</h1>
      </div>

      <div className="border-t border-gray-200 px-5">
        <div className="flex gap-4 items-center py-4">
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
          <h1 className="text-md font-semibold">Add New Address</h1>
        </div>

        {addresses.map((address) => (
          <div
          key={address.id}
          onClick={() => handleRadioChange(address.id)}
          className={` flex gap-8  py-6 border-t border-gray-300 cursor-pointer transition-all ${
            address.id === selectedAddressId ? "bg-gray-50/50" : ""
          }`}
          >
            <div className="flex-1">
              <h1 className="text-lg font-semibold mb-1">{address.name}</h1>
              <div className=" leading-5 text-sm font-medium geist  w-auto">
                <p className="line-clamp-2">
                  {address.houseNo}, {address.street}
                </p>
                <p>
                  {address.district},{" "}
                  <span className="uppercase">{address.state}</span> -{" "}
                  {address.pincode}
                </p>
              </div>
              <p className="text-gray-500 mb-4 geist">{address.phone}</p>

              <button
                className="border border-gray-500 py-2 px-5 text-sm font-bold rounded-full hover:bg-black hover:text-white transition-all"
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

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 z-50">
        <div className="max-w-md mx-auto">
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
