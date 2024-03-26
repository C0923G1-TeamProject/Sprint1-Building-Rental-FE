import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";

function ShowInfoUser() {
  return (
    <>
      <HeaderAdmin />
      <div className="container p-5">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                  </div>
                  <div className="about">
                    <button className="button-upload-photo">
                      Thay đổi ảnh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 class="mb-4" style={{ color: "#ddb673" }}>
                      Thông tin cá nhân
                    </h4>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group row">
                      <div className="col-3">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Họ và tên{" "}
                        </label>
                      </div>
                      <div className="col-9">
                        <input
                          type="text"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            top: "-1px",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          className="form-control input-readonly input-te"
                          value="Nguyễn Văn A"
                          placeHolder="Nhập họ và tên"
                          readOnly
                        />
                      </div>

                      {/* <div style={{color: "red",position: "relative", top: "-10px"}}>
                        Vui lòng nhập Họ tên hợp lệ
                      </div> */}
                    </div>
                  </div>

                  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12">
                    <div className="form-group row">
                      <div className="col-5">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Tên tài khoản:{" "}
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            top: "-1px",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          className="form-control input-readonly"
                          value="NguyenvanA1223"
                          placeHolder="Nhập tên tài khoản"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* 1 hafng */}

                  <div
                    className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="form-group row">
                      <div className="col-3">
                        <label></label>
                        {/* <label style={{ fontWeight: "bold" }}>Email</label> */}
                      </div>
                      <div className="col-9">
                        <input
                          type="text"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            top: "-1px",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          className="form-control input-readonly input-te"
                          placeHolder="Nhập email"
                          value="nva@gmail.com"
                          readOnly
                        />
                      </div>

                      <div
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-10px",
                        }}
                      >
                        Vui lòng nhập Email hợp lệ
                      </div>
                    </div>
                  </div>

                  {/* <div
                    className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12"
                    style={{marginTop: "5px"}}
                  >
                    <div className="form-group row">
                      <div className="col-5">
                        <label style={{fontWeight: "bold"}}>Ngày sinh</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="url"
                          style={{border: "none",
                                           width: "100%",
                                                padding: "0",
                                                top: "-1px",
                                                borderRadius: "0px",
                                                outline: "none"}}
                          className="form-control input-readonly input-te"
                          placeHolder="Nhập ngày sinh"
                          value="01/02/1992"
                          readOnly
                        />
                      </div>

                      <div style={{color: "red",position: "relative", top: "-10px"}}>
                        Vui lòng nhập Ngày sinh hợp lệ
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div
                    className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12"
                    style={{ marginTop: "5px" }}
                  >
                    <div class="form-group row" style={{ flexWrap: "wrap" }}>
                      <div className="col-3">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Địa chỉ
                        </label>
                      </div>
                      <div className="col-9">
                        <textarea
                          type="text"
                          // style= "position: relative,
                          //    "top": "-1px",
                          //    width:" 100%",
                          //   word-wrap:" break-word",
                          //   overflow: "hidden",
                          //   resize: "none",
                          //   right: "8px"
                          className="form-control input-readonly input-te"
                          placeHolder="Nhập địa chỉ...."
                          readOnly
                        >
                          295 Nguyễn Tất Thành, Quận Thanh Khê, Thành phố Đà Năg
                        </textarea>
                      </div>

                      <div
                        style={{
                          color: " red",
                          position: "relative",
                          top: "-1px",
                        }}
                      >
                        Vui lòng nhập Địa chỉ hợp lệ
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12"
                    style={{ marginTop: "5px" }}
                  >
                    <div className="form-group row">
                      <div className="col-4">
                        <label style={{ fontWeight: "bold" }}>Giới tính</label>
                      </div>
                      <div className="col-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleRadio"
                            value="Nam"
                            checked
                          />
                          <label className="htmlForm-check-label" htmlFor="maleRadio">
                            Nam
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="femaleRadio"
                            value="Nữ"
                          />
                          <label className="htmlForm-check-label" htmlFor="femaleRadio">
                            Nữ
                          </label>
                        </div>
                        <div
                          style={{ color: "red", display: "none" }}
                          id="genderError"
                        >
                          Vui lòng Chọn giới tính hợp lệ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row gutters">
                  <div
                    className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                    style={{ float: "right", position: "relative", top: "20%" }}
                  >
                    <div
                      className="text-right"
                      style={{
                        display: "flex",
                        position: "relative",
                        top: "20%",
                      }}
                    >
                      <div className="col-md-5"></div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          id="edit-button"
                          name="submit"
                          style={{
                            background: "#ddb6739c",
                            color: "black",
                            border: "none",
                          }}
                          className="btn btn-secondary"
                        >
                          Cập nhật
                        </button>
                        <button
                          type="button"
                          id="changed-password-button"
                          className="btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Đổi mật khẩu
                        </button>

                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* modal */}
          {/* <div
          className="modal"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="staticBackdropLabel"
                  style={{ color: "#ddb673" }}
                >
                  Thông báo đổi mật khẩu
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table>
                  <tr>
                    <td>
                      <label>
                        Nhập mật khẩu hiện tại:{" "}
                        <span className="material-symbols-outlined lock-vi">
                          lock
                        </span>{" "}
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="input-pass input-password-eyes"
                        id="pass"
                      />
                    </td>
                    <td>
                      <img src="./icon-eye/hide.png" class="vi-eye" id="img" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Nhập mật khẩu mới:{" "}
                        <span className="material-symbols-outlined lock-a-vi">
                          lock
                        </span>{" "}
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="input-pass input-password-eyes"
                        id="pass2"
                      />
                    </td>
                    <td>
                      <img
                        src="./icon-eye/hide.png"
                        className="vi-eye-2"
                        id="img2"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Nhập lại mật khẩu mới:{" "}
                        <span className="material-symbols-outlined lock-b-vi">
                          lock
                        </span>{" "}
                      </label>
                    </td>
                    <td>
                      <input
                        type="password"
                        className="input-pass input-password-eyes"
                        id="pass3"
                      />
                    </td>
                    <td>
                      <img
                        src="./icon-eye/hide.png"
                        className="vi-eye-3"
                        id="img3"
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button type="button" className="btn-done">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div> */}
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ShowInfoUser;
