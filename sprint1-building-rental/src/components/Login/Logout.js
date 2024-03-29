import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function Logout() {

    const navigation = useNavigate();
    useEffect(() => {
        localStorage.removeItem("role");
        localStorage.removeItem("nameAccount");
        localStorage.removeItem("nameOfSigninUser");
        localStorage.removeItem("token");
        navigation("/")
    }, []);

    return(
        <>

        <div>Log out...</div>
        </>
    )
}