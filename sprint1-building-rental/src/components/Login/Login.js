import Helmet from "react-helmet";
import '../Css/Login/Login.css'
import '../Css/Login/js/LoginJs'
import hide from '../Css/Login/icon-m6/hide.png'
import view from '../Css/Login/icon-m6/view.png'
export function Login() {



    const togglePasswordEye = () => {
        let password = document.getElementById("password");
        let eye = document.getElementById("eye");
        if (password.type === "password") {
            password.type = "text";
            eye.src = view;
        } else {
            password.type = "password";
            eye.src = hide;
        }
    }


    return (
        <>
            <Helmet>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
            </Helmet>

            <div className="k-body">
                <div className="container">

                    <div className="k-shadow-box">
                        <div className="login-kk"></div>
                        <div className="screen">
                            <div className="screen__content">
                                <form className="login" action="./otp.html" method="post">
                                    <div className="login__field">
                                        <i className="login__icon fas fa-user"><span
                                            className="material-symbols-outlined">
										account_circle
									</span></i>

                                        <input type="text" className="login__input" placeholder="Tài khoản"/>
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fas fa-lock"><span
                                            className="material-symbols-outlined">
										lock
									</span></i>
                                        <input type="password" className="login__input" placeholder="Mật khẩu"
                                               id="password"/>
                                        <img src={hide} className="k-eye-icon" id="eye" onClick={togglePasswordEye}/>
                                        <div className="k-break-wall-eye"></div>
                                    </div>

                                    <div className="checkbox-wrapper-1 k-checkbox">
                                        <input id="example-1" className="substituted" type="checkbox"
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
                                </form>

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


        </>
    )
}