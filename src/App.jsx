import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import AddressNew from "./pages/AddressNew.jsx";
import AddressList from "./pages/AddressList.jsx";
import { useDispatch, useSelector } from "react-redux";
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
import SignUp from "./pages/SignUp.jsx";
import { hideToast } from "./store/toastSlice";
import Toast from "./components/Toast.jsx";
import { useGetUserProfileQuery } from "./services/userService";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/collections/:category", element: <Collection /> },
      {
        path: "/profile-page",
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      { path: "/checkout", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/orders", element: <Order /> },
      { path: "/orders/:id", element: <OrderDetail /> },
      { path: "*", element: <Error /> },
    ],
  },
  {
    path: "/",
    element: <CheckoutLayout />,
    children: [
      {
        path: "/address/saved",
        element: (
          <AuthGuard>
            <AddressList />
          </AuthGuard>
        ),
      },

      {
        path: "/address/new",
        element: (
          <AuthGuard>
            {" "}
            <AddressNew />{" "}
          </AuthGuard>
        ),
      },
      {
        path: "/address/edit/:id",
        element: (
          <AuthGuard>
            {" "}
            <AddressNew />{" "}
          </AuthGuard>
        ),
      },
      {
        path: "/payment",
        element: (
          <AuthGuard>
            <PaymentGuard>
              <Payment />
            </PaymentGuard>
          </AuthGuard>
        ),
      },
    ],
  },
]);

const App =  () => {
  const dispatch = useDispatch();
  const { message, isVisible } = useSelector((store) => store.toast);
  useGetUserProfileQuery();
 
  return (
    <>
      <RouterProvider router={router} />{" "}
      <Toast
        message={message}
        isVisible={isVisible}
        setIsVisible={() => dispatch(hideToast())}
        duration={2500}
      />
    </>
  );
};

export default App;
