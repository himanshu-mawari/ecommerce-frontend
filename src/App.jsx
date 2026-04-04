import Navbar from "./components/Navbar.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Product from "./pages/Product.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Address from "./pages/Address.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice.js";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/collections/:category", element: <Collection /> },
      { path: "/collections/:category/:gender", element: <Collection /> },
      { path: "/checkout", element: <Cart /> },
      { path: "/login", element: <Login /> },
      {
        path: "/address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fakeUser = localStorage.getItem("user");
  //   if (!fakeUser) {
  //     const parseUserData = JSON.parse(fakeUser);
  //     dispatch(addUser(parseUserData));
  //   }
  // }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
