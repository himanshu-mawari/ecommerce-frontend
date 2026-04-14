import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import AddressNew from "./pages/AddressNew.jsx";
import AddressList from "./pages/AddressList.jsx";
import { useDispatch , useSelector } from "react-redux";
import { addUser } from "./store/userSlice.js";
import { useEffect } from "react";
import AuthGuard from "./components/AuthGuard.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentGuard from "./components/PaymentGuard.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import CheckoutLayout from "./Layouts/CheckoutLayout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx"
import Order from "./pages/Order.jsx"
import OrderDetail from "./pages/OrderDetail.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/collections/:category", element: <Collection /> },
      { path: "/collections/:category/:gender", element: <Collection /> },
      {path : "/profile-page" , element: <AuthGuard><ProfilePage /></AuthGuard>},
      { path: "/checkout", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/order-success", element: <OrderSuccess /> },
      {path: "/orders" , element: <Order />},
      {path: "/orders/:id" , element: <OrderDetail />}
    ],
  },
  {
    path:"/",
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

      { path: "/address/new", element: <AuthGuard> <AddressNew /> </AuthGuard>},
      { path: "/address/edit/:id", element: <AuthGuard> <AddressNew /> </AuthGuard>},
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

const App = () => {
  const addresses = useSelector(store => store.address.addresses);
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