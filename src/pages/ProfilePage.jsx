import {
  MapPin,
  Package,
  Plus,
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

const ProfilePage = () => {
  const user = useSelector((store) => store.user.user);

  const address = useSelector((store) => store.address.addresses);
  const selectedAddressId = useSelector(
    (store) => store.address.selectedAddressId,
  );
  const orders = useSelector((store) => store.order.order);

  const activeAddress = address.find((addr) => addr.id === selectedAddressId);
  console.log(activeAddress);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
  });

  const dispatch = useDispatch();

  const profileFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email Address", type: "email" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(editUser(formData));
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen font-sans px-4 text-black pb-20 py-4 border-t border-gray-300">
      <h1 className="text-5xl font-semibold  pt-6 uppercase  pb-4">
        My Profile
      </h1>
      {/* 1. USER INFORMATION */}
      <section className=" py-8 border-b border-gray-100">
        <h2 className="text-xl geist pb-7 font-semibold">User Information</h2>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-md tracking-wide  font-semibold  ">
              {user.name}
            </h1>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">+91 {user.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full py-3 border cursor-pointer     border-black font-medium text-md rounded-full active:scale-95 transition-transform"
          onClick={() => setIsEditOpen(!isEditOpen)}
        >
          Edit Profile
        </button>
      </section>
      {isEditOpen && (
        <div>
          <form
            className="space-y-6 max-w-md mx-auto p-4"
            onSubmit={handleSubmit}
          >
            {profileFields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full"
              />
            ))}
            <div className="w-full flex justify-evenly">
              <button
                className=" py-3 px-6 bg-black text-white rounded-lg font-medium"
                type="submit"
              >
                Save changes
              </button>
              <button className=" py-3 px-6 bg-black text-white rounded-lg font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. ADDRESS MANAGEMENT */}
      <section className=" py-8 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl geist  font-semibold ">Shipping Addresses</h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 border border-gray-200 rounded-xl relative group">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-gray-400" />
              <span className="font-semibold text-sm ">
                {activeAddress.state}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed pb-3 ">
              {activeAddress.street} <br />
              Phone: {activeAddress.phone}
            </p>
            <Link to="/address/saved">
              <button className="text-gray-600 bg-gray-200 hover:bg-gray-300 mt-2 px-4 py-1 active:scale-95 rounded-xl transition-all duration-300 cursor-pointer hover:border-gray-500 hover:pb-1">
                Manage address
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. RECENT ORDERS */}
      <section className=" py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl geist font-semibold">Recent Orders</h2>
        </div>

        <div className="space-y-4">
          {orders.slice(0,2).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg active:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className=" p-2 rounded-md ">
                  {<img src={order.items[0].image[0]} className="w-20" /> || (
                    <Package size={20} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold pb-1  tracking-tight">
                    {order.orderId}
                  </p>
                  <p className="text-xs text-gray-500">
                    13-april-2026 • ₹ {order.totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase ${order.color}`}
                >
                  {order.status}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
<Link to="/orders">
        <button className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-md cursor-pointer font-medium border-b border-gray-200   hover:bg-gray-50">
          View All Orders
        </button>
</Link>
      </section>

      {/* 4. ACCOUNT ACTIONS */}
      <section className=" mt-4">
        <button className="flex items-center gap-2 text-red-600 font-semibold   py-4 group cursor-pointer">
          <LogOut
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
          <span>Logout</span>
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
