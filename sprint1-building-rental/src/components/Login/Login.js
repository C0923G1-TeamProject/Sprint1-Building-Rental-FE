import Helmet from "react-helmet";
import '../Css/Login/Login.css'
import '../Css/Login/js/LoginJs'
import hide from '../Css/Login/icon-m6/hide.png'
import view from '../Css/Login/icon-m6/view.png'
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as LoginService from '../Services/LoginService/LoginService'
import {Otp} from "./Otp";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigate();
    const [recentAccount, setRecentAccount] = useState();
    const [isRedirectOtp, setIsRedirectOtp] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if(isRedirectOtp) {
            navigation("/otp");
        }
    }, [isRedirectOtp]);



    const handleSubmit = async (value) => {
        try {


            const isValidPass = await LoginService.submit(value);

            if (isValidPass) {

                sessionStorage.setItem("reUsername", value.username);
                sessionStorage.setItem("rePass", value.password);

            }
            const isVisited = localStorage.getItem("isVisited");


            if(isVisited == 1 && isValidPass) {


                const info = await LoginService.login(value);

                const token = info.token;
                const nameOfSigninUser = info.name;
                const role = info.authorities[0].authority;
                const nameAccount = info.username;
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("nameOfSigninUser", nameOfSigninUser);
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("nameAccount", nameAccount);

                //hien modal

                navigation("/");



            } else if (isVisited !== 1 && isValidPass) {
               setIsRedirectOtp(!isRedirectOtp);
            } else {
                console.log("nhap sai roi")
                // them gia trị lỗi vào 1 biến và truyền xuống cho return
            }
        } catch (e) {
            console.log(e);
        }

    }


    return (
        <>
            <Helmet>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
            </Helmet>

            <div className="k-body">
                <div className="k-container">

                    <div className="k-shadow-box">
                        <div className="login-kk"></div>
                        <div className="screen">
                            <div className="screen__content">

                                <Formik initialValues={
                                    {
                                        "username": "",
                                        "password": "",
                                        "remember-me": false
                                    }
                                } onSubmit={handleSubmit}>

                                    <Form className="login">
                                        <div className="login__field">
                                            <i className="login__icon fas fa-user"><span
                                                className="material-symbols-outlined">
										account_circle
									</span></i>

                                            <Field name="username" type="text" className="login__input"
                                                   placeholder="Tài khoản"/>
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fas fa-lock"><span
                                                className="material-symbols-outlined">
										lock
									</span></i>
                                            <Field name="password"
                                                   type={showPassword ? "text" : "password"}
                                                   className="login__input"
                                                   placeholder="Mật khẩu"/>
                                            <img src={showPassword ? view : hide}
                                                 alt={showPassword ? "show" : "hide"}
                                                 className="k-eye-icon"
                                                 onClick={togglePasswordVisibility}/>
                                            <div className="k-break-wall-eye"></div>
                                        </div>

                                        <div className="checkbox-wrapper-1 k-checkbox">
                                            <Field name="remember-me" id="example-1" className="substituted"
                                                   type="checkbox"
                                                   aria-hidden="true"/>
                                            <label htmlFor="example-1">Ghi nhớ đăng nhập</label>
                                        </div>



                                        <button className="button login__submit" type="submit">
                                            <span className="button__text">Đăng nhập</span>
                                            <i className="button__icon fas fa-chevron-right"></i>
                                        </button>
                                        <button className="button login__submit">
                                            <span className="button__text">Thoát</span>
                                            <i className="button__icon fas fa-chevron-right"></i>
                                        </button>
                                    </Form>
                                </Formik>

                            </div>
                            <div className="screen__background">
                                <span className="screen__background__shape screen__background__shape3"></span>
                                <span className="screen__background__shape screen__background__shape2"></span>
                                <span className="screen__background__shape screen__background__shape1"></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/*<Otp acc={recentAccount}/>*/}
        </>
    )
}