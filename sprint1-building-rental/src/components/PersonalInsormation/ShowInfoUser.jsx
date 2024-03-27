import Footer from "../Footer/Footer";
import HeaderAdmin from "../Header/HeaderAdmin";
import "../Css/InfoCss/Info.css";

function ShowInfoUser() {
  return (
    <>
      <HeaderAdmin />
      <div class="container p-5">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                  </div>
                  <div class="about">
                    <button class="button-upload-photo">Thay đổi ảnh</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 class="mb-4" style={{ color: "#ddb673" }}>
                      Thông tin cá nhân
                    </h4>
                  </div>

                  <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12"
                    style={{ marginTop: "5px" }}
                  >
                    <div class="form-group row">
                      <div class="col-3">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Họ và tên{" "}
                        </label>
                      </div>
                      <div class="col-9">
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
                          class="form-control input-readonly input-te"
                          value="Nguyễn Văn A"
                          placeholder="Nhập họ và tên"
                          readonly
                        />
                      </div>

                      {/* <div
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-1px",
                        }}
                      >
                        Vui lòng nhập Họ tên hợp lệ
                      </div> */}
                    </div>
                  </div>

                  <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12">
                    <div class="form-group row">
                      <div class="col-5">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Tên tài khoản:{" "}
                        </label>
                      </div>
                      <div class="col-7">
                        <input
                          type="text"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          class="form-control input-readonly"
                          value="NguyenvanA1223"
                          placeholder="Nhập tên tài khoản"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12"
                    style={{ marginTop: "10px" }}
                  >
                    <div class="form-group row">
                      <div class="col-3">
                        <label
                          className="position-form-infor"
                          style={{
                            fontWeight: "bold",
                            position: "relative",
                            left: "115%",
                          }}
                        >
                          Email
                        </label>
                      </div>
                      <div class="col-9">
                        <input
                          type="text"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            top: "1px",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          class="form-control input-readonly input-te"
                          placeholder="Nhập email"
                          value="nva@gmail.com"
                          readonly
                        />
                      </div>

                      {/* <div
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-10px",
                        }}
                      >
                        Vui lòng nhập Email hợp lệ
                      </div> */}
                    </div>
                  </div>

                  <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12"
                    style={{ marginTop: "5px" }}
                  >
                    <div class="form-group row">
                      <div class="col-5">
                        <label
                          style={{
                            fontWeight: "bold",
                            position: "relative",
                            left: "97%",
                          }}
                        >
                          Ngày sinh
                        </label>
                      </div>
                      <div class="col-7">
                        <input
                          type="url"
                          style={{
                            border: "none",
                            width: "100%",
                            padding: "0",
                            top: "-1px",
                            borderRadius: "0px",
                            outline: "none",
                          }}
                          class="form-control input-readonly input-te"
                          placeholder="Nhập ngày sinh"
                          value="01/02/1992"
                          readonly
                        />
                      </div>

                      {/* <div
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-10px",
                        }}
                      >
                        Vui lòng nhập Ngày sinh hợp lệ
                      </div> */}
                    </div>
                  </div>

                </div>

                <div class="row gutters">
                  <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12"
                    style={{ marginTop: "5px " }}>
                    <div class="form-group row" style={{ flexWrap: "wrap" }}>
                      <div class="col-3">
                        <label style={{ margin: "0", fontWeight: "bold" }}>
                          Địa chỉ
                        </label>
                      </div>
                      <div class="col-9">
                        <textarea
                          type="text"
                          style={{
                            position: "relative",
                            top: "-1px",
                            width: "100%",
                            // word-wrap: break-word;
                            overflow: "hidden",
                            resize: "none",
                            right: "8px",
                          }}
                          class="form-control input-readonly input-te"
                          placeholder="Nhập địa chỉ...."
                          readonly
                        >
                          295 Nguyễn Tất Thành, Quận Thanh Khê, Thành phố Đà Năg
                        </textarea>
                      </div>
                      {/* <div
                        style={{
                          color: "red",
                          position: "relative",
                          top: "-1px",
                        }}
                      >
                        Vui lòng nhập Địa chỉ hợp lệ
                      </div> */}
                    </div>
                  </div>

                  {/* <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12"
                    style={{ marginTop: "5px" }}
                  >
                    <div class="form-group row"> */}
                      {/* <div class="col-4">
                        <label
                          style={{
                            fontWeight: "bold",
                            position: "relative",
                            left: "124%",
                          }}
                        >
                          Giới tính
                        </label>
                      </div> */}
                      {/* <div class="col-8"> */}
                        {/* <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleRadio"
                            value="Nam"
                            checked
                          />

                          <label class="form-check-label" for="maleRadio" style={{ position: "relative", left: "117px" }}>
                            Nam
                          </label>
                        </div> */}
                        {/* <div
                          class="form-check form-check-inline"
                          style={{ position: "relative", left: "117px" }}
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="femaleRadio"
                            value="Nữ"
                          />
                          <label class="form-check-label" for="femaleRadio">
                            Nữ
                          </label>
                        </div> */}

                        {/* <div
                          style={{ color: "red", display: "none" }}
                          id="genderError"
                        >
                          Vui lòng Chọn giới tính hợp lệ
                        </div> */}
                      {/* </div> */}
                    {/* </div>
                  </div> */}

                </div>

                {/* <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                    style={{ float: "right", position: "relative", top: "20%" }}
                  >
                    <div
                      class="text-right"
                      style={{
                        display: "flex",
                        position: "relative",
                        top: "20%",
                      }}
                    >
                      <div class="col-md-5"></div>
                      <div class="col-md-4">
                        <button
                          type="button"
                          id="edit-button"
                          name="submit"
                          style={{
                            background: "#ddb6739c",
                            color: "black",
                            border: "none",
                          }}
                          class="btn btn-secondary"
                        >
                          Cập nhật
                        </button>
                        <button
                          type="button"
                          id="changed-password-button"
                          class="btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Đổi mật khẩu
                        </button>
                      </div>
                      <div class="col-md-3"></div>
                    </div>
                  </div>
                </div> */}

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
