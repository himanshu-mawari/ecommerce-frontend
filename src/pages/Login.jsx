import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate , useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("himanshumawari2006@gmail.com");
  const [password, setPassword] = useState("Himanshu@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");

  console.log(location)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("please fill both field");
    }

    const fakeUser = { id: Date.now().toString(), email}

    dispatch(addUser(fakeUser));
    // localStorage.setItem("user" ,JSON.stringify(fakeUser))
    navigate(redirect ? `/${redirect}` : "/");
  };

  return (
    <div className="py-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full  bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="pt-8 pb-4 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Log in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              value={password}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <p className="text-sm text-red-500">{error}</p>

          <button
            type="submit"
            className="mt-2 w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all cursor-pointer"
          >
            Sign in
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{"  "}
            <a className="font-semibold text-black hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
