import { useEffect } from "react";

const Toast = ({ message, isVisible, setIsVisible, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, setIsVisible, message]);

  if (!isVisible) return null;

  return (
   
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-max max-w-[90vw] animate-slide-down">
      <div className="bg-black/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium flex items-center justify-center border border-white/10">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;

/**import Toast from "../components/Toast.jsx";
 *   const [showToast, setShowToast] = useState(false);
   const [toastMessage, setToastMessage] = useState("");
    <Toast
        message={toastMessage}
        isVisible={showToast}
        setIsVisible={setShowToast}
        duration={2500}
      />
 */