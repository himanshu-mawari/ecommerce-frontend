import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetAllAddressesQuery } from "../services/addressService";

const PaymentGuard = ({ children }) => {
  const selectedAddressId = useSelector((s) => s.address.selectedAddressId);
  const { isLoading: authLoading, isError: authError } = useAuth();
  const {
    data: addresses,
    isLoading: addrLoading,
    isError: addrError,
  } = useGetAllAddressesQuery();

  if (authLoading || addrLoading) return <div>Loading...</div>;
  if (authError) return <Navigate to="/login" replace />;
  if (addrError) return <Navigate to="/address/new?redirect=payment" replace />;

  if (!addresses || addresses.length === 0) {
    return <Navigate to="/address/new?redirect=payment" replace />;
  }
  if (!selectedAddressId) {
    return <Navigate to="/address/saved?redirect=payment" replace />;
  }

  return children;
};
export default PaymentGuard;
