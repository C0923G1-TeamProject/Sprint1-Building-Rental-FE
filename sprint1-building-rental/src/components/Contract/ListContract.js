import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Contract/list-contract.css";
import { useEffect, useState } from "react";
import * as contractStatusService from "../../service/contractService/ContractStatusService";
import * as contractService from "../../service/contractService/ContractService";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function LisContract() {
  const [status, setStatus] = useState([]);
  const [info, setInfo] = useState();
  const [idAcc, setIdAcc] = useState();
  const navigation = useNavigate();
  //search
  const initSearch = {
    nameCustomer: "",
    idContractStatus: "",
  };
  //paginate
  const initPage = {
    page: 0,
    size: 6,
    // sortDirection: "ASC",
    // sortBy: "endDate",
    nameCustomer: "",
    nameEmployee: "",
    idContractStatus: -1,
  };

  const initPageByEmployee = {
    page: 0,
    size: 6,
    // sortDirection: "ASC",
    // sortBy: "endDate",
    nameCustomer: "",
    nameEmployee: "",
    idContractStatus: -1,
    idAccount: idAcc ? idAcc : "",
  };
  const [search, setSearch] = useState(initSearch);
  const [pageContract, setPageContract] = useState(initPage);
  const [pageContractByEmployee, setPageContractByEmployee] =
    useState(initPageByEmployee);
  const [contracts, setContracts] = useState();
  const [contractsUser, setContractsUser] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [role1, setRole1] = useState(
    localStorage.getItem("rm")
      ? localStorage.getItem("role")
      : sessionStorage.getItem("role")
  );

  useEffect(() => {
    document.title = "Danh sách hợp đồng";
  }, []);

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

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await contractService.getInfo();
      setInfo(res);
      setIdAcc(res.idAccount);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // Cập nhật giá trị của idAcc vào requestDto mỗi khi idAcc thay đổi
    setPageContractByEmployee((pageContractByEmployee) => ({
      ...pageContractByEmployee,
      idAccount: idAcc,
    }));
  }, [idAcc]);

  useEffect(() => {
    getAllContract(pageContract);
  }, []);

  const getAllContract = async (pageContract) => {
    try {
      const res = await contractService.getAll(pageContract);
      setContracts(res);
    } catch (e) {
      console.log(e);
    }
  };
  // const new = {...pageContractByEmployee, idAcc : res.idAccount};

  //lấy hợp đồng theo idUser
  useEffect(() => {
    getAllContractByUser({ ...pageContractByEmployee, idAccount: idAcc });
  }, [idAcc]);

  const getAllContractByUser = async (pageContractByEmployee) => {
    try {
      const res = await contractService.getAllContractByUser(
        pageContractByEmployee
      );
      setContractsUser(res);
      console.log(pageContractByEmployee);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handelSearchChange = (e) => {
    const { name, value } = e.target;
    const data = { ...pageContract, [name]: value.trim() };
    setPageContract(data);
    console.log(data);
  };

  const handleSearch = () => {
    getAllContract(pageContract);
    console.log(pageContract);
  };

  //phaan trang

  const handleChangePage = async (page) => {
    const data = { ...pageContract, page: page.selected };
    setPageContract(data);
    getAllContract(data);
  };

  //theo account

  const handelSearchChangeEmployee = (e) => {
    const { name, value } = e.target;
    const data = { ...pageContractByEmployee, [name]: value.trim() };
    setPageContractByEmployee(data);
    console.log(data);
  };

  const handleSearchEmployee = () => {
    getAllContractByUser(pageContractByEmployee);
    console.log(pageContractByEmployee);
  };

  //phaan trang

  const handleChangePageEmployee = async (page) => {
    const data = { ...pageContractByEmployee, page: page.selected };
    setPageContractByEmployee(data);
    getAllContractByUser(data);
  };

  if (localStorage.getItem("rm")) {
    if (!localStorage.getItem("token")) {
      navigation("/login");
    }
  } else {
    if (!sessionStorage.getItem("token")) {
      navigation("/login");
    }
  }

  if (!contracts) {
    return <div>loading</div>;
  }

  if (role1 == "ROLE_ADMIN") {
    return (
      <>
        <HeaderAdmin />
        <div className="container">
          <h1 className="text-center fw-bold text-uppercase">
            DANH SÁCH HỢP ĐỒNG
          </h1>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="input-group mb-3">
                <div className="me-5">
                  <Link className="btn btn-in-list" to="/contract/create">
                    Thêm mới
                  </Link>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control rounded-1 me-2"
                    placeholder="Tìm kiếm tên khách hàng"
                    name="nameCustomer"
                    onChange={handelSearchChange}
                    size="25"
                    maxLength="150"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control rounded-1 me-2"
                    placeholder="Tìm kiếm tên nhân viên"
                    name="nameEmployee"
                    size="25"
                    onChange={handelSearchChange}
                    maxLength="150"

                  />
                </div>
                {status && (
                  <div className="me-4">
                    <select
                      className="form-select"
                      name="idContractStatus"
                      onChange={handelSearchChange}
                    >
                      <option selected value="-1">
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

                <div className="col-sm-2">
                  <button
                    type="submit"
                    className="btn btn-in-list"
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <div id="tbl-custom" className="table-responsive">
                <table className="table table-striped ">
                  <thead>
                    <tr className="">
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        #
                      </th>
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Mã hợp đồng
                      </th>
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Mã mặt bằng
                      </th>
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Khách hàng
                      </th>
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Nhân viên tạo hợp đồng
                      </th>

                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Trạng thái
                      </th>
                      <th
                        style={{ color: `white`, backgroundColor: `#747264` }}
                      >
                        Ngày bắt đầu
                      </th>
                      <th
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
                            <td>{contracts.number * 6 + index + 1}</td>
                            <td>{item.code}</td>
                            <td>
                              Mã: {item.premises.code} - Tầng:{" "}
                              {item.premises.floor}
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
                        <td colSpan="8">Không tìm thấy nội dung này</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                {contracts ? (
                  // <div className="d-flex justify-content-center align-items-center">
                  <ReactPaginate
                    forcePage={contracts.number}
                    breakLabel="..."
                    nextLabel="Trang sau"
                    previousLabel="Trang trước"
                    onPageChange={handleChangePage}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={contracts.totalPages}
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
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  if (role1 == "ROLE_USER") {
    return (
      <div>
        <HeaderAdmin />
        <div className="container">
          <h1 className="text-center fw-bold text-uppercase">
            DANH SÁCH HỢP ĐỒNG
          </h1>

          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <div className="input-group mb-4">
                <div className="me-4">
                  <Link className="btn btn-in-list" to="/contract/create">
                    Thêm mới
                  </Link>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control rounded-1 me-2"
                    placeholder="Tìm kiếm tên khách hàng"
                    name="nameCustomer"
                    size="25"
                    onChange={handelSearchChangeEmployee}
                  />
                </div>

                {status && (
                  <div className="me-4">
                    <select
                      className="form-select"
                      name="idContractStatus"
                      onChange={handelSearchChangeEmployee}
                    >
                      <option selected value="-1">
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
                    onClick={handleSearchEmployee}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
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
                  {contractsUser.content && contractsUser.content.length > 0 ? (
                    contractsUser.content.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{contractsUser.number * 6 + index + 1}</td>
                          <td>{item.code}</td>
                          <td>
                            Mã: {item.premises.code} - Tầng:{" "}
                            {item.premises.floor}
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
                      <td colSpan="8">Không tìm thấy nội dung này</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div>
                {contractsUser ? (
                  // <div className="d-flex justify-content-center align-items-center">
                  <ReactPaginate
                    forcePage={contractsUser.number}
                    breakLabel="..."
                    nextLabel="Trang sau"
                    previousLabel="Trang trước"
                    onPageChange={handleChangePageEmployee}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    pageCount={contractsUser.totalPages}
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
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LisContract;
