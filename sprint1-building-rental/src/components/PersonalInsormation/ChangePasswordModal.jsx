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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (value) => {
    console.log(value);
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
                  <span className="material-symbols-outlined lock-b-vi">
                    lock
                  </span>
                </td>
                <td>
                  <input type={showPassword ? "text" : "password"} />
                </td>
                <td>
                  <img
                    src={showPassword ? view : hide}
                    alt={showPassword ? "show" : "hide"}
                    onClick={togglePasswordVisibility}
                    width="30px"
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
                  <input type={showPassword ? "text" : "password"} />
                </td>
                <td>
                  <img
                    src={showPassword ? view : hide}
                    alt={showPassword ? "show" : "hide"}
                    onClick={togglePasswordVisibility}
                    width="30px"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Nhập lại mật khẩu mới:{" "}
                  <span className="material-symbols-outlined lock-b-vi">
                    lock
                  </span>{" "}
                </td>
                <td>
                  <input type={showPassword ? "text" : "password"} />
                </td>
                <td>
                  <img
                    src={showPassword ? view : hide}
                    alt={showPassword ? "show" : "hide"}
                    onClick={togglePasswordVisibility}
                    width="30px"
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
