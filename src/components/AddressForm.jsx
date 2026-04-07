import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAddress } from "../store/addressSlice.js";

const AddressForm = ({ form, handleChange, error, onSubmit, isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    dispatch(deleteAddress(form.id));
    navigate("/address/saved");
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
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
                className="peer w-full px-4 py-2.5 border border-gray-500 rounded-lg"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 py-3.5 border border-gray-500 rounded-lg"
              />
            )}

            <label
              className="absolute left-4 top-3.5 text-gray-500 transition-all cursor-text
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1
                /* This part keeps the label up if there is text in the field */
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
            >
              {field.label}
            </label>
          </div>

          {error[field.name] && (
            <p className="text-red-500 text-sm mt-1 ml-1">
              {error[field.name]}
            </p>
          )}
        </div>
      ))}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-300 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md md:max-w-full flex justify-center py-1 ">
          <button className="w-96 geist bg-black text-white py-3 rounded-full font-semibold text-md active:scale-[0.97] transition-all cursor-pointer" type="submit">
            Save Address & Pay
          </button>
        </div>
      </div>
      {isEdit && (
        <span className=" text-right ">
          <button
          type="button"
            className="text-sm geist border-b cursor-pointer active:scale-95"
            onClick={() => handleRemove()}
          >
            Remove address
          </button>
        </span>
      )}
    </form>
  );
};

export default AddressForm;
