import {
  MapPin,
  Package,
  Plus,
  ChevronRight,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen font-sans text-black pb-20">
      {/* 1. USER INFORMATION */}
      <section className="px-8 py-10 border-b border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              Himanshu
            </h1>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">himanshu@email.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full py-3 border cursor-pointer     border-black font-medium text-sm rounded-full active:scale-95 transition-transform">
          Edit Profile
        </button>
      </section>

      {/* 2. ADDRESS MANAGEMENT */}
      <section className="px-8 py-8 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">
            Shipping Addresses
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-5 border border-gray-200 rounded-xl relative group">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-gray-400" />
              <span className="font-bold text-sm uppercase">Home</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed ">
              B-12, Street Name, Delhi — 110001 <br />
              Phone: +91 XXXXX XXXXX
            </p>
            <button className="text-gray-600 hover:border-b pt-2 transition-all duration-300 cursor-pointer hover:border-gray-500 hover:pb-1   ">
              [ Manage address ]
            </button>
          </div>
        </div>
      </section>

      {/* 3. RECENT ORDERS */}
      <section className="px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">
            Recent Orders
          </h2>
        </div>

        <div className="space-y-4">
          {/* Order Item */}
          {[
            {
              id: "ORD12345",
              status: "Delivered",
              price: "₹ 1299",
              date: "12 Apr 2026",
              color: "text-green-600",
            },
            {
              id: "ORD67890",
              status: "Shipped",
              price: "₹ 899",
              date: "10 Apr 2026",
              color: "text-blue-600",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg active:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-md shadow-sm">
                  <Package size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold  tracking-tight">{order.id}</p>
                  <p className="text-xs text-gray-500">
                    {order.date} • {order.price}
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

        <button className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-md cursor-pointer font-medium border-b border-gray-200   hover:bg-gray-50">
          View All Orders
        </button>
      </section>

      {/* 4. ACCOUNT ACTIONS */}
      <section className="px-8 mt-4">
        <button className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest py-4 group cursor-pointer">
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
