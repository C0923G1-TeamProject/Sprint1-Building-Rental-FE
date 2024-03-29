import CarouselBody from "../Carousel/Carousel";
import "../Css/HomePage/Body.css";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Footer from "../Footer/Footer";
import { Hourglass } from "react-loader-spinner";
import Helmet from "react-helmet";
import "../Css/HomePage/Messgae.css";
import * as Method from "../Method/MethodHomePage";
import { useEffect, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";

function LoginPage() {

  // Lọc hiển thị danh sách, điều kiện mặt bằng === chưa bàn giao thì hiển thị Start //

  const [premises, setPremises] = useState([]);
  const getAll = async () => {
    let res = await Method.getAllPremisesHomePage();
    if (res) {
      let premisesFiltered = res.content.filter(
        (premise) => premise.typePremises.name === "chưa bàn giao"
      );
      setPremises(premisesFiltered);
    }
  };
  // Lọc hiển thị danh sách, điều kiện mặt bằng === chưa bàn giao thì hiển thị End //


  // icon load trước khi hiển thị danh sách mặt bằng Start //
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    console.log(Permissions[0]);
  }, [premises]);
  useEffect(() => {
    getAll();
    setTimeout(() => {
      setIsLoading(false); 
    }, 1000);
  }, []);
  // icon load trước khi hiển thị danh sách mặt bằng End //


  // Croll top page Start //
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  // Croll top page End //


    return () => clearTimeout(timeout);
  }, []);

  // Nếu danh sách rỗng Start //
  if (!premises) {
    return "";
  }
  // Nếu danh sách rỗng Start //

  // format giá tiền Start //
  if (!premises) {
    return "";
  }
  function formatPrice(price) {
    return price.toLocaleString("vi-VN");
  }
  // format giá tiền End //

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div>
        <HeaderAdmin />
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
          <div className="container">
            <div className="container">
              <div className="container-xxl py-5">
                <div className="container">
                  <div
                    className="text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ "max-width": "600px" }}
                  >
                    <h3
                      className="display-5 mb-4"
                      style={{
                        color: "#452D14",
                      }}
                    >
                      Một số mặt bằng tại Diamond
                    </h3>
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
                  <br />
                  {/* Hiển thị danh sách mặt bằng Start */}
                  {isLoading ? (
                    <div className="loading-homePage">
                      <Hourglass
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={["#306cce", "#72a1ed"]}
                      />
                    </div>
                  ) : (
                    <div className="row g-4">
                      {premises.map((premise, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                          <div className="service-item d-flex position-relative text-center h-100">
                            <img
                              className="bg-img"
                              src="/img/HomePage/card-6.jpg"
                              alt=""
                            />
                            <div
                              className="service-text p-5"
                              style={{ width: "100%" }}
                            >
                              <img
                                className="mb-4"
                                src="/img/HomePage/icon-1.png"
                                alt="Icon"
                              />

                              <h6>
                                <a style={{ "font-weight": "bold" }}>
                                  Diện tích:
                                </a>{" "}
                                {premise.area} m<sup>2</sup>
                              </h6>
                              <h6>
                                <a style={{ "font-weight": "bold" }}>Giá: </a>{" "}
                                {formatPrice(premise.price)} {"vnđ"}
                              </h6>
                              <h6>
                                <a style={{ "font-weight": "bold" }}>Tầng: </a>{" "}
                                {premise.floor}
                              </h6>
                              <br />
                              <Link
                                className="btn"
                                to={`/premises/${premise.id}`}
                              >
                                <span style={{ marginRight: "5px" }}>
                                  <AddIcon />
                                </span>
                                Xem thêm
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Hiển thị danh sách mặt bằng End */}

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
                <h3
                  class="display-5 mb-4"
                  style={{
                    color: "#452D14",
                  }}
                >
                  Đóng góp
                </h3>
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
export default LoginPage;
