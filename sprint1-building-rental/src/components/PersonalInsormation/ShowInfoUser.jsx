import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";
import UploadImage from "./firebase/UploadImage";

import moment from "moment";
import { Field, Form, Formik } from "formik";
import {
  getInfoUser,
  updateInfoUser,
} from "../../service/PersonalInformationService/information-service";

function ShowInfoUser() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState();

  const formatDate = (date) => {
    const newDate = moment(date).format("DD/MM/YYYY");
    return newDate;
  };
  const showModal = () => {
    setShow(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });

  const getInfo = async () => {
    try {
      const result = await getInfoUser();
      setUser(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfo();
  });

  if (!user) return <div>loadingg...</div>;
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
        <div className="columns ">
          <div className="column is-12">
            <div
              className="columns is-three-quarters-mobile
      is-two-thirds-tablet
      is-half-desktop
      is-one-third-widescreen
      is-one-quarter-fullhd"
            >
              {/* cột ảnh cá nhân */}
              <div
                className="column is-narrow is-narrow-mobile is-narrow-tablet is-narrow-touch is-narrow-desktop is-narrow-widescreen is-narrow-fullhd"
                style={{ width: "27%" }}
              >
                <div
                  className="box"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
                    height: "100%",
                    width: "100%",
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
                            src={
                              user.employee.profilePicture
                                ? image
                                : // user.employee.profilePicture
                                  "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                            }
                            alt="Maxwell Admin"
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
                      {/* <button className="button is-light">Thay đổi ảnh</button> */}
                      <UploadImage setImage={setImage} />
                    </div>
                  </p>
                </div>
              </div>

              <Formik
                initialValues={{
                  id: user.employee.id,
                  name: user.employee.name,
                  email: user.employee.email,
                  address: user.employee.address,
                  username: user.username,
                  date: user.employee.date,
                  gender: user.employee.gender ? 1 : 0,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  updateInfoUser(values).then(() => {
                    console.log(values);
                    setSubmitting(false);
                    setIsEditing(true);
                  });
                }}
              >
                <Form>
                  <Field type="hidden" name="id"></Field>
                  <div className="column ">
                    <div
                      className="box"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 0em 0.5em 0em, rgba(1, 10, 10, 0.02) 0px 0px 0px 1px",
                      }}
                    >
                      <p className="is-5" style={{ color: "#ddb673" }}>
                        <h4>Thông tin cá nhân</h4>
                      </p>
                      <p className="subtitle">
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
                                  <td style={{ width: "120px" }}>
                                    Họ và tên:{" "}
                                  </td>
                                  <td>
                                    {isEditing ? (
                                      <Field
                                        type="text"
                                        name="name"
                                        style={{
                                          position: "relative",
                                          top: "-5px",
                                        }}
                                      ></Field>
                                    ) : (
                                      user.employee.name
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Email:</td>
                                  <td>
                                    {isEditing ? (
                                      <Field
                                        type="text"
                                        name="email"
                                        style={{
                                          position: "relative",
                                          top: "-5px",
                                          width: "100%",
                                        }}
                                      ></Field>
                                    ) : (
                                      user.employee.email
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Địa chỉ:</td>
                                  <td>
                                    {isEditing ? (
                                      <Field
                                        as="textarea"
                                        name="address"
                                        style={{
                                          position: "relative",
                                          top: "-5px",
                                          width: "100%",
                                          overflow: "hidden",
                                          resize: "none",
                                          outline: "none",
                                          borderBottom: "solid 2px #ddc383",
                                        }}
                                      ></Field>
                                    ) : (
                                      user.employee.address
                                    )}
                                  </td>
                                </tr>
                              </thead>
                            </table>
                          </div>

                          <div className="column is-5">
                            <table
                              className="table"
                              style={{ borderBottom: "none" }}
                            >
                              <thead>
                                <tr>
                                  <td width={"120px"}>Tài khoản:</td>
                                  <td>
                                    {isEditing ? (
                                      <Field
                                        type="text"
                                        name="username"
                                        style={{
                                          position: "relative",
                                          top: "-5px",
                                        }}
                                      ></Field>
                                    ) : (
                                      user.username
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ngày sinh:</td>
                                  <td>
                                    {isEditing ? (
                                      <Field
                                        type="date"
                                        name="date"
                                        style={{
                                          position: "relative",
                                          top: "-5px",
                                        }}
                                      ></Field>
                                    ) : (
                                      formatDate(user.employee.date)
                                      // "2004-09-20"
                                    )}
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
                              onClick={() => setIsEditing(false)}
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
      <Footer />
    </>
  );
}
export default ShowInfoUser;
