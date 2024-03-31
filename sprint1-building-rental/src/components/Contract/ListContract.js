import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Contract/list-contract.css";
import { useEffect, useState } from "react";
import * as contractStatusService from "../../service/ThamService/ContractStatusService";
import * as contractService from "../../service/ThamService/ContractService";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await contractService.getInfo();
      console.log(res);
      setInfo(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllContract(pageContract);
  }, []);

  //lấy hợp đồng theo idUser
  useEffect(() => {
    getAllContractByUser(pageContract, info.idAccount);
  }, []);

  const getAllContractByUser = async (pageContract, idAccount) => {
    try {
      const res = await contractService.getAllContractByUser(
        pageContract,
        idAccount
      );
      setContracts(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllContract = async (pageContract) => {
    try {
      const res = await contractService.getAll(pageContract);
      setContracts(res);
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

  const handleChangePage = async (page) => {
    const data = { ...pageContract, page };
    setPageContract(data);
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
        <div className="container-fluid product py-5">
          <div className="container py-5">
            <h1 className="display-6 text-center">DANH SÁCH HỢP ĐỒNG</h1>

            <div className="row mt-5">
              <div className="col-sm-2 mb-3">
                <Link className="btn btn-in-list" to="/contract/create">
                  Tạo mới hợp đồng
                </Link>
              </div>
              <div className="col-sm-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm tên khách hàng"
                  name="nameCustomer"
                  onChange={handelSearchChange}
                />
              </div>
              <div className="col-sm-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm tên nhân viên"
                  name="nameEmployee"
                  onChange={handelSearchChange}
                />
              </div>
              {status && (
                <div className="col-sm-2 mb-3">
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
            <div className="col-sm-2">
              {contracts.content.length > 0 && (
                <Pagination>
                  <Pagination.First
                    disabled={contracts.number <= 0}
                    onClick={() => handleChangePage(0)}
                  />
                  <Pagination.Prev
                    disabled={contracts.number <= 0}
                    onClick={() => handleChangePage(contracts.number - 1)}
                  />

                  {Array.from(Array(contracts.totalPages)).map((e, i) => (
                    <Pagination.Item
                      active={contracts.number === i}
                      key={i + 1}
                      onClick={() => handleChangePage(i)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={contracts.number >= contracts.totalPages - 1}
                    onClick={() => handleChangePage(contracts.number + 1)}
                  />
                  <Pagination.Last
                    disabled={contracts.number >= contracts.totalPages - 1}
                    onClick={() => handleChangePage(contracts.totalPages - 1)}
                  />
                </Pagination>
              )}
            </div>
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
        <div className="container-fluid product py-5">
          <div className="container py-5">
            <h1 className="display-6 text-center">DANH SÁCH HỢP ĐỒNG</h1>

            <div className="row mt-5">
              <div className="col-sm-2 mb-3">
                <Link className="btn btn-in-list" to="/contract/create">
                  Tạo mới hợp đồng
                </Link>
              </div>
              <div className="col-sm-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm tên khách hàng"
                  name="nameCustomer"
                  onChange={handelSearchChange}
                />
              </div>
              {/* <div className="col-sm-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm tên nhân viên"
                  name="nameEmployee"
                  onChange={handelSearchChange}
                />
              </div> */}
              {status && (
                <div className="col-sm-2 mb-3">
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
            <div className="col-sm-2">
              {contracts.content.length > 0 && (
                <Pagination>
                  <Pagination.First
                    disabled={contracts.number <= 0}
                    onClick={() => handleChangePage(0)}
                  />
                  <Pagination.Prev
                    disabled={contracts.number <= 0}
                    onClick={() => handleChangePage(contracts.number - 1)}
                  />

                  {Array.from(Array(contracts.totalPages)).map((e, i) => (
                    <Pagination.Item
                      active={contracts.number === i}
                      key={i + 1}
                      onClick={() => handleChangePage(i)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={contracts.number >= contracts.totalPages - 1}
                    onClick={() => handleChangePage(contracts.number + 1)}
                  />
                  <Pagination.Last
                    disabled={contracts.number >= contracts.totalPages - 1}
                    onClick={() => handleChangePage(contracts.totalPages - 1)}
                  />
                </Pagination>
              )}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}
export default LisContract;
