import { Outlet } from "react-router-dom";
const CheckoutLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow">
        <Outlet />
      </main>

      <footer className="pb-32 lg:pb-8 pt-4  border-t border-gray-300">
        <p className="text-gray-500 px-4 text-center text-sm md:text-lg lg:text-sm">
          © 2026 Forever Buy • Secure checkout
        </p>
      </footer>
    </div>
  );
};
export default CheckoutLayout;
