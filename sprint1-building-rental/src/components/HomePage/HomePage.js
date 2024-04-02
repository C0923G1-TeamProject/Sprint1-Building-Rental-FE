import CarouselBody from "../Carousel/Carousel";
import HeaderUser from "../Header/HeaderUser";
import "../Css/HomePage/Body.css";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Footer from "../Footer/Footer";
import { Hourglass } from "react-loader-spinner";
import Helmet from "react-helmet";
import "../Css/HomePage/Messgae.css";
import SearchIcon from "@mui/icons-material/Search";
import * as service from "../../service/PremisesService";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import "../Css/HomePage/CardListHomePage.css";

function HomePage() {
  const [premises, setPremises] = useState([]);
  const [floor, setFloor] = useState("");
  const [code] = useState("");
  const [area, setArea] = useState(99999);
  const [premisesName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getAll = async () => {
    const result = await service.getAllPremisesHomePage("", "", "", "", 0);
    setPremises(result.content);
    if (result) {
      let premisesFiltered = result.content.filter(
        (premise) => premise.typePremises.id === 1
      );
      setPremises(premisesFiltered);
    }
  };

  const handleFloor = (value) => {
    setFloor(value);
  };

  const handleArea = (value) => {
    setArea(value);
  };

  const submitSearch = async () => {
    try {
      if (floor !== undefined || null || " ") {
        // Kiểm tra xem tầng  có underfine không
        let x1 = await service.getAllPremisesHomePage(
          floor,
          code,
          area,
          premisesName,
          0
        );
        console.log("kkkkkk", typeof x1);

        setPremises(x1.content);
        setTotalPages(x1.totalPages);
        setCurrentPage(0);
        console.log("submit success");
      } else {
        // Xử lý khi tầng không được chọn
        console.log("Tầng không được chọn");
      }
    } catch (e) {
      console.log("submit Fail");
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await service.getAllPremisesHomePage(
          floor,
          code,
          area,
          premisesName,
          0
        );
        console.log(result);
        setPremises(result.content);
        setTotalPages(result.totalPages);
      } catch (e) {
        console.log(e);
      }
    };
    fetchApi(floor, code, area, premisesName, 0);
  }, []);

  // hiệu ứng xoay xoay load danh sách Start //

  useEffect(() => {
    console.log("LINE 94", premises);
  }, [premises]);

  // hiệu ứng xoay xoay load danh sách End //

  // Croll top page Start //
  useEffect(() => {
    getAll();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  // Croll top page End //

  function formatPrice(price) {
    return price.toLocaleString("vi-VN");
  }
  // format giá tiền End //

  const fetchData = async (page) => {
    try {
      const result = await service.getAllPremisesHomePage(
        floor,
        code,
        area,
        premisesName,
        page
      );
      setPremises(result.content);
      setTotalPages(result.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageClick = async (event) => {
    try {
      const pageNumber = event.selected;
      setCurrentPage(pageNumber);
      // Gọi fetchData với currentPage mới
      fetchData(pageNumber);
    } catch (e) {
      console.log(e);
    }
  };

  if (localStorage.getItem("token")) {
    navigate("/loginPage");
  }

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

                  <br />
                  <div className="display">
                    <div className="col-lg-2">
                      <select
                        className=" select-floor-homePage"
                        onChange={(event) => handleFloor(event.target.value)}
                      >
                        <option value="">Tầng: Tất cả</option>
                        <option value="1">Tầng 1</option>
                        <option value="2">Tầng 2</option>
                        <option value="3">Tầng 3</option>
                        <option value="4">Tầng 4</option>
                        <option value="5">Tầng 5</option>
                        <option value="6">Tầng 6</option>
                        <option value="7">Tầng 7</option>
                        <option value="8">Tầng 8</option>
                        <option value="9">Tầng 9</option>
                      </select>
                    </div>

                    <div className="display">
                      <input
                        onChange={(event) => handleArea(event.target.value)}
                        type="text"
                        name="name-search"
                        size="25"
                        placeholder="Diện tích tối đa"
                        className="placehoder-search-area-homePage"
                      />
                      <button onClick={() => submitSearch()} type="button">
                        <span className="icon-search-homePage">
                          <SearchIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                  <br />
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
                  ) : !premises?.length ? (
                    <p>Không có danh sách....</p>
                  ) : (
                    <div className="row g-4">
                      {premises
                        .filter((premise) => premise.typePremises.id === 1)
                        .map((premise, index) => (
                          <div
                            class="col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-delay="0.1s"
                          >
                            <div class="team-item position-relative">
                              <img
                                style={{
                                  height: "200px",
                                  width: "400px",
                                  "border-radius": "7px",
                                  "box-shadow": "2px 2px 2px #AAA",
                                }}
                                className="bg-img"
                                src={premise.image}
                                alt=""
                              />
                              <div class="team-text bg-#504e4e rounded-end p-4">
                                <div>
                                  <h6>
                                    <a style={{ "font-weight": "bold" }}>
                                      Diện tích:
                                    </a>{" "}
                                    {premise.area} m<sup>2</sup>
                                  </h6>
                                  <h6>
                                    <a style={{ "font-weight": "bold" }}>
                                      Giá:{" "}
                                    </a>{" "}
                                    {formatPrice(premise.price)} {"vnđ/tháng"}
                                  </h6>
                                  <h6>
                                    <a style={{ "font-weight": "bold" }}>
                                      Tầng:{" "}
                                    </a>{" "}
                                    {premise.floor}
                                  </h6>

                                  <br />
                                </div>
                                <Link to={`/premises/${premise.id}`}>
                                  <i
                                    style={{ color: "#EEB043" }}
                                    class="fa fa-arrow-right fa-2x"
                                  ></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* Hiển thị danh sách mặt bằng End */}
                <br />

                {/* <!-- phân trang Start --> */}
                {totalPages > 0 && (
                  <div className=" float-paging-homepage">
                    {/* {premises ? ( */}
                    <div>
                      <ReactPaginate
                        forcePage={currentPage}
                        breakLabel="..."
                        nextLabel="Trang sau"
                        previousLabel="Trang trước"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1} // Chỉ hiển thị số trang đầu và cuối cùng
                        marginPagesDisplayed={1} // Số lượng trang hiển thị ở trước và sau dấu chấm chấm
                        pageCount={totalPages}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                      />
                    </div>

                    {/* ) : ( */}

                    {/* )} */}
                  </div>
                )}
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
export default HomePage;
