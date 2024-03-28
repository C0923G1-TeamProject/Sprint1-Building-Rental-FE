import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Contract/list-contract.css";
import { useEffect, useState } from "react";
import * as contractStatusService from "../ThamService/ContractStatusService";
import * as contractService from "../ThamService/ContractService";
import Pagination from "react-bootstrap/Pagination";

function LisContract() {
  const [status, setStatus] = useState([]);
  //search
  const initSearch = {
    nameCustomer: "",
    statusContract: "",
  };
  //paginate
  const initPage = {
    page: 0,
    size: 5,
    // sortDirection: "ASC",
    // sortBy: "endDate",
    nameCustomer: "",
    statusContract: "",
  };
  const [search, setSearch] = useState(initSearch);
  const [pageContract, setPageContract] = useState(initPage);
  const [contracts, setContracts] = useState();

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

  return (
    <>
      <HeaderAdmin />
      <div className="container-fluid product py-5">
        <div className="container py-5">
          <h1 className="display-6 text-center">DANH SÁCH HỢP ĐỒNG</h1>

          <div className="row mt-5">
            <div className="col-sm-2 mb-3">
              <a className="btn btn-in-list" href="/contract/create">
                Tạo mới hợp đồng
              </a>
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
                placeholder="Tìm kiếm tên mặt bằng"
                name="premises"
                onChange={handelSearchChange}
              />
            </div> */}
            {status && (
              <div className="col-sm-2 mb-3">
                <select
                  className="form-select"
                  name="statusContract"
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
                  Tên khách hàng
                </th>
                <th
                  scope="col"
                  style={{ color: `white`, backgroundColor: `#747264` }}
                >
                  Tên mặt bằng
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
                  Ngày kết thúc
                </th>
              </tr>
            </thead>
            <tbody>
              {contracts.content &&
                contracts.content.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>{item.nameCustomer}</td>
                      <td>{item.deposit}</td>
                      <td>{item.contractStatus}</td>

                      <td>{item.endDate}</td>
                    </tr>
                  );
                })}
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
export default LisContract;
