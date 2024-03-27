import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import view from "./Icon/view.png";
import hide from "./Icon/hide.png";
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
        <Modal.Header closeButton>
          <Modal.Title>Thông báo Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <td>
                  Nhập mật khẩu hiện tại:
                  <span className="material-symbols-outlined lock-b-vi lock-lock">
                    lock
                  </span>
                </td>
                <td>
                  <input
                    type={showPassword.mat1 ? "text" : "password"}
                    style={{
                      position: "relative",
                      paddingLeft: "10px",
                      marginLeft: "15px", /* Adjusted marginLeft instead of left */
                      borderBottom: "solid 1px black",
                      outline: "none", /* Removed important */
                      width: "calc(100% - 25px)" /* Adjusted width */
                    }}
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
                  Nhập lại mật khẩu mới:{" "}
                  <span className="material-symbols-outlined lock-b-vi lock-lock">
                    lock
                  </span>{" "}
                </td>
                <td>
                  <input
                    type={showPassword.mat2 ? "text" : "password"}
                    style={{
                      position: "relative",
                      paddingLeft: "10px",
                      marginLeft: "15px", /* Adjusted marginLeft instead of left */
                      borderBottom: "solid 1px black",
                      outline: "none", /* Removed important */
                      width: "calc(100% - 25px)" /* Adjusted width */
                    }}
                  />
                </td>
                <td>
                  <img
                    src={showPassword.mat2 ? view : hide}
                    alt={showPassword.mat2 ? "show" : "hide"}
                    onClick={() => togglePasswordVisibility("mat2")}
                    width="30px"
                    className="eye-vi-2"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Nhập lại mật khẩu mới:{" "}
                  <span className="material-symbols-outlined lock-b-vi lock-lock">
                    lock
                  </span>{" "}
                </td>
                <td>
                  <input
                    type={showPassword.mat3 ? "text" : "password"}
                    style={{
                      position: "relative",
                      paddingLeft: "10px",
                      marginLeft: "15px", /* Adjusted marginLeft instead of left */
                      borderBottom: "solid 1px black",
                      outline: "none", /* Removed important */
                      width: "calc(100% - 25px)" /* Adjusted width */
                    }}
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
          <Button type="button" className="button-cancel" onClick={handleClose}>
            Hủy
          </Button>
          <Button type="button" className="button-accept">
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
