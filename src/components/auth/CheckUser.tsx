import Cookies from "js-cookie";
import { User } from "../auth/UserContext";
import axiosInstance from "../../axiosInstance";

/**
 *  Checks for previosly obtained tokens
 *  returns - boolean (The User if tokens are found, null if not)
 *  Sets the user object of the app if tokens were found
 */
function isLoggedIn(): null | User {

    let token = Cookies.get("jwtToken");
    let uId = Cookies.get("userId");
    let uName = Cookies.get("userName");
    let name = Cookies.get("name");
    let uRole = Cookies.get("role");

    if (token && uId && uName && uRole) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const user = {
            userName: uName,
            userId: parseInt(uId),
            name: name,
            role: uRole
        };

        console.log(user);
        return user // Set the user object
    }

    return null;
}

export default isLoggedIn;