import "./CustomerAdd.css"
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as CustomerService from "../Services/CustomerService/CustomerService";
import {toast} from "react-toastify";
import Helmet from "react-helmet";
import HeaderAdmin from "../Header/HeaderAdmin";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Footer from "../Footer/Footer";

function AddCustomer() {
    const navigation = useNavigate();
    const validation = {
        name: Yup.string().matches(/^[a-zA-ZÀ-ỹ\s]*$/, "Tên không đúng định dạng VD: Nguyễn Văn An").required("Vui lòng nhập tên"),
        card: Yup.string().matches(/^\d{12}$/, "Số căn cước cần chính xác 12 ký tự số").required("Vui lòng nhập căn cước công dân"),
        email: Yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email không đúng định dạng").required("Vui lòng nhập email"),
        date: Yup.string().required("Vui lòng thêm ngày sinh").test("Trên 18 tuổi", "Bạn cần phải trên 18 tuổi", function (value) {
            if (!value) return false;
            const birthDate = new Date(value);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                return age - 1 >= 18;
            }
            return age >= 18;
        }),
        phoneNumber: Yup.string().matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại"),
        address: Yup.string().trim().required("Vui lòng nhập địa chỉ"),
        url: Yup.string().url("Website không hợp lệ").required("Vui lòng nhập website"),
        company: Yup.string().trim().required("Vui lòng nhập trên công ty khách hàng"),
        img: Yup.string().required("Vui lòng thêm ảnh")
    }
    const handleSubmit = async (value) => {
        try {
            await CustomerService.createCustomer(value);
            navigation("/customer")
            toast.success("Thêm mới thành công");
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Helmet>
                <title>Thêm mới khách hàng</title>
            </Helmet>
            <div>
                <HeaderAdmin/>
                <div className="d-flex justify-content-center row ">
                    <h2 className="col-12 d-flex justify-content-center cus-title-add mt-5">Tạo mới khách hàng</h2>
                </div>
                <div className="d-flex justify-content-center row mb-5">
                    <div className="col-6">
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
                                <div className="form-group cus-group">
                                    <label htmlFor="name" className="form-label cus-label">Tên khách hàng<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="name" type="text" className="form-control cus-input" id="name"/>
                                    <ErrorMessage name="name" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label className="form-label cus-label">Hình ảnh<span className="cus-col">*</span>:</label>
                                    <Field name="img" type="file" className="form-control cus-input"/>
                                    <ErrorMessage name="img" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label htmlFor="date" className="form-label cus-label">Ngày sinh<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="date" type="date" className="form-control cus-input" id="date"/>
                                    <ErrorMessage name="date" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label htmlFor="card" className="form-label cus-label">CCCD<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="card" type="text" className="form-control cus-input" id="card"/>
                                    <ErrorMessage name="card" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label htmlFor="email" className="form-label cus-label">Email<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="email" type="email" className="form-control cus-input" id="email"/>
                                    <ErrorMessage name="email" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label htmlFor="phone" className="form-label cus-label">Số điện thoại<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="phoneNumber" type="text" className="form-control cus-input"
                                           id="phone"/>
                                    <ErrorMessage name="phoneNumber" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="form-group cus-group">
                                    <label htmlFor="address" className="form-label cus-label">Địa chỉ<span
                                        className="cus-col">*</span>:</label>
                                    <Field name="address" type="text" className="form-control cus-input" id="address"/>
                                    <ErrorMessage name="address" component="span" className="k-span"></ErrorMessage>
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
                                    <Field name="company" type="text" className="form-control cus-input" id="company"/>
                                    <ErrorMessage name="company" component="span" className="k-span"></ErrorMessage>
                                </div>
                                <div className="btn-container custom-btn-1">
                                    <button className="btn cus">
                                        <Link to={"/customer"} className="cus-display-add">Huỷ thêm mới</Link>
                                    </button>
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