import { useState, useEffect } from "react";
import { addAddresses } from "../store/addressSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import AddressForm from "../components/AddressForm.jsx";

const AddressNew = () => {
  const [form, setForm] = useState({
    pincode: "",
    houseNo: "",
    street: "",
    name: "",
    phone: "",
    district: "",
    state: "",
  });
  const [error, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((store) => store.address.addresses);
  const { id } = useParams();
  const isEdit = Boolean(id);

  const address = addresses.find((a) => a.id === Number(id));

  useEffect(() => {
    if (isEdit && address) {
      setForm(address);
    }
  }, [isEdit, address]);

  const fetchRegion = async () => {
    try {
      console.log(form.pincode.length);

      const res = await fetch(
        `https://api.postalpincode.in/pincode/${form.pincode}`,
      );
      const data = await res.json();
      if (data[0].Status === "Success") {
        const post = data[0].PostOffice[0];

        setForm((prev) => ({
          ...prev,
          district: post.District,
          state: post.State,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (form.pincode?.length === 6) {
      fetchRegion();
    }
  }, [form.pincode]);

  const handleSubmit = () => {
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

    let updateAddress;

    if (isEdit) {
      updateAddress = addresses.map((a) =>
        a.id === Number(id) ? { ...form } : a,
      );
    } else {
      const newAddress = {
        id: Date.now(),
        ...form,
      };

      updateAddress = [...addresses, newAddress];
    }

    localStorage.setItem("shippingAddress", JSON.stringify(updateAddress));
    dispatch(addAddresses(updateAddress));

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
    <div className="py-4 pb-10 ">
      <div className="mb-4  ml-5 flex gap-4 items-center ">
        <Link to="/address/saved">
          <p className="cursor-pointer">
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
        </Link>
        <h1 className="text-lg font-semibold">
          {isEdit ? "Edit Address" : "Add New Address"}
        </h1>
      </div>
      <div className="px-4 py-5 pb-16 border-t border-gray-300">
        <div className="bg-[#f3f4f6] rounded-xl py-3 px-6 mb-6">
          {form.state === "" && form.district === "" ? (
            <>
              <h3 className="text-lg tracking-tighter font-medium text-gray-900 ">
                Enter your pincode below
              </h3>
              <p className="text-md text-gray-500 inter tracking-tighter">
                We'll detect your city and state
              </p>{" "}
            </>
          ) : (
            <>
              <h3 className="text-lg  font-medium text-gray-900 ">
                {form.state}, {form.district}
              </h3>
              <p className="text-md text-gray-500 inter tracking-tighter">
                Location auto-detected
              </p>
            </>
          )}
        </div>

        <div>
          <AddressForm
            form={form}
            handleChange={handleChange}
            error={error}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressNew;
