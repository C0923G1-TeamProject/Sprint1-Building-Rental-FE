import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../service/PremisesService";
import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import {useParams} from 'react-router-dom';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import "../Customer/CustomerAdd.css";
import "../Css/Premises/ListPremises.css";
import Swal from "sweetalert2";


export default function UpdatePremises() {
    const {id} = useParams();
    const [premises, setPremises] = useState();
    const [listFloor, setListFloor] = useState([]);
    const [listType, setListType] = useState([]);
    const [listStatus, setListStatus] = useState([]);
    const navigate = useNavigate();
    const [premisesCode, setPremisesCode] = useState([]);
    const [priceSpan, setPriceSpan] = useState(0);


    const findPremisesById = async () => {
        try {
            const res = await service.findPremises(id);
            console.log({res})
            const obj = {...res, typePremises: JSON.stringify(res.typePremises), premisesStatus: JSON.stringify(res.premisesStatus)}
            setPremises(obj);
            setPremisesCode(res.code);
            // setTypePremises(res.typePremises);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findPremisesById();
    }, []);


    const findAllFloor = async () => {
        try {
            const res = await service.getListFloor();
            setListFloor(res);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        findAllFloor();
    }, []);


    const findAllType = async () => {
        try {
            const res = await service.getListType();
            setListType(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findAllType();
    }, []);

    const findAllStatus = async () => {
        try {
            const res = await service.getListStatus();
            setListStatus(res);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        findAllStatus();
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);
    //******* Điền form
    const handleSubmit = async (values) => {
        debugger;
        try {
            const updatedPremises = {
                ...values,
                floor: values.floor,
                typePremises: JSON.parse(values.typePremises),
                code: values.code,
                premisesStatus: JSON.parse(values.premisesStatus),
                area: values.area,
                description: values.description.trim(),
                price: parseInt(values.price),
                cost: parseInt(values.cost)
            };

            await service.updatePremises(id, updatedPremises);
            Swal.fire("Chỉnh sửa thành công!", "", "success").then(() => {
                navigate('/premises');
            });

        } catch (error) {
            console.log("Đã xảy ra lỗi khi cập nhật mặt bằng:", error);
        }
    };

    // const handleConfirmation = () => {
    //     Swal.fire({
    //         title: "Bạn chắc chắn muốn cập nhật thông tin?",
    //         text: "Lưu ý: Bạn không thể quay trở lại phiên bản trước đó!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Xác nhận!",
    //         cancelButtonText: "Huỷ",
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             handleSubmit(premises);
    //         }
    //     });
    // };


    const validateObject = {
        // code: Yup.string().required("Vui lòng nhập diện tích").matches("(MB-[0-9]{4})", "Vui lòng nhập đúng định dạng MB-XXXX"),
        area: Yup.number().min(10.0, "Diện tích quá nhỏ").max(999999.9, "Diện tích quá lớn").typeError("Diện tích phải là số").required("Vui lòng nhập diện tích"),
        description: Yup.string().max(1500, "Mô tả tối đa 1500 ký tự"),
        price: Yup.number().required("Vui lòng nhập giá thuê").min(1000, "Giá thuê quá nhỏ").max(999999999999, "Giá bán quá lớn"),
        cost: Yup.number().required("Vui lòng nhập phí quản lý").min(1000, "Phí quản lý quá nhỏ").max(99999999999, "Phí quản lý quá lớn"),
    }


    if (premises == null) {
        return <div>
            Loading
        </div>
    }



    // if (localStorage.getItem("rm")) {
    //     if(!localStorage.getItem("token")){
    //         navigate("/login");
    //     }
    // } else {
    //     if(!sessionStorage.getItem("token")){
    //         navigate("/login");
    //     }
    // }

    return (<>
        <HeaderAdmin></HeaderAdmin>
        <div className="container">
            <h2 className="text-center fw-bold text-uppercase">chỉnh sửa mặt bằng</h2>
            <div className="d-flex justify-content-center row">

                <div className="col-9 justify-content-center align-items-center px-0">
                    <div className="form-group">
                        <Formik
                            initialValues={premises}
                            onSubmit={handleSubmit}
                            validationSchema={Yup.object(validateObject)}
                        >
                            <Form>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="row my-1">
                                            <span className="px-0">Chọn tầng: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>

                                        <div className="row">
                                            {/*<Field name="id" value={id} hidden></Field>*/}
                                            <Field as="select" id="floor" name="floor"
                                                   className="form-control rounded-1">
                                                {
                                                    listFloor.map((item) => (
                                                        <option key={item.index} value={item}>{item}</option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage name="floor" component="span" className="text-danger"/>
                                        </div>


                                        <div className="row my-1">
                                                <span className="px-0">Loại mặt bằng: <span
                                                    style={{color: 'red'}}>*</span></span>
                                        </div>



                                                <div className="row">
                                                    <Field as="select" id="typePremises" name="typePremises"
                                                           className="form-control rounded-1">
                                                        {
                                                            listType.map((item) => (
                                                                <option key={item.id}
                                                                        value={JSON.stringify(item)} > {item.name} </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="typePremises" component="span"
                                                                  className="text-danger"/>
                                                </div>



                                        <div className="row my-1">
                                            <span className="px-0">Mã mặt bằng: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field type="text" className="form-control w-100" name="code"
                                                   id="code" value={premisesCode} disabled/>
                                            <ErrorMessage name="code" component="span" className="text-danger"/>

                                        </div>


                                        <div className="row my-1">
                                            <span className="px-0">Trạng thái: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>

                                        <div className="row">
                                            <Field as="select" id="premisesStatus" name="premisesStatus"
                                                   className="form-control rounded-1">
                                                {listStatus.map((item) => (
                                                    <option key={item.id}
                                                            value={JSON.stringify(item)}>{item.name} </option>
                                                ))
                                                }
                                            </Field>
                                            <ErrorMessage name="premisesStatus" component="span"
                                                          className="text-danger"/>
                                        </div>


                                        <div className="row my-1">
                                            <span className="px-0">Diện tích (m²): <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field type="number" className="form-control w-100" name="area"
                                                   id="area"/>
                                            <ErrorMessage name="area" component="span" className="text-danger"/>

                                        </div>


                                    </div>

                                    <div className="col-md-2"></div>

                                    <div className="col-md-5">
                                        <div className="row my-1">
                                            <span className="px-0">Giá thuê (VND/tháng): <span
                                                style={{color: 'red'}}>*</span> </span>
                                        </div>
                                        <div className="row">
                                            <Field type="number" className="form-control w-100" name="price"
                                                   id="price"/>
                                            <ErrorMessage name="price" component="span" className="text-danger"/>

                                        </div>


                                        <div className="row my-1">
                                            <span className="px-0">Phí quản lý (VND): <span
                                                style={{color: 'red'}}>*</span> </span>
                                        </div>
                                        <div className="row">
                                            <Field type="number" className="form-control w-100" name="cost"
                                                   id="cost"/>
                                            <ErrorMessage name="cost" component="span" className="text-danger"/>

                                        </div>


                                        <div className="row my-1">
                                            <span className="px-0">Chú thích:</span>
                                        </div>
                                        <div className="row">
                                            <Field as="textarea" rows="7" type="text" className="form-control w-100"
                                                   name="description"
                                                   id="description"/>
                                            <ErrorMessage name="description" component="span"
                                                          className="text-danger"/>

                                        </div>

                                    </div>


                                    <div className="row d-flex justify-content-between my-4 mx-0 p-0">
                                        <div className="btn hisu-cancel col-5 col-md-5">
                                            <Link to={`/premises`} className="px-0">
                                                Huỷ chỉnh sửa
                                            </Link>
                                        </div>

                                            <button onSubmit={handleSubmit} type="submit"
                                                    className="btn hisu-confirm col-5 col-md-5">
                                                Chỉnh sửa mặt bằng
                                            </button>
                                    </div>


                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </div>
        </div>
        <Footer></Footer>
    </>)


}

