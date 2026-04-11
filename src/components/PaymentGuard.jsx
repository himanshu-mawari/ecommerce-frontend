import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PaymentGuard = ({ children }) => {
  const userAddress = useSelector((store) => store.address.addresses);

  if (!userAddress || userAddress.length === 0) {
    return <Navigate to={"/address/new?redirect=payment"} replace />;
  }

  return children;
};

export default PaymentGuard;
