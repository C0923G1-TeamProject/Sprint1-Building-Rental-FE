import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import "../Css/Contract/list-contract.css";
import * as contractStatusService from "../../service/ThamService/ContractStatusService";
import * as contractService from "../../service/ThamService/ContractService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as premisesService from "../../service/PremisesService";
import Swal from "sweetalert2";

function CreateContract() {
  const [status, setStatus] = useState([]);
  const [contract, setContract] = useState([]);
  const [premisese, setPremises] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [contentContract, setContentContract] = useState("");
  const [chooseIdPremises, setChooseIdPremises] = useState();
  const [price, setPrice] = useState();
  const [premiseSelected, setPremiseSelected] = useState();
  const [totalPay, setTotalPay] = useState();
  const [idAcc, setIdAcc] = useState();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/contract");
  };
  // const initCreate = {
  //   code: "",
  //   startDate: "",
  //   endDate: "",
  //   deposit:
  //     premiseSelected && premiseSelected.price
  //       ? parseInt(premiseSelected.price)
  //       : "",
  //   content: "",
  //   paymentTerm: totalPay ? totalPay : "",
  //   idPremises: chooseIdPremises ? chooseIdPremises.id : "",
  //   idCustomer: "",
  //   idAccount: idAcc,
  // };
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  const validation = Yup.object({
    startDate: Yup.date()
      .nullable()
      .required("Ngày bắt đầu hợp đồng không được để trống")
      .min(
        today,
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
    // idAccount: Yup.number().required("Nội dung nay không được để trống"),
  });

  useEffect(() => {
    document.title = "Tạo mới hợp đồng";
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
      console.log(res);
      setCustomer(res);
    } catch (e) {
      console.log(e);
    }
  };
  //contentChange

  //
  const handleSubmitAdd = async (contract) => {
    const newContract = { ...contract };
    console.log(newContract);
    await contractService.addContract(newContract);
    Swal.fire("Thêm mới thành công!", "", "success").then(() => {
      navigate('/contract');
    });
    // navigate("/contract");
  };
  //hàm để tính ngày kết thúc
  const [startDate, setStartDate] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    if (selectedDate && numberOfMonths) {
      calculateEndDate(selectedDate, numberOfMonths, setFieldValue);
    }
  };

  const handleNumberOfMonthsChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    const months = parseInt(e.target.value);
    setNumberOfMonths(months);
    if (startDate && !isNaN(months)) {
      calculateEndDate(startDate, months, setFieldValue);
    }
  };

  const calculateEndDate = (start, months, setFieldValue) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(
      startDateObj.getFullYear(),
      startDateObj.getMonth() + months,
      startDateObj.getDate()
    );
    setEndDate(endDateObj.toISOString().split("T")[0]);
    setFieldValue("endDate", endDateObj);
  };

  //tính tổng tiền
  useEffect(() => {
    if (premiseSelected && premiseSelected.price && numberOfMonths) {
      getTotal(premiseSelected.price, numberOfMonths);
    }
  }, [premiseSelected, numberOfMonths]);

  const getTotal = (price, numberOfMonths) => {
    const totalPrice = parseInt(price * numberOfMonths);
    setTotalPay(totalPrice);
  };

  // tiền đặt cọc bắt buộc cọc trước 1 tháng tiền thuê, nên sẽ bằng với giá

  //tự động lấy tiền theo id mặt bằng

  const handelGetIdPremises = (e, setFieldValue) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFieldValue(name, value);
    const newValue = parseInt(e.target.value);
    setChooseIdPremises(newValue);
    handleRenderPrice(newValue, setFieldValue);

    // console.log(newValue);
  };

  // useEffect(() => {
  //   handleRenderPrice(chooseIdPremises);
  // }, [chooseIdPremises]);

  const handleRenderPrice = (chooseIdPremises, setFieldValue) => {
    if (chooseIdPremises) {
      premisesService.findPremises(chooseIdPremises).then((res) => {
        console.log(res);
        setPremiseSelected(res);
        const price = res.price;
        setPrice(price);
        setFieldValue("paymentTerm", price);
        setFieldValue("deposit", price);
      });
    } else {
      setFieldValue("paymentTerm", 0);
      setFieldValue("deposit", 0);
    }
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
      setIdAcc(res.idAccount);
    } catch (e) {
      console.log(e);
    }
  };
