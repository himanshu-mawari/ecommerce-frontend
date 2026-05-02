import { Navigate } from "react-router-dom";
import { useGetCartQuery } from "../services/cartService";

const AddressGuard = ({ children }) => {
  const { data: cart, isLoading } = useGetCartQuery();
  if (isLoading) return <div>Loading....</div>;

  if (!cart || !cart.length) {
    return <Navigate to="/checkout" replace />;
  }

  return children;
};

export default AddressGuard;
