import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Contract/list-contract.css";
import { useEffect, useState } from "react";
import * as contractStatusService from "../../service/ThamService/ContractStatusService";
import * as contractService from "../../service/ThamService/ContractService";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function LisContract() {
  const [status, setStatus] = useState([]);
  //search
  const initSearch = {
    nameCustomer: "",
    idContractStatus: "",
  };
  //paginate
  const initPage = {
    page: 0,
    size: 2,
    // sortDirection: "ASC",
    // sortBy: "endDate",
    nameCustomer: "",
    nameEmployee: "",
    idContractStatus: -1,
  };
  const [search, setSearch] = useState(initSearch);
  const [pageContract, setPageContract] = useState(initPage);
  const [contracts, setContracts] = useState();
  const [contractsUser, setContractsUser] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    document.title = "Danh sách hợp đồng";
  });

  useEffect(() => {
    getAllStatus();
  }, []);

  const getAllStatus = async () => {
    try {
      const res = await contractStatusService.getAllStatus();
      setStatus(res);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  //lấy thông tin nhân viên

  const [info, setInfo] = useState();
  const [idAcc, setIdAcc] = useState();

  useEffect(() => {
    getInfo();

  }, []);

  const getInfo = async () => {
    try {
      const res = await contractService.getInfo();
      console.log(res);
      setInfo(res);
      setIdAcc(res.idAccount);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllContract(pageContract);
  }, [pageContract]);

  //lấy hợp đồng theo idUser
  useEffect(() => {
    getAllContractByUser(idAcc);
  }, []);

  const getAllContractByUser = async ( idAccount) => {
    try {
      const res = await contractService.getAllContractByUser(   
        idAccount
      );
      setContractsUser(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllContract = async (pageContract) => {
    try {
      const res = await contractService.getAll(pageContract);
      setContracts(res);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const handelSearchChange = (e) => {
    const { name, value } = e.target;
    const data = { ...pageContract, [name]: value };
    setPageContract(data);
    console.log(data);
  };

  const handleSearch = () => {
    getAllContract(pageContract);
    console.log(pageContract);
  };

  //phaan trang

  const handleChangePage = async (selectedPage) => {
    const data = { ...pageContract, page: selectedPage };
    // setPageContract(data);
    setCurrentPage(selectedPage);
    getAllContract(data);
  };


  // useEffect(() => {
  //   getAllContract(search);
  // }, [search]);
  if (!contracts) {
    return <div>loading</div>;
  }

  if (localStorage.getItem("role") == "ROLE_ADMIN") {
    return (
      <>
        <HeaderAdmin />
          <div className="container">
            <h1 className="text-center fw-bold text-uppercase">DANH SÁCH HỢP ĐỒNG</h1>

            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <div className="input-group">
                  <div className="me-4">
                    <Link className="btn btn-in-list" to="/contract/create">
                      Tạo mới hợp đồng
                    </Link>
                  </div>
                  <div>
                    <input
                        type="text"
                        className="form-control rounded-1 me-2"
                        placeholder="Tìm kiếm tên khách hàng"
                        name="nameCustomer"
                        onChange={handelSearchChange}
                    />
                  </div>
                  <div>
                    <input
                        type="text"
                        className="form-control rounded-1 me-2"
                        placeholder="Tìm kiếm tên nhân viên"
                        name="nameEmployee"
                        onChange={handelSearchChange}
                    />
                  </div>
                  {status && (
                      <div className="me-4">
                        <select
                            className="form-select"
                            name="idContractStatus"
                            onChange={handelSearchChange}
                        >
                          <option selected value="">
                            Tìm kiếm trạng thái
                          </option>
                          {status.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name}
                              </option>
                          ))}
                        </select>
                      </div>
                  )}

                  <div>
                    <button
                        type="submit"
                        className="btn btn-in-list"
                        onClick={handleSearch}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-1">
              </div>
            </div>

            <div id="tbl-custom" className="row my-3 table-responsive">
                 <div className="col-1"></div>
                  <div className="col-10">
                    <table className="table table-striped ">
                      <thead>
                      <tr className="table-header-list-contract">
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          #
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Mã hợp đồng
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Mã mặt bằng
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Khách hàng
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Nhân viên tạo hợp đồng
                        </th>

                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Trạng thái
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Ngày bắt đầu
                        </th>
                        <th
                            scope="col"
                            style={{ color: `white`, backgroundColor: `#747264` }}
                        >
                          Ngày kết thúc
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      {contracts.content && contracts.content.length > 0 ? (
                          contracts.content.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>{item.code}</td>
                                  <td>
                                    Mã: {item.premises.code} - Tầng: {item.premises.floor}
                                  </td>
                                  <td>{item.customer.name}</td>
                                  <td>{item.nameEmployee}</td>
                                  <td>{item.contractStatus.name}</td>
                                  <td>{formatDate(item.startDate)}</td>
                                  <td>{formatDate(item.endDate)}</td>
                                </tr>
                            );
                          })
                      ) : (
                          <tr>
                            <td colSpan="6">Không tìm thấy nội dung này</td>
                          </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-1"></div>
                </div>

            <div className="row pb-5">
              {contracts ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <ReactPaginate
                        forcePage={currentPage}
                        pageCount={totalPages}
                        onPageChange={(selectedItem) => handleChangePage(selectedItem.selected)}
                        nextLabel="Trang sau"
                        previousLabel="Trang trước"
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
              ) : (<div></div>)}
            </div>
              </div>


        <Footer></Footer>
      </>
    );
  }
  if (localStorage.getItem("role") == "ROLE_USER") {
    return (
        <>
          <HeaderAdmin />
          <div className="container">
            <h1 className="text-center fw-bold text-uppercase">DANH SÁCH HỢP ĐỒNG</h1>

            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                {/*<div className="input-group">*/}
                {/*  <div className="me-4">*/}
                {/*    <Link className="btn btn-in-list" to="/contract/create">*/}
                {/*      Tạo mới hợp đồng*/}
                {/*    </Link>*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        className="form-control rounded-1 me-2"*/}
                {/*        placeholder="Tìm kiếm tên khách hàng"*/}
                {/*        name="nameCustomer"*/}
                {/*        onChange={handelSearchChange}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        className="form-control rounded-1 me-2"*/}
                {/*        placeholder="Tìm kiếm tên nhân viên"*/}
                {/*        name="nameEmployee"*/}
                {/*        onChange={handelSearchChange}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  {status && (*/}
                {/*      <div className="me-4">*/}
                {/*        <select*/}
                {/*            className="form-select"*/}
                {/*            name="idContractStatus"*/}
                {/*            onChange={handelSearchChange}*/}
                {/*        >*/}
                {/*          <option selected value="">*/}
                {/*            Tìm kiếm trạng thái*/}
                {/*          </option>*/}
                {/*          {status.map((item) => (*/}
                {/*              <option value={item.id} key={item.id}>*/}
                {/*                {item.name}*/}
                {/*              </option>*/}
                {/*          ))}*/}
                {/*        </select>*/}
                {/*      </div>*/}
                {/*  )}*/}

                {/*  <div>*/}
                {/*    <button*/}
                {/*        type="submit"*/}
                {/*        className="btn btn-in-list"*/}
                {/*        onClick={handleSearch}*/}
                {/*    >*/}
                {/*      Tìm kiếm*/}
                {/*    </button>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              <div className="col-1">
              </div>
            </div>

            <div id="tbl-custom" className="row my-3 table-responsive">
              <div className="col-1"></div>
              <div className="col-10">
                <table className="table table-striped ">
                  <thead>
                  <tr className="table-header-list-contract">
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      #
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Mã hợp đồng
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Mã mặt bằng
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Khách hàng
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Nhân viên tạo hợp đồng
                    </th>

                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Trạng thái
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Ngày bắt đầu
                    </th>
                    <th
                        scope="col"
                        style={{ color: `white`, backgroundColor: `#747264` }}
                    >
                      Ngày kết thúc
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                    {contractsUser ? (
                        contractsUser.map((item, index) => {
                          return (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>
                                  Mã: {item.premises.code} - Tầng: {item.premises.floor}
                                </td>
                                <td>{item.customer.name}</td>
                                <td>{item.nameEmployee}</td>
                                <td>{item.contractStatus.name}</td>
                                <td>{formatDate(item.startDate)}</td>
                                <td>{formatDate(item.endDate)}</td>
                              </tr>
                          );
                        })
                    ) : (
                        <tr>
                          <td colSpan="6">Không tìm thấy nội dung này</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="col-1"></div>
            </div>


          </div>


          <Footer></Footer>
        </>
    );
  }
}
export default LisContract;
