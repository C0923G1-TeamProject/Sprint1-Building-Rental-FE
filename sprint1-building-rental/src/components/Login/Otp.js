import Helmet from "react-helmet";
import '../Css/Login/Otp.css'
import {useEffect, useState} from "react";
import * as LoginService from '../../service/LoginService/LoginService'
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useUserData} from "../Context/useUserData";
import {ModalLogin} from "./ModalLogin";
import {toast} from "react-toastify";

export function Otp() {
    const [otp, setOtp] = useState();
    const [account, setAccount] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const {userData} = useUserData();




    useEffect(() => {
        document.title = "Đăng nhập";
        getInfo();

    }, [userData]);


    const getInfo = () => {
        setOtp(userData.otp);
        setCurrentUser({username: userData.reUsername, password: userData.rePassword});
    }

    useEffect(() => {
        console.log(otp);
        console.log(currentUser);
    }, [otp, currentUser]);

    const resend = async () => {
        try {
            const info = await LoginService.resend(currentUser);
            if (info) {
                console.log(info.otp)
                setOtp(info.otp)
                setAccount(info);
                toast.success("Gui mail thanh cong");
                console.log("set roi")
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async (value) => {
        try {
            if (value.inputOtp == otp) {
                const response = await LoginService.loginOtp(currentUser);
                const token = response.token;
                const nameOfSigninUser = response.name;
                const role = response.authorities[0].authority;
                const nameAccount = response.username;

                if (userData.rememberMe){
                    localStorage.setItem("token", token);
                    localStorage.setItem("nameOfSigninUser", nameOfSigninUser);
                    localStorage.setItem("role", role);
                    localStorage.setItem("nameAccount", nameAccount);
                    localStorage.setItem("rm", "1");
                } else {
                    sessionStorage.setItem("token", token);
                    sessionStorage.setItem("nameOfSigninUser", nameOfSigninUser);
                    sessionStorage.setItem("role", role);
                    sessionStorage.setItem("nameAccount", nameAccount);
                }

                let localList = localStorage.getItem("isVisited");
                if (localList == undefined) {
                    localList = "-5";
                }
                let newList = localList + "," + response.id;
                localStorage.setItem("isVisited", newList);


                console.log("dang nhap otp tahnh cong")
                //hien modal
                setShow(true);

            } else {
                setErrorMessage("Mã xác nhận không chính xác");
            }
        } catch (e) {
            console.log(e);
        }
    }


    // if (account == undefined) {
    //     return (<div>loading</div>)
    // }
    return (
        <>
            <Helmet>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>

            </Helmet>

            <div className="k-body">
                <div className="k-container">
                    <div className="k-off-box">

                        <div className="k-content-box">
                            <div className="k-element-content">
                                <div className="k-center-row">
                                    <p className="k-message">Nhập mã xác nhận gửi đến email {userData.email}</p>
                                </div>


                            </div>

                            <div className="k-center-row">
                                <p className={"k-error-mess"}>{errorMessage}</p>
                            </div>

                            <Formik initialValues={{inputOtp: ""}} onSubmit={handleSubmit}>
                                <Form id="otpForm">
                                    <div className="k-element-content k-body-content">

                                        <Field name="inputOtp" type="text" className={"k-otp-input"}/>

                                    </div>

                                    <div className="k-element-content k-body-content">
                                        <div>
                                            <button type="submit" className="btn btn-warning k-confirm-btn">Xác nhận
                                            </button>
                                        </div>
                                    </div>

                                </Form>
                            </Formik>
                            <div className="k-element-content k-foot-content">
                                <p>Không nhận được mã,<span className="k-link-a" onClick={() => {
                                    resend()
                                }}>gửi lại</span></p>

                            </div>

                            <div className="k-element-content k-foot-content">
                        <span className="material-symbols-outlined">
                            arrow_back_ios_new
                        </span>
                                <Link to={"/login"} className="k-a-back">Quay lại</Link>
                            </div>

                        </div>


                    </div>

                </div>

            </div>
            <ModalLogin show={show}/>
        </>
    )
}