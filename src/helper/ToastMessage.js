import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ToastMessage = (message, toastFlag) => {
    if (toastFlag) {
        toast.success(message);
    } else {
        toast.error(message);
    }
}

export default ToastMessage;