//format hiển thị tiền
  const formatCurrency = (amount) => {
    // Thực hiện các bước cần thiết để định dạng giá tiền theo định dạng VND
    const formattedAmount = amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formattedAmount;
  };



  if (!info) {
    return <div>loading</div>;
  }
  return (
    <>
      <HeaderAdmin />

      <div className="container-fluid product py-5">
        <div className="container py-5">
          <h1 className="text-center">THÊM MỚI HỢP ĐỒNG</h1>

          <Formik
            initialValues={{
              code: "",
              startDate: "",
              endDate: "",
              deposit:
                premiseSelected && premiseSelected.price
                  ? parseInt(premiseSelected.price)
                  : "",
              content: "",
              paymentTerm: totalPay ? totalPay : "",
              idPremises: chooseIdPremises ? chooseIdPremises.id : "",
              idCustomer: "",
              idAccount: idAcc,
            }}
            validationSchema={validation}
            validateOnChange={false}
            onSubmit={handleSubmitAdd}
            render={({ setFieldValue }) => (
              <Form className="row g-3 mt-3">
                {premisese.length > 0 ? (
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
                      value={chooseIdPremises}
                      onChange={(e) => handelGetIdPremises(e, setFieldValue)}
                    >
                      <option value="">Chọn mặt bằng</option>

                      {premisese.map((item) => (
                        <option key={item.id} value={item.id}>
                          Mã: {item.code} - Tầng: {item.floor}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="idPremises"
                      style={{ color: "red" }}
                      component={"span"}
                    />
                  </div>
                ) : (
                  <div>Hiện đã hết mặt bằng cho thuê</div>
                )}
                {customer && (
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

                      {customer.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="idCustomer"
                      style={{ color: "red" }}
                      component={"span"}
                    />
                  </div>
                )}
                <div className="col-md-4">
                  <label
                    for="inputState"
                    className="form-label title-create-contract"
                  >
                    Họ và tên nhân viên<span className="required-note"> *</span>
                  </label>
                  <Field
                    id="inputState"
                    className="form-select"
                    value={info.nameEmployee}
                    disabled
                  ></Field>
                  <ErrorMessage
                    name="idCustomer"
                    style={{ color: "red" }}
                    component={"span"}
                  />

                  <Field name="idAccount" value={info.idAccount} hidden></Field>
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
                    onChange={(e) => handleStartDateChange(e, setFieldValue)}
                    value={startDate}
                  />
                  <ErrorMessage
                    name="startDate"
                    style={{ color: "red" }}
                    component={"span"}
                  />
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
                    value={numberOfMonths}
                    onChange={(e) =>
                      handleNumberOfMonthsChange(e, setFieldValue)
                    }
                  />
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
                    disabled
                    name="endDate"
                    value={endDate}
                  />
                  <ErrorMessage
                    name="endDate"
                    style={{ color: "red" }}
                    component={"span"}
                  />
                </div>
                {/* <ErrorMessage name="idCustomer"/> */}
                <div className="col-md-4">
                  <label for="" className="form-label title-create-contract">
                    Giá tiền mỗi tháng (VNĐ)
                    <span className="required-note"> *</span>
                  </label>
                  <Field
                    type="number"
                    className="form-control"
                    id="inputAddress"
                    name="paymentTerm"
                    value={price}
                  />
                  <ErrorMessage
                    name="paymentTerm"
                    style={{ color: "red" }}
                    component={"span"}
                  />
                </div>
                <div className="col-md-4">
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
                    value={price}

                  />
                  <ErrorMessage
                    name="deposit"
                    style={{ color: "red" }}
                    component={"span"}
                  />
                </div>

                <div className="col-md-4">
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
                    value={totalPay}
                  />
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
                      className="form-control w-100"
                      id="inputAddress"
                      name="content"
                    />
                    <ErrorMessage
                      name="paymentTerm"
                      style={{ color: "red" }}
                      component={"span"}
                    />
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
                  
                  type="button"
                  className="btn btn-in-list mt-5 mr-3"
                > */}
                  <button
                    onClick={handleBack}
                    className="btn hisu-cancel mt-3 mr-3"
                    type="button"
                  >
                    Hủy thêm mới
                  </button>
                  {/* </a> */}
                  <button type="submit" className="btn hisu-confirm mt-3 mr-3">
                    Thêm mới hợp đồng
                  </button>
                  {/* <button type="submit" className="btn btn-in-list mt-5 mr-3">
                  In hợp đồng
                </button> */}
                </div>
              </Form>
            )}
          ></Formik>
        </div>
      </div>

      {/* <!-- body --> */}

      <Footer />

    </>
  );
}
export default CreateContract;
