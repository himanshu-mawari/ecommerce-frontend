import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import AddressNew from "./pages/AddressNew.jsx";
import AddressList from "./pages/AddressList.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice.js";
import { useEffect } from "react";
import AuthGuard from "./components/AuthGuard.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentGuard from "./components/PaymentGuard.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import CheckoutLayout from "./Layouts/CheckoutLayout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Order from "./pages/Order.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />, // ✅ global error handling
    children: [
      { index: true, element: <Home /> },

      // Product & collections
      { path: "product/:id", element: <Product /> },
      { path: "collections/:category", element: <Collection /> },
      { path: "collections/:category/:gender", element: <Collection /> },

      // Auth / profile
      {
        path: "profile-page",
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      { path: "login", element: <Login /> },

      // Cart & orders
      { path: "checkout", element: <Cart /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "orders", element: <Order /> },
      { path: "orders/:id", element: <OrderDetail /> },

      // ✅ Nested checkout flow (separate layout)
      {
        path: "address",
        element: (
          <AuthGuard>
            <CheckoutLayout />
          </AuthGuard>
        ),
        children: [
          { path: "saved", element: <AddressList /> },
          { path: "new", element: <AddressNew /> },
          { path: "edit/:id", element: <AddressNew /> },
        ],
      },
      {
        path: "payment",
        element: (
          <AuthGuard>
            <PaymentGuard>
              <CheckoutLayout />
            </PaymentGuard>
          </AuthGuard>
        ),
        children: [{ index: true, element: <Payment /> }],
      },

      // ✅ 404 fallback
      {path:"*" , element: <Error/>}
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fakeUser = localStorage.getItem("user");
    if (fakeUser) {
      const parseUserData = JSON.parse(fakeUser);
      dispatch(addUser(parseUserData));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
