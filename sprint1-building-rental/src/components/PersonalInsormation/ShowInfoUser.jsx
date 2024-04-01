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
function ShowInfoUser() {
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
    setUser(null)
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
          top: "-5px",
          width: "100%",
        }
      : {
          position: "relative",
          top: "-5px",
          border: "none",
          backgroundColor: "white",
          color: "black",
          width: "100%",
        };
  };

  const renderInputAddress = (isEdit) => {
    return isEdit
      ? {
          position: "relative",
          top: "-5px",
          width: "100%",
          overflow: "hidden",
          resize: "none",
          outline: "none",
          borderBottom: "solid 2px #ddc383",
        }
      : {
          position: "relative",
          top: "-5px",
          width: "100%",
          overflow: "hidden",
          resize: "none",
          outline: "none",
          backgroundColor: "white",
          color: "black",
        };
  };

  if (localStorage.getItem("token") == null) {
    navigation("/login");
  }
  return (
    <>
      <HeaderAdmin />
      <div
        className="container p-5 fixed-grid has-auto-count is-three-quarters-mobile
      is-two-thirds-tablet
      is-half-desktop
      is-one-third-widescreen
      is-one-quarter-fullhd"
      >
        <div className="columns">
          <div className="column is-12">
            <div className="columns is-three-quarters-mobile">
              {/* cột ảnh cá nhân */}
              <div
                className="column 
                col-sm-12
                col-lg-3
                col-md-12
                "
              >
                <div
                  className="box is-three-quarters-mobile
                  is-two-thirds-tablet
                  is-half-desktop
                  is-one-third-widescreen
                  is-one-quarter-fullhd"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
                    height: "437px",
                    position: "relative",
                    bottom: "-13px",
                  }}
                >
                  <p
                    className="is-5 is-three-quarters-mobile
                                is-two-thirds-tablet
                                is-half-desktop
                                is-one-third-widescreen
                                is-one-quarter-fullhd"
                  >
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img
                            style={{ width: "100%" }}
                            src={renderImage()}
                            alt="Ảnh đại diện"
                          />
                        </div>
                      </div>
                    </div>
                  </p>
                  <p
                    className="subtitle is-three-quarters-mobile
                                is-two-thirds-tablet
                                is-half-desktop
                                is-one-third-widescreen
                                is-one-quarter-fullhd"
                  >
                    <div className="about" style={{ textAlign: "center" }}>
                      <UploadImage
                        user={user.employee}
                        setImage={setImage}
                        setPreview={setPreview}
                      />
                    </div>
                  </p>
                </div>
              </div>

              <div className="column ">
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
                      .required("Họ và tên không được để trống")
                      // .matches("/^[a-zA-Z\u00C0-\u1EF9\s]*$/", "Vui lòng nhập Họ và tên hợp lệ")
                      .min(1, "Họ và tên phải trên 1 kí tự")
                      .max(50, "Họ và tên phải dưới 50 kí tự"),
                    email: Yup.string()
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
                    <div className="column col-sm-12">
                      <div
                        className="box col-lg-12 col-md-12"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
                        }}
                      >
                        <p className="is-5" style={{ color: "#ddb673" }}>
                          <h4>Thông tin cá nhân</h4>
                        </p>
                        <p className="subtitle" style={{height: "351px"}}>
                          <div
                            className="columns is-three-quarters-mobile
                                    is-two-thirds-tablet
                                    is-half-desktop
                                    is-one-third-widescreen
                                    is-one-quarter-fullhd"
                          >
                            <div className="column is-7">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <td>Họ và tên: </td>
                                    <td>
                                      <>
                                        <Field
                                          type="text"
                                          name="name"
                                          style={renderInputCSS(isEditing)}
                                          disabled={!isEditing}
                                        ></Field>
                                        <ErrorMessage
                                          name="name"
                                          style={{ color: "red", with: "100%" }}
                                          component={"span"}
                                        />
                                      </>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Email:</td>
                                    <td>
                                      <>
                                        <Field
                                          type="text"
                                          name="email"
                                          style={renderInputCSS(isEditing)}
                                          disabled={!isEditing}
                                        ></Field>
                                        <ErrorMessage
                                          name="email"
                                          style={{ color: "red" }}
                                          component={"span"}
                                        />
                                      </>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Địa chỉ:</td>
                                    <td>
                                      <>
                                        <Field
                                          as="textarea"
                                          name="address"
                                          style={renderInputAddress(isEditing)}
                                          disabled={!isEditing}
                                        ></Field>
                                        <ErrorMessage
                                          name="address"
                                          style={{ color: "red" }}
                                          component={"span"}
                                        />
                                      </>
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>

                            <div className="column is-5 w-vi">
                              <table
                                className="table"
                                style={{ borderBottom: "none" }}
                              >
                                <thead>
                                  <tr>
                                    <td>Tài khoản:</td>
                                    <td>{user.username}</td>
                                  </tr>
                                  <tr>
                                    <td>Ngày sinh:</td>
                                    <td>
                                      <>
                                        <Field
                                          type="date"
                                          name="date"
                                          style={renderInputCSS(isEditing)}
                                          disabled={!isEditing}
                                        ></Field>
                                        <ErrorMessage
                                          name="date"
                                          style={{ color: "red" }}
                                          component={"span"}
                                        />
                                      </>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Giới tính:</td>
                                    <td>
                                      {isEditing ? (
                                        <div
                                          className="columns is-three-quarters-mobile
                                  is-two-thirds-tablet
                                  is-half-desktop
                                  is-one-third-widescreen
                                  is-one-quarter-fullhd"
                                        >
                                          <div className="column is-6">
                                            <div className="columns">
                                              <div className="column is-6">
                                                <Field
                                                  type="radio"
                                                  id="male"
                                                  name="gender"
                                                  value="1"
                                                  style={{
                                                    position: "relative",
                                                    top: "7px",
                                                  }}
                                                ></Field>
                                              </div>
                                              <div className="column is-6">
                                                <label
                                                  htmlFor="male"
                                                  style={{
                                                    display: "flex",
                                                    position: "relative",
                                                    right: "-105px",
                                                    top: "-1px",
                                                  }}
                                                >
                                                  Nam
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="column is-6">
                                            <div className="columns">
                                              <div className="column is-6">
                                                {" "}
                                                <Field
                                                  type="radio"
                                                  id="female"
                                                  name="gender"
                                                  value="0"
                                                  style={{
                                                    position: "relative",
                                                    top: "7px",
                                                  }}
                                                ></Field>
                                              </div>
                                              <div className="column is-6">
                                                <label
                                                  htmlFor="female"
                                                  style={{
                                                    display: "flex",
                                                    position: "relative",
                                                    right: "-105px",
                                                    top: "-1px",
                                                  }}
                                                >
                                                  Nữ
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : user.employee.gender ? (
                                        "Nam"
                                      ) : (
                                        "Nữ"
                                      )}
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                          </div>
                          <div className="buttons">
                            {isEditing ? (
                              <button
                                className="button button-cancel"
                                type="button"
                                onClick={handleEdit}
                                style={{ color: "white" }}
                              >
                                Hủy
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="button button-update-info"
                                onClick={() => setIsEditing(true)}
                              >
                                Cập nhật thông tin
                              </button>
                            )}
                            <Button
                              className="button button-change-password"
                              onClick={() => showModal()}
                              style={{ display: isEditing ? "none" : "block" }}
                            >
                              Đổi mật khẩu
                            </Button>
                            <Button
                              className="button button-viiii"
                              type="submit"
                              style={{
                                display: isEditing ? "block" : "none",
                                background: " rgb(255, 237, 194)",
                                border: "none",
                                color: "black",
                              }}
                            >
                              Đồng ý
                            </Button>
                          </div>
                        </p>
                        <ChangePasswordModal show={show} setShow={setShow} />
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default ShowInfoUser;
