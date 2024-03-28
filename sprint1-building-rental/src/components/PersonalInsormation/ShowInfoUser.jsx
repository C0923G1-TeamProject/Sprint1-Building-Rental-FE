import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ChangePasswordModal from "./ChangePasswordModal";
import UploadImage from "./firebase/UploadImage";
import { getInfoUser } from "./../Services/PersonalInformationService/information-service";

function ShowInfoUser() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const showModal = () => {
    setShow(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  });

  const getInfo = async () => {
    try {
      const result = await getInfoUser();
      setUser(result.data);
      console.log(result);
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
                              image
                                ? image
                                : "https://bootdey.com/img/Content/avatar/avatar7.png"
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
                      <button className="button is-light">Thay đổi ảnh</button>
                      <UploadImage setImage={setImage} />
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
                    <div
                      className="columns is-three-quarters-mobile
                                    is-two-thirds-tablet
                                    is-half-desktop
                                    is-one-third-widescreen
                                    is-one-quarter-fullhd"
                    >
                      <div className="column is-6">
                        <table className="table">
                          <thead>
                            <tr>
                              <td style={{ width: "120px" }}>Họ và tên</td>
                              <td>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                ) : (
                                  "Trần Kim Tiểu Vi"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    defaultValue={"tieuvi200904@gmail.com"}
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                ) : (
                                  "tieuvi200904@gmail.com"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Địa chỉ</td>
                              <td>
                                {isEditing ? (
                                  <textarea
                                    as="textarea"
                                    defaultValue={
                                      " 295 Nguyễn Tất Thành,Quận Thanh Khê,Thành phố Đà Nẵng"
                                    }
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                      width: "100%",
                                      overflow: "hidden",
                                      resize: "none",
                                      outline: "none",
                                      borderBottom: "solid 1px",
                                    }}
                                  />
                                ) : (
                                  " 295 Nguyễn Tất Thành,Quận Thanh Khê,Thành phố Đà Nẵng"
                                )}
                              </td>
                            </tr>
                          </thead>
                        </table>
                      </div>

                      <div className="column is-6">
                        <table
                          className="table"
                          style={{ borderBottom: "none" }}
                        >
                          <thead>
                            <tr>
                              <td>Tài khoản</td>
                              <td>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    defaultValue={"tieuvi200904@gmail.com"}
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                ) : (
                                  "vitkt"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Ngày sinh</td>
                              <td>
                                {isEditing ? (
                                  <input
                                    type="date"
                                    value={"2024-03-24"}
                                    style={{
                                      position: "relative",
                                      top: "-5px",
                                    }}
                                  />
                                ) : (
                                  "24/03/2024"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Giới tính</td>
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
                                          <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            defaultChecked
                                            style={{
                                              position: "relative",
                                              top: "7px",
                                            }}
                                          />
                                        </div>
                                        <div className="column is-6">
                                          <label
                                            htmlFor="male"
                                            style={{
                                              display: "flex",
                                              position: "relative",
                                              right: "-87px",
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
                                          <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            style={{
                                              position: "relative",
                                              top: "7px",
                                            }}
                                          />
                                        </div>
                                        <div className="column is-6">
                                          <label
                                            htmlFor="female"
                                            style={{
                                              display: "flex",
                                              position: "relative",
                                              right: "-87px",
                                              top: "-1px",
                                            }}
                                          >
                                            Nữ
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  "nam"
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
                          onClick={handleBack}
                          style={{ color: "white" }}
                        >
                          Huy
                        </button>
                      ) : (
                        <button
                          className="button button-update-info"
                          onClick={handleEdit}
                        >
                          Cập nhật thông tin
                        </button>
                      )}
                      <Button
                        className="button button-change-password"
                        onClick={() => showModal()}
                        style={{ display: isEditing ? "none" : "block" }} // Hide in edit mode
                      >
                        Đổi mật khẩu
                      </Button>
                      <Button
                        className="button button-viiii"
                        style={{
                          display: isEditing ? "block" : "none",
                          background: " rgb(255, 237, 194)",
                          border: "none",
                          color: "black",
                        }} // Show in edit mode
                      >
                        Đồng ý
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
