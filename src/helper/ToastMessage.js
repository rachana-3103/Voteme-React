import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const ToastMessage = (message) => {
    toast.success(message);
}

export default  ToastMessage;