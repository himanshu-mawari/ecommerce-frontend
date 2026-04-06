import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { addSelectedAddressId } from "../store/addressSlice";


const AddressList = () => {
  const addresses = useSelector((store) => store.address.addresses);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleRadioChange = (id) => {
    dispatch(addSelectedAddressId(id));
  };

  const handleEdit = (id) => {
     navigate(`/address/edit/${id}`)
  }
  return (
    <div className="pt-4">
      <div className="mb-4  ml-5 flex gap-4 items-center cursor-pointer">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </p>
        <h1 className="text-md font-semibold">Select Address</h1>
      </div>
      <div className="border-t border-gray-300 px-5">
        <div className="flex gap-3 items-center border-b border-gray-300 py-4">
          <Link to="/address/new">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </p>
          </Link>
          <h1 className="text-lg font-semibold ">Add New Address</h1>
        </div>
        {addresses.map((address) => (
          <div className="flex justify-between py-5 cursor-pointer border-b border-gray-300 pb-6">
            <div>
              <h1 className="text-lg font-semibold mb-2">{address.name}</h1>
              <div className="geist font-medium">
                <p>
                  {address.houseNo} {address.street}, {address.district}{" "}
                </p>
                <p>
                  {address.state}-{address.pincode}
                </p>
              </div>
              <p className="text-gray-500 geist font-medium mb-4">
                {address.phone}{" "}
              </p>
              <button className="border py-1 px-5 text-lg font-semibold rounded-4xl" onClick={() => handleEdit(address.id)}>
                Edit
              </button>
            </div>
            <input
              type="radio"
              checked={address.id === selectedAddressId}
              onChange={() => handleRadioChange(address.id)}
              className="relative appearance-none w-5 h-5 border border-gray-400 rounded-full bg-white checked:border-black checked:border-[5px]      transition-all cursor-pointer focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md md:max-w-full flex justify-center py-1 ">
          <button className="w-96 geist bg-black text-white py-3 rounded-full font-semibold text-md active:scale-[0.97] transition-all cursor-pointer">
            Ship to this Address 
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressList;
