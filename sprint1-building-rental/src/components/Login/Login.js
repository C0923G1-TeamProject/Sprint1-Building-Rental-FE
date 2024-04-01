import Helmet from "react-helmet";
import '../Css/Login/Login.css'
import '../Css/Login/js/LoginJs'
import hide from '../Css/Login/icon-m6/hide.png'
import view from '../Css/Login/icon-m6/view.png'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as LoginService from '../../service/LoginService/LoginService'
import {Otp} from "./Otp";
import * as Yup from "yup"
import {useUserData} from "../Context/useUserData";
import {ModalLogin} from "./ModalLogin";
import {Spinner} from "reactstrap";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigate();
    const [recentAccount, setRecentAccount] = useState();
    const [isRedirectOtp, setIsRedirectOtp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { setUserData } = useUserData();
    const [showSpinner, setShowSpinner] = useState(false);
    const [show, setShow] = useState(false);

    const [authCheck, setAuthCheck] = useState(false);


    useEffect(() => {
        getAuth();
    }, []);

    const getAuth = async () => {
        try {
            const resAuth = await LoginService.checkAuth();
            if(resAuth != undefined) {
                setAuthCheck(true);
            } else {
                setAuthCheck(false);
            }
        } catch (e) {
            console.log(e);
        }
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (isRedirectOtp) {
            navigation("/otp");
        }
    }, [isRedirectOtp]);


    const validation = {
        username: Yup.string().required("Vui lòng nhập tên tài khoản").max(50, "Số ký tự tối đa có thể nhập là 50"),
        password: Yup.string().required("Vui lòng nhập mật khẩu").max(24, "Mật khẩu không quá 24 ký tự")
    }


    const handleSubmit = async (value) => {

        setShowSpinner(true);
        try {

            const listVisit = localStorage.getItem("isVisited");

            const newValue = {...value, isVisited: listVisit}


            const responseData = await LoginService.login(newValue);

            console.log(responseData);

            if (responseData) {
                if (responseData.statusLogin == "redirect-to-otp") {

                    const userData = {otp: responseData.otp, email: responseData.email, reUsername: value.username, rePassword: value.password};
                    setUserData(userData);


                    setIsRedirectOtp(!isRedirectOtp);
                } else if (responseData.statusLogin == "direct-access") {

                    const token = responseData.token;
                    const nameOfSigninUser = responseData.name;
                    const role = responseData.authorities[0].authority;
                    const nameAccount = responseData.username;
                    localStorage.setItem("token", token);
                    localStorage.setItem("nameOfSigninUser", nameOfSigninUser);
                    localStorage.setItem("role", role);
                    localStorage.setItem("nameAccount", nameAccount);
                    setShowSpinner(false);
                    setShow(true);
                } else {
                    console.log("nhap sai roi")
                    setShowSpinner(false);
                    setErrorMessage("Tài khoản hoặc mật khẩu không chính xác");
                }
            } else {
                console.log("nhap sai roi")
                setShowSpinner(false);
                setErrorMessage("Tài khoản hoặc mật khẩu không chính xác");
            }


        } catch (e) {
            console.log(e);
        }

    }

    const exit = () => {
        navigation("/");
    }

    useEffect(() => {
        if(authCheck) {
            navigation("/loginPage");
        }
    }, [authCheck]);


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
                                } onSubmit={handleSubmit} validationSchema={Yup.object(validation)}>

                                    <Form className="login">
                                        <div className="login__field">
                                            <i className="login__icon fas"><span
                                                className="material-symbols-outlined">
										account_circle
									</span></i>

                                            <Field name="username" type="text" className="login__input k-style-input"
                                                   placeholder="Tài khoản"/>
                                            <ErrorMessage name="username" component="span"
                                                          className={"k-required-name"}></ErrorMessage>

                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fas"><span
                                                className="material-symbols-outlined">
										lock
									</span></i>
                                            <Field name="password"
                                                   type={showPassword ? "text" : "password"}
                                                   className="login__input k-style-input"
                                                   placeholder="Mật khẩu"/>
                                            <img src={showPassword ? view : hide}
                                                 alt={showPassword ? "show" : "hide"}
                                                 className="k-eye-icon"
                                                 onClick={togglePasswordVisibility}/>
                                            <div className="k-break-wall-eye"></div>

                                            {
                                                showSpinner ? (<Spinner animation="border" role="status" className={"position-absolute k-spinner"}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>): (<></>)
                                            }



                                            <ErrorMessage name="password" component="span"
                                                          className={"k-required-pass"}></ErrorMessage>

                                        </div>

                                        <p className={"k-err-login"}>{errorMessage}</p>

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
                                        <button className="button login__submit" type={"button"} onClick={exit}>
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


           <ModalLogin show={show}/>
        </>
    )
}