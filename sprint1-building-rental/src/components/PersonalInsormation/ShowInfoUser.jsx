import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";

function ShowInfoUser() {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });
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
                className="column is-narrow is-three-quarters-mobile
                is-two-thirds-tablet
                is-half-desktop
                is-one-third-widescreen
                is-one-quarter-fullhd"
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
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                      <button className="button is-light">Thay đổi ảnh</button>
                    </div>
                  </p>
                </div>
              </div>

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
                    <div className="columns">
                      <div className="column is-7">
                        <table className="table">
                          <thead>
                            <tr>
                              <td style={{ width: "120px" }}>Họ và tên</td>
                              <td>Trần Kim Tiểu Vi</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>tieuvi200904@gmail.com</td>
                            </tr>
                            <tr>
                              <td>Địa chỉ</td>
                              <td>
                                295 Nguyễn Tất Thành,Quận Thanh Khê,Thành phố Đà
                                Nẵng
                              </td>
                            </tr>
                          </thead>
                        </table>
                        {/* <div className="columns">
                          <div className="column is-3">
                            <div className="mt-3">Ho ten</div>
                            <div className="mt-3">Email</div>
                            <div className="mt-3">Dia chi</div>
                          </div>
                          <div className="column is-9">
                            <div className="mt-3">Nguyen Van A</div>
                            <div className="mt-3">ngvana@gmail.com</div>
                            <div className="mt-3">
                              295 Nguyễn Tất Thành,Quận Thanh Khê, thành phố Đà
                              Nẵng
                            </div>
                          </div>
                        </div> */}
                      </div>

                      <div className="column is-5">
                        <table
                          className="table"
                          style={{ borderBottom: "none" }}
                        >
                          <thead>
                            <tr>
                              <td>Tài khoản</td>
                              <td>vitkt</td>
                            </tr>
                            <tr>
                              <td>Ngày sinh</td>
                              <td>09/09/2009</td>
                            </tr>
                            <tr>
                              <td>Giới tính</td>
                              <td>Nguyen van a</td>
                            </tr>
                          </thead>
                        </table>
                        {/* <div className="columns">
                          <div className="column is-4">
                            <div className="mt-3">Tai khoan</div>
                            <div className="mt-3">Ngay sinh</div>
                            <div className="mt-3">Gioi tinh</div>
                          </div>
                          <div className="column is-8">
                            <div className="mt-3">annv</div>
                            <div className="mt-3">20/09/2009</div>
                            <div className="mt-3">Nam</div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="buttons">
                      <button className="button button-update-info">
                        Cập nhật thông tin
                      </button>
                      <Button
                        className="button button-change-password"
                        onClick={() => showModal()}
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </p>
                  <ChangePasswordModal show={show} setShow={setShow} />
                </div>
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
