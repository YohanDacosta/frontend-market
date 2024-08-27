import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHelpers = () => {
    const navigate = useNavigate();

    const listMessages = (msg) => {
        return React.createElement(
            'ol',
            {className:'grid gap-2'},
            msg.map((m, index) => React.createElement('li', { key: index, className:'border-b-2' }, m))
        );
    };

    const showToats = (data, url) => {
        if (data) {
            if (data?.errors) {
                toast.error( Array.isArray(data?.message) ? listMessages(data?.message) : data?.message);
            } else {
                toast.success(data?.message);
                navigate(url);
            }
        }
    }

    return { showToats };
}

export default useHelpers;