import {
  MapPin,
  Package,
  ChevronRight,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAllAddressesQuery } from "../services/addressService.js";
import useAuth from "../hooks/useAuth.js";
import { useGetUserOrderQuery } from "../services/orderService.js";
import { useLogoutMutation } from "../services/authService.js";
import { useUpdateUserProfileMutation } from "../services/userService.js";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton.jsx";
import ErrorState from "../components/ErrorState";
import useErrorHandler from "../hooks/useErrorHandler";
import { toast } from "sonner";

const ProfilePage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const { user, isLoading } = useAuth();
  const {
    data: addresses,
    isLoading: addressesLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllAddressesQuery();
  const mostRecentAddress = addresses?.[0];
  const { data: orders, isLoading: orderLoading } = useGetUserOrderQuery();

  const [logout] = useLogoutMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const profileFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email Address", type: "email" },
  ];

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };
    try {
      await updateUserProfile(data).unwrap();
      toast.success("Profile updated successfully");
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed profile update");
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed logout");
    }
  };
  const { message, showRetry } = useErrorHandler(error, "Profile");

  return (
    <div className="max-w-7xl lg:max-w-full mx-auto bg-white min-h-screen font-sans px-4 md:px-12 lg:px-24 text-black pb-20 py-4 border-t border-gray-300">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold pt-6 uppercase pb-8">
        My Profile
      </h1>
      {isLoading || addressesLoading || orderLoading ? (
        <ProfilePageSkeleton />
      ) : isError ? (
        <ErrorState
          message={message}
          onRetry={refetch}
          showRetry={showRetry}
          isRetrying={isFetching}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-18 items-start">
          <div className="lg:col-span-2 space-y-12">
            <section className="pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-6">User Information</h2>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-wide">
                    {user.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} />
                      <span className="text-base">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={18} />
                      <span className="text-base">
                        {user?.phone ? `+91 ${user.phone}` : "Add phone number"}
                      </span>
                    </div>
                  </div>
                </div>

                {!isEditOpen && (
                  <button
                    className="w-full md:w-auto px-10 py-3 border border-black font-medium text-md rounded-full hover:bg-black hover:text-white transition-all active:scale-95 duration-200 cursor-pointer"
                    onClick={() => setIsEditOpen(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditOpen && (
                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileFields.map((field) => (
                        <InputField
                          key={field?.name}
                          field={field}
                          value={formData[field?.name]}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 md:flex-none px-8 py-3 bg-black text-white rounded-full font-medium cursor-pointer active:scale-95 duration-200"
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditOpen(false)}
                        className="flex-1 md:flex-none px-8 py-3 border border-gray-300 rounded-full font-medium cursor-pointer active:scale-95 duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </section>

            <section className="pb-8 border-b border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Shipping Addresses</h2>
              <div className="grid grid-cols-1 gap-4">
                {mostRecentAddress ? (
                  <div className="p-6 border border-gray-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={20} className="text-black" />
                        <span className="font-semibold uppercase text-xs tracking-widest text-gray-500">
                          Default Address
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">
                        {mostRecentAddress?.state}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {mostRecentAddress?.street} <br />
                        Phone: {mostRecentAddress?.phone}
                      </p>
                    </div>
                    <Link
                      to="/address/saved"
                      state={{ manual: true }}
                      className="inline-block"
                    >
                      <button className="text-black font-semibold border-b border-black text-sm pb-1 hover:text-gray-500 hover:border-gray-500 transition-all cursor-pointer">
                        Manage all addresses
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                    <MapPin size={20} className="text-gray-400" />
                    <p className="text-gray-500 text-sm">
                      No shipping address saved yet
                    </p>
                    <Link to="/address/new">
                      <button className="text-black font-semibold border-b border-black text-sm pb-1 hover:text-gray-500 hover:border-gray-500 transition-all cursor-pointer">
                        Add an address
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <section className="p-6 bg-gray-50 rounded-3xl">
              <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {orders?.slice(0, 2).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/orders/${order.orderId}`}
                        className="flex items-center justify-center gap-3"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden ">
                          {order.items[0]?.image ? (
                            <img
                              src={order.items[0].image}
                              alt="product"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold line-clamp-1 md:w-auto">
                            ORD-{order.orderId}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₹ {order.totalAmount}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
              <Link to="/orders">
                <button className="w-full mt-6 py-4 bg-white border border-gray-200 rounded-2xl cursor-pointer font-semibold hover:bg-gray-100 transition-all">
                  View All Orders
                </button>
              </Link>
            </section>

            <div className="mt-8 px-6">
              <button
                className="flex items-center gap-2 text-red-600 font-semibold py-2 group hover:opacity-70 transition-all cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
