import "../Css/HomePage/Messgae.css";
import { useEffect, useRef } from "react";
import HeaderUser from "../Header/HeaderUser";
import "../Css/HomePage/Introduction.css";
import Footer from "../Footer/Footer";
import emailjs from "@emailjs/browser";
import Helmet from "react-helmet";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";

function ContactPage() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_zfwbei6", "template_49r05n6", form.current, {
        publicKey: "jGRfK7ic4K5OcXh40",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 1000);

    return () => clearTimeout(timeout);
}, [])

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
      <Helmet>
        <title>Liên hệ</title>
      </Helmet>
      <HeaderUser />
      <div className="text-img-contact">
        <img className="picture-contact" src="img/HomePage/contact.jpg" />
      </div>
      <br />
      <br />
      <br />
      <div className="display container flex">
        <div className="col-sx-4 col-sm-4 col-md-4 col-lg-4">
          <img
            className={"picture-contact1"}
            src="/img/HomePage/introduct.png"
            alt=""
          />
        </div>
        <div className="col-sx-4 col-sm-4 col-md-4 col-lg-4">
          <h4
            style={{
              "font-family": "Segoe UI",
              color: "#452D14",
              margin: "2%",
            }}
          >
            Hãy liên hệ đến DIAMOND TIME{" "}
          </h4>
          <br />
          <p
            style={{
              "font-family": "Segoe UI",
              color: "#452D14",
              margin: "2%",
            }}
          >
            <FmdGoodIcon />
            <strong>Địa chỉ: </strong> Số 35 Thái Phiên, Phường Phước Ninh, Quận
            Hải Châu, TP Đà Nẵng
          </p>
          <br />
          <p
            style={{
              "font-family": "Segoe UI",
              color: "#452D14",
              margin: "2%",
            }}
          >
            <PhoneIcon />
            <strong>Điện thoại: </strong> 0813061636
          </p>
        </div>
        <div className="col-sx-4 col-sm-4 col-md-4 col-lg-4">
          <section>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form">
                <i className="fab fa-app-store-ios"></i>
                <label style={{ "margin-left": "-187px" }}>Họ và tên</label>
                <input type="text" name="user_name" />
                <br />
                <label style={{ "margin-left": "-218px" }}>Email</label>
                <input type="text" name="user_email" />
                <br />
                <label style={{ "margin-left": "-187px" }}>Nội dung</label>
                <textarea
                  className="textera"
                  cols="30"
                  rows="5"
                  name="message"
                />
                <input id="submit" type="submit" name="submit" value="Gửi" />
              </div>
            </form>
          </section>
        </div>
      </div>

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}
export default ContactPage;
