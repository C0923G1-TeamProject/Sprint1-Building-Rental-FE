import CarouselBody from "../Carousel/Carousel";
import HeaderUser from "../Header/HeaderUser";
import "../Css/HomePage/Body.css";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Footer from "../Footer/Footer";
import Helmet from "react-helmet";
import "../Css/HomePage/Messgae.css";
function HomePage() {
  const myBtn2 = document.getElementById("myBtn2");
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div>
        <HeaderUser />
        <CarouselBody />
        <a
          id="myBtn2"
          className="zom"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <img src="/img/HomePage/message.png" width="40px" />
        </a>

        <div>
          {/* <!--Div Card Start--> */}
          <div className="container">
            {/* <!-- Service Start --> */}
            <div className="container">
              <div className="container-xxl py-5">
                <div className="container">
                  <div
                    className="text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ "max-width": "600px" }}
                  >
                    <h1 className="display-5 mb-4">
                      Một số mặt bằng tại MediaMond
                    </h1>
                  </div>
                  <div className="flex">
                    <input style={{ margin: "5px" }} />
                    <button
                      style={{
                        background: "#E9D8AE",
                        "border-radius": "2px",
                        "border-color": "#E9D8AE",
                      }}
                    >
                      Tìm kiếm
                    </button>
                  </div>

                  <div className="row g-4">
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-1.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Indo Riverside</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            290 Trần Hưng Đạo, Sơn Trà, Đà Nẵng
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 10.000.000 vnđ/tháng
                          </p>
                          <a className="btn" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-1.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Indo Riverside</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            290 Trần Hưng Đạo, Sơn Trà, Đà Nẵng
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 10.000.000 vnđ/tháng
                          </p>
                          <a className="btn" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-1.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Interior Design</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            02 Ngô Đức Kế, Quận 1, Hồ Chí Minh
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 19.500.000 vnđ/tháng
                          </p>
                          <a className="btn" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-5.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Belvedere Building</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            76 Võ Thị Sáu, Quận Hoàn Kiếm, Hà Nội
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 25.500.000 vnđ/tháng
                          </p>
                          <a className="btn" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-6.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Hoàng Đông Tower</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            76 Mẹ Nhu, Quận Hoàn Kiếm, Hà Nội
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 29.500.000 vnđ/tháng
                          </p>
                          <Link className="btn w-10" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <div className="service-item d-flex position-relative text-center h-100">
                        <img
                          className="bg-img"
                          src="/img/HomePage/card-6.jpg"
                          alt=""
                        />
                        <div className="service-text p-5">
                          <img
                            className="mb-4"
                            src="/img/HomePage/icon-1.png"
                            alt="Icon"
                          />
                          <h4 className="mb-3">Hoàng Đông Tower</h4>
                          <strong>Địa chỉ</strong>:
                          <span style={{ display: "inline-block" }}>
                            01 Lê Lợi, Quận Hoàn Kiếm, Hà Nội
                          </span>
                          <p className="mb-4">
                            <strong>Giá</strong>: 22.500.000 vnđ/tháng
                          </p>
                          <a className="btn" href="">
                            <span style={{ marginRight: "5px" }}>
                              <AddIcon />
                            </span>
                            Xem thêm
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- phân trang Start --> */}
                <div>
                  <nav
                    aria-label="Page navigation example"
                    className="float-paging"
                  >
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <!-- phân trang End --> */}
              </div>
            </div>

            {/* <!-- Service End --> */}
          </div>

          {/* <!--Div Card End--> */}
          <br />
          <br />
          <br />
          {/* <!--Div giới thiệu Start--> */}
          <div className="container color-marketing-homepage">
            <div className="display" style={{ " flex-wrap": "wrap" }}>
              <div className="col-md-8">
                <div>
                  <div style={{ width: "80%" }}>
                    <h3
                      style={{
                        "font-family": "Segoe UI",
                        color: "#452D14",
                        margin: "6%",
                      }}
                    >
                      Mang không gian chuyên nghiệp & thoải mái nhất tới khách
                      hàng
                    </h3>
                    <p style={{ margin: "6%" }}>
                      Tại DIAMOND TIME sở hữu khaongr không giếng trời mang lại
                      sự cân bằng, tăng khả năng kết nối giữa thiên nhiên và con
                      người. Mọi góc không gian đều trở nên tươi mát, thoáng
                      đãng nhờ đón nguồn gió và ánh sáng tự nhiên.
                    </p>
                    <p style={{ margin: "6%" }}>
                      Những mảng xanh mát, ngập tràn sức sống như một luồng
                      không khí mói mẻ giúp cuộc sống bận rộn của mỗi người trở
                      nên thư thái hơn
                    </p>
                  </div>
                </div>
              </div>
              <div classNameName="col-md-4">
                <img
                  style={{ width: "100%", height: "450px" }}
                  src="/img/HomePage/marketing_body.png"
                />
              </div>
            </div>
          </div>
          {/* <!--Div giới thiệu End--> */}
          <br />
          <br />
          <br />
          <div class="container color-marketing-homepage">
            {/* <!--Div giới thiệu Start--> */}
            <div class="display" style={{ "flex-wrap": "wrap" }}>
              <div class="col-md-5 col-lg-5">
                <div>
                  <div style={{ width: "80%" }}>
                    <img
                      style={{ width: "100%", height: "450px" }}
                      src="/img/HomePage/marketing-body-homepage.png"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-7 col-lg-7">
                <h3
                  style={{
                    color: "#452D14",
                    "text-align": "center",
                    margin: "6%",
                  }}
                >
                  Vị thế Trung tâm – Nâng tầm thương hiệu
                </h3>
                <p style={{ " margin": "6%" }}>
                  Tòa nhà tại 35 Thái Phiên, quận Hải Châu – trung tâm thành
                  phố, nơi có sự phát triển sầm uất bậc nhất Đà Nẵng, DIAMOND
                  TIME sở hữu vị trí “vàng” với hai mặt tiền, thuận tiện cho
                  việc giao thương và di chuyển.
                </p>
                <div>
                  <img
                    style={{ width: "100%" }}
                    src="/img/HomePage/marketing-body-homepage-2.png"
                  />
                </div>
                <p style={{ " margin": "6%" }}>
                  Chỉ 5 phút đi bộ, khách hàng dễ dàng tiếp cận trung tâm hành
                  chính quan trọng, công trình tiện ích và điểm tham quan du
                  lịch cùng các dịch vụ tiện ích, giải trí…
                </p>
                <button class="btn-next-body-homepage">
                  Xem chi tiết{" "}
                  <i
                    class="fa fa-angle-right"
                    style={{ "font-size": "20px", color: "white" }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
          {/* <!--Div giới thiệu End--> */}

          {/* <!-- Team C0923G1 Start--> */}
          <div class="container-xxl py-5">
            <div class="container">
              <div
                class="text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ "max-width": "600px" }}
              >
                <h1 class="display-5 mb-4">Đóng góp</h1>
              </div>
              <div class="row g-0 team-items">
                <div
                  class="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div class="team-item position-relative">
                    <div class="position-relative">
                      <img
                        class="img-fluid"
                        src="/img/HomePage/team-1.jpg"
                        alt=""
                      />
                      <div class="team-social text-center">
                        <a class="btn btn-square" href="">
                          <FacebookIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <InstagramIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <TwitterIcon />
                        </a>
                      </div>
                    </div>
                    <div class="bg-light text-center p-4">
                      <h3 class="mt-2">Maria</h3>
                      <span>Trưởng Phòng</span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div class="team-item position-relative">
                    <div class="position-relative">
                      <img
                        class="img-fluid"
                        src="/img/HomePage/team-2.jpg"
                        alt=""
                      />
                      <div class="team-social text-center">
                        <a class="btn btn-square" href="">
                          <FacebookIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <InstagramIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <TwitterIcon />
                        </a>
                      </div>
                    </div>
                    <div class="bg-light text-center p-4">
                      <h3 class="mt-2">Alex</h3>
                      <span>Giám Đốc</span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div class="team-item position-relative">
                    <div class="position-relative">
                      <img
                        class="img-fluid"
                        src="/img/HomePage/team-3.jpg"
                        alt=""
                      />
                      <div class="team-social text-center">
                        <a class="btn btn-square" href="">
                          <FacebookIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <InstagramIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <TwitterIcon />
                        </a>
                      </div>
                    </div>
                    <div class="bg-light text-center p-4">
                      <h3 class="mt-2">Peter</h3>
                      <span>Khảo Sát Mặt Bằng</span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div class="team-item position-relative">
                    <div class="position-relative">
                      <img
                        class="img-fluid"
                        src="/img/HomePage/team-4.jpg"
                        alt=""
                      />
                      <div class="team-social text-center">
                        <a class="btn btn-square" href="">
                          <FacebookIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <InstagramIcon />
                        </a>
                        <a class="btn btn-square" href="">
                          <TwitterIcon />
                        </a>
                      </div>
                    </div>
                    <div class="bg-light text-center p-4">
                      <h3 class="mt-2">May</h3>
                      <span>Thư Ký</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Team C0923G1 End--> */}

          {/* <!-- Body End --> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default HomePage;
