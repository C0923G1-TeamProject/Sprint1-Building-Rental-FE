import Helmet from "react-helmet";
import '../Css/Login/Otp.css'
import {useEffect, useState} from "react";
export function Otp() {

    return(

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
                                    <p className="k-message">Nhập mã xác nhận gửi đến email khanh@gg.com</p>
                                </div>


                            </div>


                            <div className="k-element-content k-body-content">
                                <form id="otpForm" action="./successfully-login.html" method="post">
                                    <input type={"text"} className={"k-otp-input"}/>
                                </form>
                            </div>

                            <div className="k-element-content k-body-content">
                                <div><button className="btn btn-warning k-confirm-btn">Xác nhận</button></div>
                            </div>

                            <div className="k-element-content k-foot-content">
                                <p>Không nhận được mã, <span><a href="#" className="k-link-a">gửi lại</a></span></p>
                            </div>

                            <div className="k-element-content k-foot-content">
                        <span className="material-symbols-outlined">
                            arrow_back_ios_new
                        </span>
                                <a href="./form_login.html" className="k-a-back">Quay lại</a>
                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </>
    )
}