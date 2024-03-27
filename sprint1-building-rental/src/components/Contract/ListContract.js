import HeaderAdmin from "../Header/HeaderAdmin";
import Footer from "../Footer/Footer";
import "../Css/Contract/list-contract.css";
import { useEffect, useState } from "react";
import * as contractStatusService from "../ThamService/ContractStatusService";
import * as contractService from "../ThamService/ContractService";

function LisContract() {
  const [status, setStatus] = useState([]);
  const initSearch = {
    nameCustomer: "",
    statusContract: "",
  };
  const [search, setSearch] = useState(initSearch);

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

  const [contracts, setContracts] = useState();
  useEffect(() => {
    getAllContract(search);
  }, []);

  const getAllContract = async (search) => {
    try {
      const res = await contractService.getAll(search);
      setContracts(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  // const handelSearchChange = (e)=>{
  //   const {name, value} = e.target;
  //   setSearch({...search,[name]:value});
  //   console.log(search);
  // }
  const handelSearchChange = (e) => {
    const { name, value } = e.target;
    const data = { ...search, [name]: value };
    setSearch(data);
    console.log(data);
  };

  const handleSearch = () => {
    getAllContract(search);
    console.log(search);
  };
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
              <a className="btn btn-in-list" href="./create-contract.html">
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
              {contracts.content.map((item, index) => {
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

          <div className="pagination-wrapper">
            <nav aria-label="...">
              <ul className="pagination pagination-circle ">
                <li className="page-item">
                  <a className="page-link">Trang đầu</a>
                </li>
                <div>
                  <div>
                    <li className="page-item active" aria-current="page">
                      <a className="page-link">
                        <span className="visually-hidden"></span>1
                      </a>
                    </li>
                  </div>
                </div>
                <li className="page-item">
                  <a className="page-link">Trang cuối</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
export default LisContract;
