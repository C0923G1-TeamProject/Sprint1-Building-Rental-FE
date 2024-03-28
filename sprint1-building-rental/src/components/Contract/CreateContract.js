import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../Css/Contract/list-contract.css";
import * as contractStatusService from "../ThamService/ContractStatusService";
import axios from "axios";
import * as contractService from "../ThamService/ContractService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateContract() {
  const [status, setStatus] = useState([]);
  const [contract, setContract] = useState([]);
  const [premisese, setPremises] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [contentContract, setContentContract] = useState("");
  const navigate = useNavigate();
  const initCreate = {
    code: "",
    startDate: "",
    endDate: "",
    deposit: "",
    content: "",
    paymentTerm: "",
    idPremises: "",
    idCustomer: "",
    idAccount: "",
    idContractStatus: "",
  };
  const validation = Yup.object({
    startDate: Yup.date()
      .nullable()
      .required("Ngày bắt đầu hợp đồng không được để trống")
      .min(
        new Date(),
        "Ngày bắt đầu hợp đồng không được nhỏ hơn ngày hiện tại"
      ),
    endDate: Yup.date()
      .nullable()
      .required("Ngày kết thúc hợp đồng không được để trống")
      .min(
        Yup.ref("startDate"),
        "Ngày kết thúc hợp đồng phải sau ngày bắt đầu hợp đồng"
      ),
    deposit: Yup.number()
      .required("Tiền đặt cọc không được để trống")
      .min(0, "Tiền đặt cọc không được nhỏ hơn 0")
      .max(1000000000, "Tiền đặt cọc không được lớn hơn 1,000,000,000"),
    content: Yup.string().required("Nội dung hợp đồng không được để trống"),
    paymentTerm: Yup.string().required("Nội dung nay không được để trống"),
    idPremises: Yup.number().required("Vui lòng chọn mặt bằng"),
    idCustomer: Yup.number().required("Vui lòng chọn khách hàng"),
    idAccount: Yup.number().required("Nội dung nay không được để trống"),
    idContractStatus: Yup.number().required(
      "Vui lòng chọn trạng thái hợp đồng"
    ),
  });
  //lấy status
  useEffect(() => {
    getAllStatus();
  }, []);

  //lấy mặt bằng
  useEffect(() => {
    getAllPremises();
  }, []);

  //lấy khách hàng
  useEffect(() => {
    getAllCustomer();
  }, []);

  const getAllStatus = async () => {
    try {
      const res = await contractStatusService.getAllStatus();
      setStatus(res);
    } catch (e) {
      console.log(e);
    }
  };

  //
  const getAllPremises = async () => {
    try {
      const res = await contractService.getAllPremises();
      setPremises(res);
    } catch (e) {
      console.log(e);
    }
  };

  //
  const getAllCustomer = async () => {
    try {
      const res = await contractService.getAllCustomer();
      setCustomer(res);
    } catch (e) {
      console.log(e);
    }
  };
  //contentChange

  const contentChange = (e) => {
    setContentContract(e.target);
    console.log(e);
  };
  //
  const handleSubmitAdd = async (contract) => {
    const newContract = { ...contract };
    await contractService.addContract(newContract);
    toast.success("Add new success!");
    navigate("/contract");
  };

  return (
    <>
      <HeaderAdmin />

      <div className="container-fluid product py-5">
        <div className="container py-5">
          <h1 className="text-center">THÊM MỚI HỢP ĐỒNG</h1>

          <Formik
            initialValues={initCreate}
            validationSchema={validation}
            onSubmit={handleSubmitAdd}
          >
            <Form className="row g-3 mt-3">
              <div className="row">
                {premisese.content && (
                  <div className="col-md-4">
                    <label
                      for="inputState"
                      className="form-label title-create-contract"
                    >
                      Mặt bằng<span className="required-note"> *</span>
                    </label>
                    <Field
                      as="select"
                      id="inputState"
                      className="form-select"
                      name="idPremises"
                    >
                      <option selected>Chọn mặt bằng</option>

                      {premisese.content.map((item) => (
                        <option key={item.id} value={item.id}>
                          Mã: {item.code} - Tầng: {item.floor}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="idPremises" />
                  </div>
                )}

                <div className="col-md-4">
                  <label
                    for="inputAddress"
                    className="form-label title-create-contract"
                  >
                    Trạng thái
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    name="idContractStatus"
                    // onChange={handelSearchChange}
                  >
                    <option selected value="">
                      Chọn trạng thái
                    </option>
                    {status.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="idContractStatus" />
                </div>
                {customer.content && (
                  <div className="col-md-4">
                    <label
                      for="inputState"
                      className="form-label title-create-contract"
                    >
                      Họ và tên khách hàng
                      <span className="required-note"> *</span>
                    </label>
                    <Field
                      as="select"
                      id="inputState"
                      className="form-select"
                      name="idCustomer"
                    >
                      <option selected>Chọn tên khách hàng</option>

                      {customer.content.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="idCustomer" />
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label
                  for="inputPassword4"
                  className="form-label title-create-contract"
                >
                  Ngày bắt đầu thuê<span className="required-note"> *</span>
                </label>
                <Field
                  type="date"
                  className="form-control"
                  id="inputPassword4"
                  name="startDate"
                />
                <ErrorMessage name="startDate" />
              </div>
              <div className="col-md-4">
                <label
                  for="inputPassword4"
                  className="form-label title-create-contract"
                >
                  Ngày kết thúc thuê<span className="required-note"> *</span>
                </label>
                <Field
                  type="date"
                  className="form-control"
                  id="inputPassword4"
                  name="endDate"
                />
                <ErrorMessage name="endDate" />
              </div>
              <div className="col-md-4">
                <label
                  for="inputEmail4"
                  className="form-label title-create-contract"
                >
                  Kỳ hạn (tháng) <span className="required-note"> *</span>
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="inputEmail4"
                  disabled
                  value="1"
                />
              </div>
              {/* <ErrorMessage name="idCustomer"/> */}

              {/* <div className="col-md-6">
                <label
                  for=""
                  className="form-label title-create-contract"
                >
                  Giá tiền mỗi tháng (VNĐ)
                  <span className="required-note"> *</span>
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="inputAddress"
                />
              </div> */}

              <div className="col-md-6">
                <label
                  for="inputAddress"
                  className="form-label title-create-contract"
                >
                  Tiền cọc (VNĐ)<span className="required-note"> *</span>
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="inputAddress"
                  name="deposit"
                />
                <ErrorMessage name="deposit" />
              </div>

              <div className="col-md-6">
                <label
                  for="inputAddress"
                  className="form-label title-create-contract"
                >
                  Tổng tiền (VNĐ)<span className="required-note"> *</span>
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="inputAddress"
                  name="paymentTerm"
                />
                <ErrorMessage name="paymentTerm" />
              </div>

              <div className="col-md-6">
                <label
                  for="inputState"
                  className="form-label title-create-contract"
                >
                  Họ và tên nhân viên<span className="required-note"> *</span>
                </label>
                <Field
                  as="select"
                  id="inputState"
                  className="form-select"
                  name="idAccount"
                >
                  <option selected>Chọn tên nhân viên</option>
                  <option value="1">Trần Kim Tiểu Vi</option>
                </Field>
                <ErrorMessage name="idCustomer" />
              </div>

              <div className="col-md-12">
                <label
                  for="inputZip"
                  className="form-label title-create-contract"
                >
                  Nội dung hợp đồng<span className="required-note"> *</span>
                </label>
                <div>
                  <Field
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    name="content"
                  />
                  <ErrorMessage name="paymentTerm" />
                  {/* <ErrorMessage name="content" /> */}
                </div>
              </div>

              {/* <ReactQuill
                theme="snow"
                value={contentContract}
                onChange={contentChange}
                name="content"
              /> */}

              <div>
                {/* <a
                  href="../contract/list-contract.html"
                  type="submit"
                  className="btn btn-in-list mt-5 mr-3"
                >
                  <button type="button">Hủy thêm mới</button>
                </a> */}
                <button type="submit" className="btn btn-in-list mt-5 mr-3">
                  Thêm mới
                </button>
                {/* <button type="submit" className="btn btn-in-list mt-5 mr-3">
                  In hợp đồng
                </button> */}
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      {/* <!-- body --> */}

      <Footer />
    </>
  );
}
export default CreateContract;
