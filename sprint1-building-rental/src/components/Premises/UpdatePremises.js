import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../service/PremisesService";
import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import {useParams} from 'react-router-dom';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function UpdatePremises() {
    const param = useParams();
    const [premises, setPremises] = useState({});
    const [listFloor, setListFloor] = useState([]);
    const [listType, setListType] = useState([]);
    const [listStatus, setListStatus] = useState([]);

    useEffect(() => {
            findAllFloor();
        }, []);
    const findAllFloor = async () => {
        try {
            const res = await service.getListFloor();
            console.log(res);
            setListFloor(res);
        } catch (e) {
            console.log(e)
        }
    }
    const findPremisesById = async () => {
        try {
            const res = await service.findPremises(param.id);
            if (res.status === 200) {
                setPremises(res.data);

            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findPremisesById();
    }, []);

    const findAllType = async () => {
        try{
            const res = await service.getListType();
            setListType(res);
        }catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        findAllType();
    }, []);

    const findAllStatus = async () => {
        try{
            const res = await service.getListStatus();
            setListStatus(res);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        findAllStatus();
    })

    //******* Điền form
    const handleSubmit = async (values) => {
        console.log(values);
        // debugger;
        try {
            if (values) {
                const updatedPremises = {
                    ...values,
                    floor: values.floor,
                    typePremises: values.typePremises ? JSON.parse(values.typePremises) : null, // Kiểm tra xem values.typepr có tồn tại không trước khi chuyển đổi thành JSON
                    code: values.code,
                    premisesStatus: values.premisesStatus ? JSON.parse(values.premisesStatus) : null,
                    area: values.area,
                    description: values.description,
                    price: values.price,
                    cost: values.cost
                };

                console.log(updatedPremises);
                const res = await service.updatePremises(param.id, updatedPremises);
                console.log(res.data);
            }
        } catch (error) {
            console.log("Đã xảy ra lỗi khi cập nhật mặt bằng:", error);
        }
    };

    const validateObject = {
        code: Yup.string().required("Vui lòng nhập diện tích").matches("(MB-[0-9]{4})", "Vui lòng nhập đúng định dạng MB-XXXX"),
        area: Yup.number().min(10.0, "Diện tích quá nhỏ").max(999999.9, "Diện tích quá lớn").typeError("Diện tích phải là số").required("Vui lòng nhập diện tích"),
        description: Yup.string().max(1500, "Mô tả tối đa 1500 ký tự"),
        price: Yup.number().min(1000, "Giá bán quá nhỏ").max(999999999999, "Giá bán quá lớn"),
        cost: Yup.number().min(1000, "Phí quản lý quá nhỏ").max(99999999999, "Phí quản lý quá lớn")
    }

    return (<>
        <HeaderAdmin></HeaderAdmin>
        <div className="container-fluid">
            <h2 className="text-center fw-bold text-uppercase">chỉnh sửa mặt bằng</h2>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 justify-content-center align-items-center px-0">
                    <div className="form-group">
                        <Formik
                            initialValues={premises}
                            onSubmit={handleSubmit}
                            validationSchema={Yup.object(validateObject)}
                        >
                            <Form>
                                <div className="my-3">
                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Chọn tầng: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
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
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Loại mặt bằng: <span style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field as="select" id="typePremises" name="typePremises"
                                                   className="form-control rounded-1">
                                                {
                                                    listType.map((item) => (
                                                        <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage name="typePremises" component="span" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Mã mặt bằng: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field type="text" className="form-control w-100" name="code"
                                                   id="code"/>
                                            <ErrorMessage name="code" component="span" className="text-danger"/>

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Trạng thái: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field as="select" id="premisesStatus" name="premisesStatus"
                                                   className="form-control rounded-1">
                                                {
                                                    listStatus.map((item) => (
                                                        <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage name="premisesStatus" component="span" className="text-danger"/>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Diện tích: <span
                                                style={{color: 'red'}}>*</span></span>
                                        </div>
                                        <div className="row">
                                            <Field type="number" className="form-control w-100" name="area" id="area"/>
                                            <ErrorMessage name="area" component="span" className="text-danger"/>

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Chú thích:</span>
                                        </div>
                                        <div className="row">
                                            <Field type="text" className="form-control w-100" name="decscription"
                                                   id="decscription"/>
                                            <ErrorMessage name="decscription" component="span" className="text-danger"/>

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Giá thuê (tháng):  </span>
                                        </div>
                                        <div className="row">
                                            <Field type="text" className="form-control w-100" name="price" id="price"/>
                                            <ErrorMessage name="price" component="span" className="text-danger"/>

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">
                                            <span className="px-0">Phí quản lý: </span>
                                        </div>
                                        <div className="row">
                                            <Field type="text" className="form-control w-100" name="cost" id="cost"/>
                                            <ErrorMessage name="cost" component="span" className="text-danger"/>

                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="row my-1">

                                            <div className=" d-flex col-6 justify-content-center align-items-center">
                                                <Link to={`/premises`}>
                                                    <button type="button" className="btn btn-primary">
                                                        Quay lại
                                                    </button>
                                                </Link>

                                            </div>

                                            <div className=" d-flex col-6 justify-content-center align-items-center">
                                                <button type="submit" className="btn btn-success">
                                                    Xác nhận
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Form>
                        </Formik>
                    </div>


                </div>
                <div className="col-3"></div>
            </div>
        </div>
        <Footer></Footer>
    </>)

}