import Navbar from "./components/Navbar.jsx"
import { createBrowserRouter , Outlet , RouterProvider } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx"
import Product from "./pages/Product.jsx"
import Collection from "./pages/Collection.jsx"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {path: "/",
    element: <Layout/>,
    children: [
      {path: "/" ,element: <Home/>},
      {path:"/product/:id", element: <Product />},
      {path:"/collections/:category" , element: <Collection/>},
      {path:"/collections/:category/:gender" , element: <Collection/>}
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App