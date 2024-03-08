import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const CustomToast = ({ text, type }) => {
 const notify = () => {
  switch (type) {
   case "info":
    toast.info(text);
    break;
   case "success":
    toast.success(text);
    break;
   case "warning":
    toast.warning(text);
    break;
   case "error":
    toast.error(text);
    break;
   default:
    toast.info(text);
    break;
  }
 };
 useEffect(() => {
  notify();
 }, []);

 return (
  <ToastContainer
   theme={useSelector((state) => state.theme).theme}
   hideProgressBar={false}
   closeOnClick={true}
   pauseOnHover={true}
   draggable={true}
   transition="Bounce"
  />
 );
};
export default CustomToast;
