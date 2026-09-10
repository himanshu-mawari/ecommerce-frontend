import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../services/authService";
import { getSafeRedirect } from "../helpers/redirect";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const safeRedirect = getSafeRedirect(searchParams);

  const [signup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return setError("Please fill both fields");
    }
    try {
      await signup({ name, email, password }).unwrap();
      navigate(safeRedirect);
      toast.success("Signup successful. Complete your profile");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed signup");
    }
  };

  return (
    <div className="py-20 flex items-center justify-center bg-gray-50 px-4 border-t border-gray-300">
      <div className="max-w-md w-full  bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="pt-8 pb-4 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Let's get you started. Please enter your details.
          </p>
        </div>

        <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              placeholder="Enter your email"
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

          <p className="text-sm text-red-500">{error}</p>

          <button
            type="submit"
            className="mt-2 w-full bg-black text-white py-2.5 rounded-lg font-semibold active:scale-95 duration-300 transition-all cursor-pointer"
          >
            Sign up
          </button>

          <Link
            to={"/login"}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <p className="text-center text-sm text-gray-600">
              Already have an account?{"  "}
            </p>
            <p className="font-semibold text-black hover:underline cursor-pointer">
              Sign in
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
