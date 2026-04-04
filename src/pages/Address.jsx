import { useState } from "react";
import {addAddress} from "../store/addressSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Address = () => {
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [error , setErrors] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(error)
  const handleAddress = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      errors.phone = "Phone must be 10 digits";
    if (!form.street) errors.street = "Street is required";
    if (!form.city) errors.city = "City is required";
    if (!form.state) errors.state = "State is required";
    if (!form.postalCode) errors.postalCode = "Postal code is required";
    if (!form.country) errors.country = "Country is required";

    if (Object.keys(errors).length > 0) {
      setErrors(errors); 
      return;
    }

    dispatch(addAddress(form));

    // localStorage.setItem("shippingAddress", JSON.stringify(form));

    navigate("/payment");
  };

  const handleChange = (e) => {
    return setForm({...form , [e.target.name]: e.target.value})
  }


  return (
    <div className="px-4 py-6 border-t border-gray-300 border-b pb-16">
      <div className="mb-8">
        <h1 className="text-5xl font-semibold">Address</h1>
      </div>

      <form action="submit" className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.name}</p>
        <input
          type="number"
          placeholder="Phone number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.phone}</p>
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={form.street}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.street}</p>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.city}</p>
        <input
          type="text"
          placeholder="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.state}</p>
        <input
          type="email"
          placeholder="Postal code"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
          />
          <p className="text-red-500 text-sm">{error.postalCode}</p>
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all"
        />
        <p className="text-red-500 text-sm">{error.country}</p>
      </form>
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]"
        onClick={() => handleAddress()}
      >
        <div className="max-w-md md:max-w-full mx-auto">
          <button className="w-full bg-black text-white py-4 rounded-full font-bold text-md active:scale-[0.97] transition-all">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
