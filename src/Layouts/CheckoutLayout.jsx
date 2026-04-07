import { Outlet } from "react-router-dom";

const CheckoutLayout = () => {
  return (
    <>
      <Outlet />
      <div className="pb-28">
        <p className="text-gray-500 px-4 border-t  border-gray-200 text-center  pt-3">© 2026 Forever Buy • Secure checkout</p>
      </div>
    </>
  );
};

export default CheckoutLayout;
