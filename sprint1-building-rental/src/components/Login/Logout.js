import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as LoginService from '../../service/LoginService/LoginService'
import {Flip, toast} from "react-toastify";
import {Spinner} from "reactstrap";

export function Logout() {

    const navigation = useNavigate();

    const [isClearLocal, setIsClearLocal] = useState(false);

    const [isBackHome, setIsBackHome] = useState(false);

    useEffect(() => {
        doLogOut();


    }, []);

    useEffect(() => {
        if (isClearLocal) {
            if (localStorage.getItem("rm")){
                localStorage.removeItem("role");
                localStorage.removeItem("nameAccount");
                localStorage.removeItem("nameOfSigninUser");
                localStorage.removeItem("token");
                localStorage.removeItem("rm");
            } else {
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("nameAccount");
                sessionStorage.removeItem("nameOfSigninUser");
                sessionStorage.removeItem("token");
            }

            toast.success('Đăng xuất thành công', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }, [isClearLocal]);

    const doLogOut = async () => {
        try {
            const resLogout = await LoginService.logout();
            if (resLogout) {
                setIsClearLocal(true);
                setIsBackHome(true);
            } else {
                setIsBackHome(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isBackHome) {
            navigation("/")
        }
    }, [isBackHome]);

    return (
        <>
            <div>Loading...</div>
        </>
    )
}