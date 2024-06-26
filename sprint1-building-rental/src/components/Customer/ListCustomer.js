import {useEffect, useState} from "react";
import * as CustomerService from "../../service/CustomerService/CustomerService";
import Helmet from "react-helmet";
import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import './CustomerCss.css';
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import ReactPaginate from "react-paginate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swallow from "sweetalert2";

function ListCustomer() {
    const [delCustomer, setDelCustomer] = useState({});
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigation = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);
    const handleName = (value) => {
        setName(value)
    };
    const handleEmail = (value) => {
        setEmail(value)
    };


    useEffect(() => {
        const getAll = async () => {
            try {
                const result = await CustomerService.getAll(name, email, 0);
                setCustomers(result.content);
                setTotalPages(result.totalPages);
            } catch (e) {
                console.log(e);
            }
        };
        getAll(name, email, 0);
    }, []);

    function handleDelete(customer) {
        setDelCustomer(customer)
        setShowModal(true)
    }

    const confirmDelete = async () => {
        try {
            await CustomerService.deleteCustomer(delCustomer);
            setShowModal(false);

            Swallow.fire("Xoá thành công!", "", "success").then(() => {
                getAll();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            getAll(currentPage);
        } catch (e) {
            console.log(e);
        }
    }

    const getAll = async (page) => {
        try {
            const response = await CustomerService.getAll(name, email, page);
            setCustomers(response.content);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAll(currentPage);
    }, [currentPage]);

    if (localStorage.getItem("rm")) {
        if(!localStorage.getItem("token")){
            navigation("/login");
        }
    } else {
        if(!sessionStorage.getItem("token")){
            navigation("/login");
        }
    }
    return (
        <>
            <Helmet>
                <title>Danh sách khách hàng</title>
            </Helmet>
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <h1 className="text-center">DANH SÁCH KHÁCH HÀNG</h1>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="d-flex align-items-center">
                                <Link to={"/add"} className="cus_display">
                                <button className="btn btn-in-list me-5">
                                    Thêm mới
                                </button>
                                </Link>
                                <Formik initialValues={{name: "", email: ""}} onSubmit={(values) => {
                                    CustomerService.getAll(values.name, values.email, 0).then((response) => {
                                        setCustomers(response.content);
                                        setTotalPages(response.totalPages);
                                        setCurrentPage(0);
                                        setName(values.name);
                                        setEmail(values.email);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }}>
                                    <Form className="form-inline" method="get">
                                        <div className="input-group">
                                            <Field name="name" className="form-control me-2 rounded-1"
                                                   placeholder="Nhập tên cần tìm"></Field>
                                            <Field name="email" className="form-control me-2 rounded-1"
                                                   placeholder="Nhập email cần tìm" size="30"></Field>
                                            <div>
                                                <button type="submit" className="btn btn-in-list">Tìm kiếm</button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div id="tbl-custom" className="row my-3 table-responsive">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <table className="table table-striped">
                                <thead>
                                <tr className="table-header-list-customer">
                                    <th className="cus-th">#</th>
                                    <th className="cus-th">Họ tên</th>
                                    <th className="cus-th">SĐT</th>
                                    <th className="cus-th">CCCD</th>
                                    <th className="cus-th">Email</th>
                                    <th className="cus-th">Công ty</th>
                                    <th className="cus-th">Tuỳ chọn</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers && customers.length > 0 ? (
                                    customers.map((customer, index) => (
                                            <tr key={customer.id}>
                                                <td>{index + 1}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.phoneNumber}</td>
                                                <td>{customer.card}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.company}</td>
                                                <td>
                                                    <button className="btn btn-action-list-customer"
                                                            onClick={() => handleDelete(customer)}>
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="no-data-found">
                                            Không tìm thấy dữ liệu
                                        </td>
                                    </tr>
                                )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận xoá</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Bạn có muốn xoá {delCustomer.name} không?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Huỷ
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Xoá
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row pagination">
                        {customers ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <ReactPaginate
                                    forcePage={currentPage}
                                    breakLabel="..."
                                    nextLabel="Trang sau"
                                    previousLabel="Trang trước"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1} // Chỉ hiển thị số trang đầu và cuối cùng
                                    marginPagesDisplayed={2} // Số lượng trang hiển thị ở trước và sau dấu chấm chấm
                                    pageCount={totalPages}
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                />
                            </div>
                        ) : (<div></div>)
                        }
                    </div>
                </div>
                <Footer/>
            </div>
        </>

    )

}

export default ListCustomer;