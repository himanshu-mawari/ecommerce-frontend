import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PaymentGuard = ({ children }) => {
  const userAddress = useSelector((store) => store.address.addresses);
  const { isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading....</div>;

  if (!userAddress || userAddress.length === 0 || isError) {
    return <Navigate to={"/address/new?redirect=payment"} replace />;
  }

  return children;
};

export default PaymentGuard;
