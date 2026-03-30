import Navbar from "./components/Navbar.jsx"
import { createBrowserRouter , Outlet , RouterProvider } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx"
import Product from "./pages/Product.jsx"

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
      {path:"/product/:id", element: <Product />}
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App