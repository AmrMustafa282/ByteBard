import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThemeProvider = ({ children }) => {
 const { theme } = useSelector((state) => state.theme);
 return (
  <div className={theme}>
   <div className="flex flex-col min-h-screen bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">
    {children}
    <ToastContainer
     theme={useSelector((state) => state.theme).theme}
     closeOnClick
     pauseOnHover
     pauseOnFocusLoss
     draggable
     autoClose={3000}
     limit={3}
    />
   </div>
  </div>
 );
};

export default ThemeProvider;
