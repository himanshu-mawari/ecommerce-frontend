import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { showToast } from "../store/toastSlice";
import { useLoginMutation } from "../services/authService.js";
import { addUser } from "../store/userSlice.js";

const AdminLogin = () => {
  const [email, setEmail] = useState("Himanshu@gmail.com");
  const [password, setPassword] = useState("Himanshu@123");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please fill both fields");
    }

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res.data)
      if (res.data.role === "admin") {
        dispatch(addUser(res?.data))
        dispatch(showToast("Admin login successful"));
        navigate(redirect ? `/${redirect}` : "/admin/dashboard");
      } else {
        dispatch(showToast("Admin access required"));
        navigate("/");
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="pt-8 pb-4 px-6 text-center">
            {/* Keep your exact typography */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your administrative credentials to continue.
            </p>
          </div>

          <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            {/* Error display keeps your original styling */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`mt-2 w-full bg-black text-white py-2.5 rounded-lg font-semibold active:scale-95 duration-300 transition-all cursor-pointer ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Verifying..." : "Login as Admin"}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Link to="/" className="text-sm text-gray-600 hover:underline">
                Back to Store
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
