import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHelpers = () => {
    const navigate = useNavigate();

    const showToats = (data, url) => {
        if (data) {
            if (data?.errors) {
                toast.error(data?.message);
            } else {
                toast.success(data?.message);
                navigate(url);
            }
        }
    }

    return { showToats };
}

export default useHelpers;