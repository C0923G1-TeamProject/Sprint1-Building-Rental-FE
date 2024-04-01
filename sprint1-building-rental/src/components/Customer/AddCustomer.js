import "./CustomerAdd.css"
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as CustomerService from "../../service/CustomerService/CustomerService";
import {toast} from "react-toastify";
import Helmet from "react-helmet";
import HeaderAdmin from "../Header/HeaderAdmin";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import storage from "../PersonalInsormation/firebase/firebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Swallow from "sweetalert2";

function AddCustomer() {
    const navigation = useNavigate();
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessageCard, setErrorMessageCard] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState("");
    const [preview, setPreview] = useState();
    const [file, setFile] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const validation = {
        name: Yup.string().matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Tên không đúng định dạng VD: Nguyễn Văn An").required("Vui lòng nhập tên"),
        card: Yup.string().matches(/^\d{12}$/, "Số căn cước cần chính xác 12 ký tự số").required("Vui lòng nhập căn cước công dân"),
        email: Yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email không đúng định dạng").required("Vui lòng nhập email"),
        date: Yup.string().required("Vui lòng thêm ngày sinh").test("Tuổi từ 18 đến 110", "Bạn cần phải trong độ tuổi từ 18 đến 110", function (value) {
            if (!value) return false;
            const birthDate = new Date(value);
            const currentDate = new Date();
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 18 && age <= 110;
        }),
        phoneNumber: Yup.string().matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại"),
        address: Yup.string().trim().required("Vui lòng nhập địa chỉ"),
        url: Yup.string().url("Website không hợp lệ").required("Vui lòng nhập website"),
        company: Yup.string().trim().required("Vui lòng nhập trên công ty khách hàng"),
    }

    const handleSubmit = async (values) => {
        try {
            const imageUrl = await handleUpload();
            values.img = imageUrl;
            let rs = await CustomerService.createCustomer(values);
            switch (rs) {
                case "phone":
                    setErrorMessagePhone("Số điện thoại này đã tồn tại.");
                    setErrorMessageEmail("");
                    setErrorMessageCard("");
                    break;
                case "card":
                    setErrorMessageCard("Số căn cước này đã tồn tại.");
                    setErrorMessageEmail("");
                    setErrorMessagePhone("");
                    break;
                case "email":
                    setErrorMessageEmail("Địa chỉ email này đã tồn tại.");
                    setErrorMessageCard("");
                    setErrorMessagePhone("");
                    break;
                default:
                    setErrorMessageEmail("");
                    break;
            }
            if (rs === "ok") {
                Swallow.fire("Thêm mới thành công!", "", "success").then(() => {
                    navigation('/customer');
                });
                toast.success("Thêm mới thành công");
            }
        } catch (e) {
            console.log(e);
        }
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
        setPreview(event.target.files[0]);
    }

    const handleUpload = () => {
        return new Promise((resolve, reject) => {
            if (!file) {
                resolve('');
            }
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        resolve(url);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                }
            );
        });
    };

    const renderImage = () => {
        if (preview) return URL.createObjectURL(preview);
        return "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
    };

    return (
        <>
            <Helmet>
                <title>Thêm mới khách hàng</title>
            </Helmet>
            <div>
                <HeaderAdmin/>
                <div className="d-flex justify-content-center row ">
                    <h1 className="text-center">THÊM MỚI KHÁCH HÀNG</h1>
                </div>
                <div className="d-flex justify-content-center row mb-5">
                    <div className="col-9">
                        <Formik initialValues={{
                            "name": "",
                            "card": "",
                            "email": "",
                            "date": "",
                            "phoneNumber": "",
                            "address": "",
                            "url": "",
                            "company": "",
                            "img": ""
                        }} onSubmit={handleSubmit} validationSchema={Yup.object(validation)}>
                            <Form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group cus-group">
                                            <label htmlFor="name" className="form-label cus-label">Tên khách hàng<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="name" type="text" className="form-control cus-input"
                                                   id="name"/>
                                            <ErrorMessage name="name" component="span"
                                                          className="k-span"></ErrorMessage>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="date" className="form-label cus-label">Ngày sinh<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="date" type="date" className="form-control cus-input"
                                                   id="date"/>
                                            <ErrorMessage name="date" component="span"
                                                          className="k-span"></ErrorMessage>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="email" className="form-label cus-label">Email<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="email" type="email" className="form-control cus-input"
                                                   id="email"/>
                                            <div>
                                                {errorMessageEmail && (
                                                    <span className="error-message">{errorMessageEmail}</span>
                                                )}
                                            </div>
                                            <ErrorMessage name="email" component="span"
                                                          className="k-span"></ErrorMessage>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="card" className="form-label cus-label">CCCD<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="card" type="text" className="form-control cus-input"
                                                   id="card"/>
                                            <ErrorMessage name="card" component="span"
                                                          className="k-span"></ErrorMessage>
                                            <div>
                                                {errorMessageCard && (
                                                    <span className="error-message">{errorMessageCard}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="phone" className="form-label cus-label">Số điện thoại<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="phoneNumber" type="text" className="form-control cus-input"
                                                   id="phone"/>
                                            <ErrorMessage name="phoneNumber" component="span"
                                                          className="k-span"></ErrorMessage>
                                            <div>
                                                {errorMessagePhone && (
                                                    <span className="error-message">{errorMessagePhone}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="address" className="form-label cus-label">Địa chỉ<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="address" type="text" className="form-control cus-input"
                                                   id="address"/>
                                            <ErrorMessage name="address" component="span"
                                                          className="k-span"></ErrorMessage>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group cus-group">
                                            <label className="form-label cus-label">Hình ảnh:</label>
                                            <input
                                                type="file"
                                                className="form-control cus-input" style={{marginBottom: "10px"}}
                                                onChange={handleChange}
                                                accept="image/*"
                                            />
                                            <img src={renderImage()} alt="Ảnh khách hàng"
                                                 style={{maxWidth: "240px", maxHeight: "280px", minHeight: "280px"}}/>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="url" className="form-label cus-label">Website<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="url" type="text" className="form-control cus-input" id="url"/>
                                            <ErrorMessage name="url" component="span" className="k-span"></ErrorMessage>
                                        </div>
                                        <div className="form-group cus-group">
                                            <label htmlFor="company" className="form-label cus-label">Tên công ty<span
                                                className="cus-col">*</span>:</label>
                                            <Field name="company" type="text" className="form-control cus-input"
                                                   id="company"/>
                                            <ErrorMessage name="company" component="span"
                                                          className="k-span"></ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-container ">
                                    <div className="btn cus custom-btn-1">
                                        <Link to={"/customer"} className="cus-display-add">Huỷ thêm mới</Link>
                                    </div>
                                    <button className="btn cus custom-btn" type="submit">Thêm khách hàng</button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    )
}

export default AddCustomer;