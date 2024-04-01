import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as LoginService from '../../service/LoginService/LoginService'

export function Logout() {

    const navigation = useNavigate();

    const [isClearLocal, setIsClearLocal] = useState(false);

    useEffect(() => {
        doLogOut();


    }, []);

    useEffect(() => {
        if (isClearLocal) {
            localStorage.removeItem("role");
            localStorage.removeItem("nameAccount");
            localStorage.removeItem("nameOfSigninUser");
            localStorage.removeItem("token");
            navigation("/");
        }
    }, [isClearLocal]);

    const doLogOut = async () => {
        try {
           const resLogout = await LoginService.logout();
           if(resLogout) {
               setIsClearLocal(true);
           }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <>

        <div>Log out...</div>
        </>
    )
}