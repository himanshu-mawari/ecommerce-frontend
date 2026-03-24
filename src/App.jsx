import Navbar from "./components/Navbar.jsx"
import { createBrowserRouter , Outlet , RouterProvider } from "react-router-dom"
import Home from "./pages/Home.jsx"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {path: "/",
    element: <Layout/>,
    children: [
      {path: "/" ,element: <Home/>}
    ]
  }
])

const App = () => {
  return <RouterProvider router={router}/>;
}

export default App