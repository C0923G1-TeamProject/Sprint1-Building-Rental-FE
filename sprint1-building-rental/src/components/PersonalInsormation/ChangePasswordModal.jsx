import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import view from "./Icon/view.png";
import hide from "./Icon/hide.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changePassword } from "../../service/PersonalInformationService/information-service";
import * as Yup from "yup";
import "../Css/InfoCss/Info.css";
import Swal from "sweetalert2";
function Example(props) {
  const { show, setShow } = props;
  const [showPassword, setShowPassword] = useState({
    mat1: false,
    mat2: false,
    mat3: false,
  });

  const togglePasswordVisibility = (input) => {
    setShowPassword({
      ...showPassword,
      [input]: !showPassword[input],
    });
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="background-modal"
      >
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            changePassword(values).then((req) => {
              setSubmitting(false);
              if (req.status === 200) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Đổi mật khẩu thành công!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                handleClose();
              } else if (req.data == "Mật khẩu không chính xác!" || req.status === 400) {
                console.log("sai nk");
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Mật khẩu không chính xác!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }  else if (
                req.data ==
                "Mật khẩu mới không trùng khớp với xác nhận mật khẩu!"
              ) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Mật khẩu mới không trùng khớp với xác nhận mật khẩu!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          }}
          validationSchema={Yup.object({
            currentPassword: Yup.string().required(
              "Mật khẩu không được bỏ trống"
            ),
            newPassword: Yup.string()
              .min(6, "Mật khẩu phải ít nhất chứa hơn 6 kí tự")
              .max(24, "Mật khẩu không chứa quá 24 kí tự!")
              // .matches(
              //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]$",
              //   "Mật khẩu ít nhất chứa 1 chữ cái thường, 1 chữ cái hoa, 1 số 0-9 và 1 kí tự đặc biệt như(@$!%*?&)"
              // )
              .required("Mật khẩu không được bỏ trống"),
            confirmNewPassword: Yup.string().required(
              "Mật khẩu không được bỏ trống"
            ),
          })}
        >
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-vvi">
                <thead>
                  <tr>
                    <td>
                      Nhập mật khẩu hiện tại
                      {
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      }
                      <span className="material-symbols-outlined lock-b-vi lock-lock">
                        lock
                      </span>
                    </td>
                    <td>
                      <Field
                        type={showPassword.mat1 ? "text" : "password"}
                        name="currentPassword"
                        style={{
                          position: "relative",
                          paddingLeft: "10px",
                          marginLeft:
                            "15px" /* Adjusted marginLeft instead of left */,
                          borderBottom: "solid 1px black",
                          outline: "none" /* Removed important */,
                          width: "calc(100% - 25px)" /* Adjusted width */,
                          height: "30px",
                        }}
                      />
                      <ErrorMessage
                        name="currentPassword"
                        className="error-message"
                        component="span"
                      />
                    </td>
                    <td>
                      <img
                        src={showPassword.mat1 ? view : hide}
                        alt={showPassword.mat1 ? "show" : "hide"}
                        onClick={() => togglePasswordVisibility("mat1")}
                        width="30px"
                        className="eye-vi-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Nhập mật khẩu mới
                      {
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      }
                      <span className="material-symbols-outlined lock-b-vi lock-lock">
                        lock
                      </span>{" "}
                    </td>
                    <td>
                      <Field
                        name="newPassword"
                        type={showPassword.mat2 ? "text" : "password"}
                        style={{
                          position: "relative",
                          paddingLeft: "10px",
                          marginLeft:
                            "15px" /* Adjusted marginLeft instead of left */,
                          borderBottom: "solid 1px black",
                          outline: "none" /* Removed important */,
                          width: "calc(100% - 25px)" /* Adjusted width */,
                          height: "30px",
                        }}
                      />{" "}
                      <ErrorMessage
                        name="newPassword"
                        className="error-message"
                        component="span"
                      />
                    </td>
                    <td>
                      <img
                        src={showPassword.mat2 ? view : hide}
                        alt={showPassword.mat2 ? "show" : "hide"}
                        onClick={() => togglePasswordVisibility("mat2")}
                        width="30px"
                        height="30px"
                        className="eye-vi-2"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Nhập lại mật khẩu mới
                      {
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      }
                      <span className="material-symbols-outlined lock-b-vi lock-lock">
                        lock
                      </span>{" "}
                    </td>
                    <td>
                      <Field
                        name="confirmNewPassword"
                        type={showPassword.mat3 ? "text" : "password"}
                        style={{
                          position: "relative",
                          paddingLeft: "10px",
                          marginLeft:
                            "15px" /* Adjusted marginLeft instead of left */,
                          borderBottom: "solid 1px black",
                          outline: "none" /* Removed important */,
                          width: "calc(100% - 25px)",
                          /* Adjusted width */ height: "30px",
                        }}
                      />{" "}
                      <ErrorMessage
                        name="confirmNewPassword"
                        className="error-message"
                        component="span"
                      />
                    </td>
                    <td>
                      <img
                        src={showPassword.mat3 ? view : hide}
                        alt={showPassword.mat3 ? "show" : "hide"}
                        onClick={() => togglePasswordVisibility("mat3")}
                        width="30px"
                        className="eye-vi-3"
                      />
                    </td>
                  </tr>
                </thead>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="button-cancel"
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button type="submit" className="button-accept">
                Đồng ý
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default Example;
