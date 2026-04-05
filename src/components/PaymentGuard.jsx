import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PaymentGuard = ({ children }) => {
  const userAddress = useSelector((store) => store.address.address);

  if (!userAddress || !userAddress.name) {
    return <Navigate to={"/address/new"} replace />;
  }

  return children;
};

export default PaymentGuard;
