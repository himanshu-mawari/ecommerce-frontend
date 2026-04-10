import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PaymentGuard = ({ children }) => {
  const userAddress = useSelector((store) => store.address.addresses);
  const cart = useSelector((store) => store.cart.items);

  if (!userAddress || userAddress.length === 0) {
    return <Navigate to={"/address/new"} replace />;
  }
  if (!cart || cart.length === 0) {
    return <Navigate to={"/checkout"} replace />;
  }

  return children;
};

export default PaymentGuard;
