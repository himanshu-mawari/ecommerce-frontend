import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAddress } from "../store/addressSlice.js";
import InputField from "./InputField.jsx";

const AddressForm = ({ form, handleChange, error, onSubmit, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    dispatch(deleteAddress(form.id));
    navigate("/address/saved");
  };

  const topFields = [
    { name: "pincode", label: "Pincode", type: "number" },
    { name: "houseNo", label: "House/ Flat/ Office No.", type: "text" },
    {
      name: "street",
      label: "Road Name/ Area /Colony",
      type: "textarea",
      full: true,
    },
  ];

  const bottomFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "phone", label: "Phone", type: "number" },
  ];

  return (
    <div className="lg:pb-20">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 pb-10  lg:pb-10 lg:py-5">
          {/* TOP FIELDS */}
          {topFields.map((field) => (
            <InputField
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={handleChange}
              error={error[field.name]}
              className={field.full ? "lg:col-span-2" : ""}
            />
          ))}

          {/* 🔥 DIVIDER */}
          <div className="lg:col-span-2 mt-2">
            <p className="text-gray-500 text-sm mb-4">
              This will be saved as your primary address.
            </p>
            <hr className="border-gray-300 mb-6" />
          </div>

          {/* BOTTOM FIELDS */}
          {bottomFields.map((field) => (
            <InputField
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={handleChange}
              error={error[field.name]}
            />
          ))}

          {/* REMOVE BUTTON (Visible in flow) */}
          {isEdit && (
            <div className="lg:col-span-2 flex justify-start mt-2">
              <button
                type="button"
                className="text-sm text-red-500 geist border-b border-red-500 cursor-pointer active:scale-95 transition-all"
                onClick={handleRemove}
              >
                Remove address
              </button>
            </div>
          )}

          {/* MOBILE (SM/MD) FIXED FOOTER */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-300 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-center py-1">
              <button
                className="w-full geist bg-black text-white py-3 rounded-full font-semibold text-md active:scale-[0.97] transition-all cursor-pointer"
                type="submit"
              >
                Save Address & Pay
              </button>
            </div>
          </div>
        </div>
        {/* 🔥 DESKTOP (LG) STICKY FOOTER */}
        <div className="hidden lg:flex justify-end">
          <div className=" text-gray-500 geist"></div>
          <button
            className="w-md geist bg-black text-white py-4 rounded-full font-semibold geist text-xl active:scale-[0.97] hover:bg-gray-900 transition-all cursor-pointer shadow-lg"
            type="submit"
          >
            Save Address & Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
