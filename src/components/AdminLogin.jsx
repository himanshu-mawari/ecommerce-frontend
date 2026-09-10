import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useLoginMutation } from "../services/authService.js";
import { getSafeRedirect } from "../helpers/redirect.js";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = getSafeRedirect(searchParams, "/admin/dashboard");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please fill both fields");
    }

    setError("");

    try {
      const { data: user } = await login({ email, password }).unwrap();
      if (user?.role === "admin") {
        navigate(redirect);
        toast.success("Admin login successful");
      } else {
        navigate("/");
        toast.success("Logged in successfully");

      }
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="pt-8 pb-4 px-6 text-center">
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
              type="password"
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
  );
};

export default AdminLogin;
