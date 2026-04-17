import {
  MapPin,
  Package,
  ChevronRight,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/InputField";
import { editUser } from "../store/userSlice";
import { Link } from "react-router-dom";
import Toast from "../components/Toast.jsx";
import { logout } from "../services/authService.js";
import { removeUser } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((store) => store.user.user);
  const address = useSelector((store) => store.address.addresses);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const orders = useSelector((store) => store.order.order);

  const activeAddress = address.find((addr) => addr.id === selectedAddressId);
  console.log(activeAddress);

  const dispatch = useDispatch();

  const profileFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email Address", type: "email" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(formData));
    setToastMessage("Profile update successfully");
    setShowToast(true);
    setIsEditOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(removeUser());
    navigate("/");
    dispatch(showToast("Logout successful"));
  };

  return (
    <div className="max-w-7xl lg:max-w-full mx-auto bg-white min-h-screen font-sans px-4 md:px-12 lg:px-24 text-black pb-20 py-4 border-t border-gray-300">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold pt-6 uppercase pb-8">
        My Profile
      </h1>

      {/* Main Content Grid */}
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
            <div className="grid grid-cols-1  gap-4">
              <div className="p-6 border border-gray-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={20} className="text-black" />
                    <span className="font-semibold uppercase text-xs tracking-widest text-gray-500">
                      Default Address
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    {activeAddress.state}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {activeAddress.street} <br />
                    Phone: {activeAddress.phone}
                  </p>
                </div>
                <Link to="/address/saved" className="inline-block">
                  <button className="text-black font-semibold border-b border-black text-sm pb-1 hover:text-gray-500 hover:border-gray-500 transition-all cursor-pointer">
                    Manage all addresses
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-8">
          <section className="p-6 bg-gray-50 rounded-3xl">
            <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="flex items-center justify-center gap-3"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden ">
                        {order.items[0]?.image[0] ? (
                          <img
                            src={order.items[0].image[0]}
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package size={20} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold line-clamp-1 md:w-auto">
                          {order.orderId}
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
      <Toast
        message={toastMessage}
        isVisible={showToast}
        setIsVisible={setShowToast}
        duration={2500}
      />
    </div>
  );
};

export default ProfilePage;
