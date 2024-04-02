import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";
import UploadImage from "./firebase/UploadImage";

import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getInfoUser,
  updateInfo,
} from "../../service/PersonalInformationService/information-service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Test() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [user, setUser] = useState();
  const navigation = useNavigate();

  const formatDate = (date) => {
    const newDate = moment(date).format("DD/MM/YYYY");
    return newDate;
  };
  const showModal = () => {
    setShow(true);
  };

  const handleEdit = () => {
    setIsEditing(false);
    setUser(null);
    getInfo();
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  }, []);

  const getInfo = async () => {
    try {
      const result = await getInfoUser();
      console.log(result);
      setUser(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const renderImage = () => {
    if (image) return image;
    if (preview) return URL.createObjectURL(preview);
    if (user.employee.profilePicture) return user.employee.profilePicture;
    return "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
  };

  if (!user) return <div>loadingg...</div>;

  const handleC = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  const renderInputCSS = (isEdit) => {
    return isEdit
      ? {
          position: "relative",
          //   top: "-5px",
        }
      : {
          position: "relative",
          //   top: "-5px",
          border: "none",
          backgroundColor: "white",
          color: "black",
        };
  };

  const renderInputAddress = (isEdit) => {
    return isEdit
      ? {
          position: "relative",
          overflow: "hidden",
          resize: "none",
          outline: "none",
        }
      : {
          position: "relative",
          overflow: "hidden",
          resize: "none",
          outline: "none",
          backgroundColor: "white",
          color: "black",
          border: "none",
        };
  };

  if (localStorage.getItem("token") == null) {
    navigation("/login");
  }
  return (
    <>
      <HeaderAdmin />
      <div className="container p-5">
        <h1 className="mt-3 text-center" style={{ color: "#ddb673" }}>
          Thông tin cá nhân
        </h1>

        <div className="row">
          <div
            className="col-md-12 col-lg-4 me-auto row"
            style={{
              borderRadius: "15px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
            }}
          >
            <div className="col-12">
              <p className="p-3">
                <img
                  src={renderImage()}
                  alt="Ảnh đại diện"
                  style={{
                    width: "100%",
                    height: "auto",
                    justifyContent: "center",
                  }} // Let the image flow freely within its container
                />
              </p>
            </div>
            <div className="col-12">
              <p>
                <div>
                  <UploadImage
                    user={user.employee}
                    setImage={setImage}
                    setPreview={setPreview}
                  />
                </div>
              </p>
            </div>
          </div>
          <div
            className="col-md-12 col-lg-8 row"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
              borderRadius: "15px",
            }}
          >
            <div className="col-12 p-3">
              <Formik
                initialValues={{
                  id: user.employee.id,
                  name: user.employee.name,
                  email: user.employee.email,
                  address: user.employee.address,
                  username: user.username,
                  date: user.employee.date,
                  gender: user.employee.gender ? "1" : "0",
                  profilePicture: user.employee.profilePicture,
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .min(2, "Họ và tên phải trên 1 kí tự")
                    .max(50, "Họ và tên phải dưới 50 kí tự")
                    .matches("^D$", "Vui lòng nhập Họ và tên hợp lệ")
                    .required("Họ và tên không được để trống"),
                  email: Yup.string()
                    .max(50, "Địa chỉ phải dưới 50 kí tự")
                    .email("Vui lòng nhập email đúng định dạng")
                    .required("Email không được bỏ trống"),
                  address: Yup.string()
                    .min(4, "Địa chỉ phải trên 4 kí tự")
                    .max(100, "Địa chỉ phải dưới 100 kí tự")
                    .required("Địa chỉ không được bỏ trống"),
                  date: Yup.date()
                    .max(minAgeDate, "Bạn chưa đủ 18 tuổi!")
                    .required("Ngày sinh không được bỏ trống"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  updateInfo(values).then(() => {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Cập nhật thông tin thành công!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setIsEditing(false);
                    setSubmitting(false);
                    getInfo();
                  });
                }}
              >
                <Form>
                  <Field type="hidden" name="id"></Field>
                  <div>
                    <p>
                      <div
                        style={{ background: "white" }}
                        className="col-12 row"
                      >
                        <div className="col-6 p-3">
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Họ và tên:
                            </span>
                            <>
                              <Field
                                className="form-control"
                                type="text"
                                name="name"
                                style={renderInputCSS(isEditing)}
                                disabled={!isEditing}
                              ></Field>
                              <ErrorMessage
                                name="name"
                                style={{
                                  color: "red",
                                  position: "absolute",
                                  bottom: "-29px",
                                  left: "115px",
                                }}
                                component={"div"}
                              />
                            </>
                          </div>
                          <div className="input-group mt-5">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Email:
                            </span>
                            <>
                              <Field
                                className="form-control"
                                type="text"
                                name="email"
                                style={renderInputCSS(isEditing)}
                                disabled={!isEditing}
                              ></Field>
                              <ErrorMessage
                                name="email"
                                style={{
                                  color: "red",
                                  position: "absolute",
                                  bottom: "-30px",
                                  left: "89px",
                                }}
                                component={"span"}
                              />
                            </>
                          </div>
                          <div className="input-group mt-5">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Địa chỉ:
                            </span>
                            <>
                              <Field
                                as="textarea"
                                name="address"
                                className="form-control"
                                style={renderInputAddress(isEditing)}
                                disabled={!isEditing}
                              ></Field>
                              <ErrorMessage
                                name="address"
                                style={{
                                  color: "red",
                                  position: "absolute",
                                  bottom: "-30px",
                                  left: "89px",
                                }}
                                component={"span"}
                              />
                            </>
                          </div>
                        </div>

                        <div className="col-6 p-3 ">
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Tài khoản:
                            </span>
                            <input
                              className="form-control"
                              value={user.username}
                              readOnly
                              style={{ border: "none", color: "black" }}
                            />
                          </div>
                          <div className="input-group mt-5">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Ngày sinh:
                            </span>
                            <>
                              <Field
                                className="form-control"
                                type="date"
                                name="date"
                                style={renderInputCSS(isEditing)}
                                disabled={!isEditing}
                              ></Field>
                              <ErrorMessage
                                name="date"
                                style={{
                                  color: "red",
                                  position: "absolute",
                                  bottom: "-29px",
                                  left: "115px",
                                }}
                                component={"span"}
                              />
                            </>
                          </div>
                          <div className="mt-5 col-12">
                            <span
                              className="input-group-text"
                              style={{
                                border: "none",
                                background: "white",
                              }}
                            >
                              <strong className="me-3"> Giới tính:</strong>{" "}
                              {isEditing ? (
                                <div>
                                  <div className="form-check form-check-inline">
                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      name="gender"
                                      id="male"
                                      value="1"
                                    />
                                    <label
                                      className="htmlForm-check-label"
                                      for="male"
                                    >
                                      Nam
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      name="gender"
                                      id="female"
                                      value="0"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="female"
                                    >
                                      Nữ
                                    </label>
                                  </div>
                                </div>
                              ) : user.employee.gender ? (
                                "Nam"
                              ) : (
                                "Nữ"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 mt-5 text-center">
                          {isEditing ? (
                            <button
                              className="button button-cancel me-3"
                              type="button"
                              onClick={handleEdit}
                              style={{ color: "white" }}
                            >
                              Hủy
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="button button-update-info me-3"
                              onClick={() => setIsEditing(true)}
                            >
                              Cập nhật thông tin
                            </button>
                          )}
                          {!isEditing && (
                            <Button
                              className="button button-change-password"
                              onClick={() => showModal()}
                            >
                              Đổi mật khẩu
                            </Button>
                          )}
                          {isEditing && (
                            <Button
                              className="button button-viiii"
                              type="submit"
                              style={{
                                background: " rgb(255, 237, 194)",
                                border: "none",
                                color: "black",
                              }}
                            >
                              Đồng ý
                            </Button>
                          )}
                        </div>
                      </div>
                    </p>
                    <ChangePasswordModal show={show} setShow={setShow} />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Test;
