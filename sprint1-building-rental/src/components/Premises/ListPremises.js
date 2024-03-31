import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../service/PremisesService";
import ReactPaginate from "react-paginate";
import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Premises/ListPremises.css";

export default function ListPremises() {

    const [premisesList, setPremisesList] = useState([]);
    const [floor, setFloor] = useState("");
    const [code, setCode] = useState("");
    const [area, setArea] = useState(99999);
    const [premisesName, setPremisesName] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await service.getAllPremises(floor, code, area, premisesName, 0);
                console.log(result);
                setPremisesList(result.content);
                setTotalPages(result.totalPages);
                document.title = "Danh sách mặt bằng"
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(floor, code, area, premisesName, 0);
    }, []);


    const handleFloor = (value) => {
        setFloor(value);
    };

    const handleCode = (value) => {
        setCode((value))
    };

    const handleArea = (value) => {
        setArea(value);
    };

    const handlePremisesName = (value) => {
        setPremisesName(value);
    }

    const submitSearch = async () => {
        console.log(2)
        try {

            let res = await service.getAllPremises(floor, code, area, premisesName, 0).then();
            setPremisesList(res.content);
            setTotalPages(res.totalPages);
            setCurrentPage(0);
            console.log("submit success");
        } catch (e) {
            console.log("submit Fail");
        }
    }


    // const handlePageClick = async (event) => {
    //     try {
    //         const pageNumber = event.selected;
    //         setCurrentPage(pageNumber);
    //         const result = await service.getAllPremises(floor, code, area, premisesName);
    //         setPremisesList(result.content);
    //         setTotalPages(result.totalPages);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            // Gọi fetchData với currentPage mới
            fetchData(pageNumber);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchData = async (page) => {
        try {
            const result = await service.getAllPremises(floor, code, area, premisesName, page);
            setPremisesList(result.content);
            setTotalPages(result.totalPages);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code', // Sử dụng mã tiền tệ
    });

    /*Giao diện*/
    return (
        <>
            <HeaderAdmin/>
            <div className="container">
                <h2 className="text-center fw-bold text-uppercase">Danh sách mặt bằng</h2>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">

                            <div className="input-group">

                                <select className="form-control rounded-1 me-2"
                                        onChange={(event) => handleFloor(event.target.value)}>
                                    <option value="">Chọn tầngㅤㅤㅤㅤㅤㅤ▼</option>
                                    <option value="1">Tầng 1</option>
                                    <option value="2">Tầng 2</option>
                                    <option value="3">Tầng 3</option>
                                    <option value="4">Tầng 4</option>
                                    <option value="5">Tầng 5</option>
                                    <option value="6">Tầng 6</option>
                                    <option value="7">Tầng 7</option>
                                    <option value="8">Tầng 8</option>
                                    <option value="9">Tầng 9</option>
                                </select>


              <div>
                <button
                  onClick={() => submitSearch()}
                  type="button"
                  className="btn btn-in-list"
                >
                  Tìm kiếm
                </button>
              </div>

                                <input onChange={(event) => handleCode(event.target.value)} type="text"
                                       className="form-control rounded-1 me-2" name="name-search" size="25"
                                       placeholder="Mã mặt bằng"/>


                                <input onChange={(event) => handleArea(event.target.value)} type="text"
                                       className="form-control rounded-1 me-2" name="name-search" size="25"
                                       placeholder="Diện tích tối đa"/>


                                <input onChange={(event) => handlePremisesName(event.target.value)} type="text"
                                       className="form-control rounded-1 me-2" name="name-search" size="25"
                                       placeholder="Loại mặt bằng"/>

                                <div>
                                    <button onClick={() => submitSearch()} type="button" className="btn btn-in-list">Tìm
                                        kiếm
                                    </button>
                                </div>
                            </div>

                    </div>

                    <div className="col-1"></div>
                </div>
                <div className="row my-3">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã mặt bằng</th>
                            <th>Loại mặt bằng</th>
                            <th>Diện tích (m²)</th>
                            <th>Trạng thái</th>
                            <th>Giá bán</th>
                            <th>Phí quản lý</th>
                            <th className="text-center">Tuỳ chọn</th>

                        </tr>
                        </thead>
                        <tbody>
                        {premisesList ? (
                            premisesList.map((premises, index) => (
                                    <tr key={premises.id}>
                                        <td>{(currentPage - 1) * 3 + (index + 1) + 3}</td>
                                        <td>{premises.code}</td>
                                        <td>{premises.typePremises.name}</td>
                                        <td>{premises.area}</td>
                                        <td>{premises.premisesStatus.name}</td>
                                        <td>{VND.format(premises.price)}</td>
                                        <td>{VND.format(premises.cost)}</td>
                                        <td className="text-center"><Link to={`/update-premises/${premises.id}`} className="custom-link-style">
                                            <button className="btn btn-feature">Sửa</button>
                                        </Link></td>

                                    </tr>

                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={9}>
                                    Không tìm thấy dữ liệu
                                </td>
                            </tr>
                        )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row pb-5">
                    {premisesList ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <ReactPaginate
                                forcePage={currentPage}
                                breakLabel="..."
                                nextLabel="Trang sau"
                                previousLabel="Trang trước"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={2}
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
                    ):(<div></div>)
                    }
                </div>
            </div>
            <Footer/>
        </>
    );
}