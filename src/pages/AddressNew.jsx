import { useState, useEffect } from "react";
import { addAddress, editAddress } from "../store/addressSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AddressForm from "../components/AddressForm.jsx";
import {
  useGetSingleAddressQuery,
  useUpdateAddressMutation,
  useAddAddressMutation,
} from "../services/AddressService.js";
import { useGetUserProfileQuery } from "../services/userService.js";

const AddressNew = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: address, isLoading } = useGetSingleAddressQuery({
    addressId: id,
  },{skip:!id});
  const {data:userData} = useGetUserProfileQuery();


  const [form, setForm] = useState({
    pincode: "",
    houseNo: "",
    street: "",
    district: "",
    state: "",
    name: userData.name ||"",
    phone: userData.phone || "",
  });
  const [error, setErrors] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const user = useSelector((store) => store.user.user);

  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();


  useEffect(() => {
    if (address) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setForm({
        pincode: address?.pincode,
        houseNo: address?.houseNo,
        street: address?.street,
        district: address?.district,
        state: address?.state,
        name: address?.name,
        phone: address?.phone,
      });
    }
  }, [address]);

  const fetchRegion = async () => {
    try {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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

    if (isEdit) {
      updateAddress({
        addressId: id,
        ...form,
      });
    } else {
      addAddress(form )
    }

    navigate(redirect || "/payment");
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

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="pb-12 relative">
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
        <h1 className="text-lg md:text-xl font-semibold">{isEdit ? "Edit Address" : "Add New Address"} </h1>
      </div>

      <div className="px-5 md:px-8 xl:px-24 py-5">
        <div className="bg-[#f3f4f6] rounded-xl py-3 lg:py-5 lg:px-8  px-6 mb-6">
          {form.state === "" && form.district === "" ? (
            <>
              <h3 className="text-lg md:text-xl tracking-tighter font-medium text-gray-900 ">
                Enter your pincode below
              </h3>
              <p className="text-md md:text-lg text-gray-500 inter tracking-tighter">
                We'll detect your city and state
              </p>{" "}
            </>
          ) : (
            <>
              <h3 className="text-lg md:text-xl font-medium text-gray-900 ">
                {form.state}, {form.district}
              </h3>
              <p className="text-md md:text-lg text-gray-500 inter tracking-tighter">
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
            isEdit={isEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressNew;
