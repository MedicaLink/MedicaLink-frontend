import { Navigate } from "react-router-dom";
import { UseUser } from "../auth/UserContext";
import { useEffect } from "react";
import Cookies from "js-cookie";

function Logout() {
    let { user } = UseUser();

    useEffect(() => {
        Cookies.remove('jwtToken');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('name');
        Cookies.remove('role');

        user = null;
    }, []);

    return <Navigate to={"/login"} />
}

export default Logout;