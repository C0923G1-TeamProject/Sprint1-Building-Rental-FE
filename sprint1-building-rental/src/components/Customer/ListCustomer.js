import {useEffect, useState} from "react";
import * as CustomerService from "../Services/CustomerService/CustomerService";
import Helmet from "react-helmet";
import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import './CustomerCss.css';
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";

function ListCustomer() {
    const [delCustomer, setDelCustomer] = useState({});
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getAll()
    }, []);

    const getAll = async () => {
        try {
            const list = await CustomerService.getAll();
            const customersArray = list.content;
            setCustomers(customersArray)
        } catch (e) {
            console.log(e)
        }
    }

    function handleDelete(customer) {
        setDelCustomer(customer)
        setShowModal(true)
    }

    return (
        <>
            <Helmet>
                <title>Danh sách khách hàng</title>
            </Helmet>
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <h2 className="cus-title">Danh sách khách hàng</h2>
                    <div className="d-flex align-items-center py-4">
                        <button className="btn btn-in-list me-5">
                            <Link to={"/add"} className="cus_display">Thêm mới khách hàng</Link>
                        </button>
                        <Formik initialValues={{name: "", card: ""}} onSubmit={(values) => {
                            CustomerService.searchCustomer(values.name, values.card).then((response) => {
                                const responses = response.content;
                                setCustomers(responses);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }}>
                            <Form className="form-inline" method="get">
                                <div className="input-group">
                                    <Field name="name" className="form-control me-2" placeholder="Nhập tên cần tìm"></Field>
                                    <Field name="card" className="form-control me-2" placeholder="Nhập số căn cước công dân" size="30"></Field>
                                    <div>
                                        <button type="submit" className="btn btn-in-list">Tìm kiếm</button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr className="table-header-list-customer">
                            <th className="cus-th">#</th>
                            <th className="cus-th">Họ Tên</th>
                            <th className="cus-th">SĐT</th>
                            <th className="cus-th">CCCD</th>
                            <th className="cus-th">Email</th>
                            <th className="cus-th">Công Ty</th>
                            <th className="cus-th">Tuỳ chọn</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.card}</td>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td>
                                    <button className="btn btn-action-list-customer" onClick={() => handleDelete(customer)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination-wrapper">
                        <nav aria-label="...">
                            <ul className="pagination pagination-circle ">
                                <li className="page-item">
                                    <a className="page-link">Trang đầu</a>
                                </li>
                                <div>
                                    <div>
                                        <li className="page-item active" aria-current="page">
                                            <a className="page-link"><span
                                                className="visually-hidden"></span>1</a>
                                        </li>
                                    </div>
                                    <div>
                                        <li className="page-item"><a className="page-link" ></a></li>
                                    </div>
                                </div>
                                <li class="page-item">
                                    <a class="page-link">Trang cuối</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Footer/>
            </div>
        </>

    )
}

export default ListCustomer;