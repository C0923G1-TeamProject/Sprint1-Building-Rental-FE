import HeaderUser from "../Header/HeaderUser";
import "../Css/HomePage/Introduction.css";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
function IntroductionPage() {
  useEffect(() => {
    document.title = "Giới thiệu";
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <a
        id="myBtn2"
        className="zom"
        href="https://www.facebook.com/"
        target="_blank"
      >
        <img src="/img/HomePage/message.png" width="40px" />
      </a>
      <HeaderUser />
      <div className="introduction text-img-introduction">
        <img
          className="picture-introduction"
          src="/img/HomePage/introduct_2.jpg"
        />
      </div>
      <br />
      <br />
      <br />
      <div
        class="display container"
        style={{ "flex-wrap": "wrap", position: "relative", top: "19pc" }}
      >
        <div class="col-md-5 col-lg-5">
          <div>
            <div>
              <img
                style={{ width: "100%", height: "450px" }}
                src="/img/HomePage/marketing-body-homepage.png"
              />
            </div>
          </div>
        </div>

        <div
          class="col-md-7 col-lg-7"
          // style={{ position: "relative", top: "19pc" }}
        >
          <h3
            style={{
              color: "#452D14",
              "text-align": "center",
              margin: "6%",
              "font-family": "Segoe UI",
            }}
            className="mb-4"
          >
            Diamond Thái Phiên Đà Nẵng
          </h3>
          <p style={{ "margin-left": "2pc" }}>
            Tòa nhà phức hợp DIAMOND TIME – 35 Thái Phiên với diện tích sử dụng
            lên đến gần 5.000m2 được đánh giá là một trong những tòa nhà phức
            hợp hiện đại tại Thành phố Đà Nẵng, không chỉ sở hữu vị trí “VÀNG”
            với hai mặt tiền đường Thái Phiên và đường Yên Bái mà còn được khai
            thác, vận hành và quản lý bởi Công ty Cổ phần Lotus Hospitality –
            Một trong những đơn vị quản lý chuyên nghiệp & uy tín.
            <br />
            <br />
            <span className="tick">&#x2713;</span>{" "}
            <strong style={{ " margin": "6%" }}>Tên tòa nhà: </strong> DIAMOND
            TIME <br />
            <span className="tick">&#x2713;</span> <strong>Địa chỉ: </strong> 35
            đường Thái Phiên, Phường Phước Ninh, Quận Hải Châu, Thành phố Đà
            Nẵng <br />
            <span className="tick">&#x2713;</span> <strong>Chủ đầu tư: </strong>
            Công ty TNHH Phước Tiến
            <br />
            <span className="tick">&#x2713;</span>{" "}
            <strong>Tổng diện tích xây dựng: </strong>5000 m<sup>2</sup>
            <br />
            <span className="tick">&#x2713;</span>{" "}
            <strong>Diện tích mặt sàn: </strong>1300 m<sup>2</sup>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="container ">
        <img
          className="picture-introduct-1"
          src="/img/HomePage/introduct.jpg"
        />
      </div>
      <br />
      <br />
      <br />

      {/* <!--Div giới thiệu Start--> */}
      <div className="container color-marketing-homepage">
        <div className="display flex">
          <div className="col-md-8 ">
            <div>
              <div style={{ width: "80%" }}>
                <h3
                  style={{
                    "font-family": "Segoe UI",
                    color: "#452D14",
                    margin: "6%",
                  }}
                >
                  Hứng trọn ánh sáng thiên nhiên
                </h3>
                <p style={{ margin: "6%" }}>
                  Mang phong cách kiến trúc hiện đại, Tòa nhà phức hợp
                  DiamondTime - 35 Thái Phiên - Đà Nẵng sở hữu nội thất gỗ tự
                  nhiên được thiết kế tinh tế, trau chuốt tỉ mỉ đảm bảo mang đến
                  sự hài lòng cho khách hàng.
                </p>
                <p style={{ margin: "6%" }}>
                  Với một không gian chuyên nghiệp cho thuê văn phòng, bạn có
                  thể tận hưởng nhiều tiện ích và dịch vụ bao gồm các phòng làm
                  việc riêng tư, trang thiết bị công nghệ tiên tiến, Internet
                  tốc độ cao, dịch vụ lễ tân chuyên nghiệp, và không gian phòng
                  họp linh hoạt. Ngoài ra, việc thuê văn phòng cũng giúp bạn
                  tiết kiệm thời gian và chi phí so với việc tự mình tạo ra một
                  không gian làm việc từ đầu.
                </p>
              </div>
            </div>
          </div>
          <div classNameName="col-md-4">
            <img
              style={{ width: "372px", height: "100%" }}
              src="/img/HomePage/introduct-picture.jpg"
            />
          </div>
        </div>
      </div>
      {/* <!--Div giới thiệu End--> */}
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
export default IntroductionPage;
