import { useState, useEffect } from "react";
import { addAddress } from "../store/addressSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddressNew = () => {
  const [form, setForm] = useState({
    pincode: "110091",
    houseNo: "122",
    street: "bhati chowk",
    name: "Himanshu",
    phone: "3928574839",
  });
  const [error, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRegion = async () => {
    console.log(form.pincode);

    const res = await fetch(
      `https://api.postalpincode.in/pincode/${form.pincode}`,
    );
    const data = await res.json();
    console.log(data[0].PostOffice[0].District);
    console.log(data[0].PostOffice[0].State);
  };
  useEffect(() => {
    fetchRegion();
  });

  const handleAddress = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      errors.phone = "Phone must be 10 digits";
    if (!form.pincode) errors.pinCode = "Pin code is required";
    if (!form.street) errors.street = "Street is required";
    if (!form.houseNo) errors.houseNo = "House / Flat / Office No is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    dispatch(addAddress(form));

    // localStorage.setItem("shippingAddress", JSON.stringify(form));

    navigate("/payment");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="py-4 ">
        <div className="mb-4  ml-5 flex gap-4 items-center ">
          <p>
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </p>
          <h1 className="text-lg font-semibold">Add New Address</h1>
        </div>
      <div className="px-5 py-8 pb-16 border-t border-gray-300">
        <div className="bg-[#f3f4f6] rounded-xl py-3 px-6 mb-6">
          <h3 className="text-md font-semibold text-gray-900 ">
            Enter your pincode below
          </h3>
          <p className="text-md text-gray-500 inter tracking-tighter">
            We'll detect your city and state
          </p>
        </div>

        <form action="submit" className="flex flex-col gap-5">
          {[
            { label: "Pincode", name: "pincode", type: "number" },
            { label: "House/ Flat/ Office No.", name: "houseNo", type: "text" },
            {
              label: "Road Name/ Area /Colony",
              name: "street",
              type: "textarea",
            },
            { label: "Name", name: "name", type: "text" },
            { label: "Phone", name: "phone", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              {field.name === "name" && (
                <div className="mt-2 mb-2">
                  <p className="text-gray-500 text-sm mb-4">
                    This will be saved as your primary address.
                  </p>
                  <hr className="border-gray-300 mb-6" />
                </div>
              )}

              <div className="relative">
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder=" "
                    rows={4}
                    className="peer w-full px-4 py-2.5 bg-white border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:border-black transition-all resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 py-3.5 bg-white border font-medium text-md border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:border-black transition-all"
                  />
                )}
                <label
                  className={`absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all         ${field.type === "textarea" ? "peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0" : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"}         peer-placeholder-shown:text-base     peer-placeholder-shown:text-gray-400     peer-placeholder-shown:left-4       peer-focus:-top-2.5     peer-focus:translate-y-0    peer-focus:left-3     peer-focus:text-black     peer-focus:text-sm    pointer-events-none`}
                >
                  {field.label}
                </label>
              </div>
              {error[field.name] && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium ">
                  {error[field.name]}
                </p>
              )}
            </div>
          ))}
        </form>
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]"
          onClick={() => handleAddress()}
        >
          <div className="max-w-md md:max-w-full flex justify-center ">
            <button className="w-96 geist bg-black text-white py-3 rounded-full font-semibold text-md active:scale-[0.97] transition-all cursor-pointer">
              Save Address & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressNew;
