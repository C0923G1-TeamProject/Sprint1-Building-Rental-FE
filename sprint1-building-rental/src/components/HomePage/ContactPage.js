import "../Css/HomePage/Messgae.css";
import { useRef } from "react";
import HeaderUser from "../Header/HeaderUser";
import "../Css/HomePage/Introduction.css";
import Footer from "../Footer/Footer";
import emailjs from "@emailjs/browser";
import Helmet from "react-helmet";

function ContactPage() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_w2b1o5q", "template_s76878n", form.current, {
        publicKey: "kWK6O6d2yis9J2aUw",
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
            className={"picture-contact"}
            src="/img/HomePage/introduct.png"
            alt=""
          />
        </div>
        <div className="col-sx-4 col-sm-4 col-md-4 col-lg-4">
          <img
            className={"picture-contact"}
            src="/img/HomePage/contact-body-1.png"
            alt=""
          />
        </div>
        <div className="col-sx-4 col-sm-4 col-md-4 col-lg-4">
          <section>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form">
                <i className="fab fa-app-store-ios"></i>
                <label style={{ "margin-left": "-172px" }}>Họ và tên</label>
                <input type="text" name="user_name" />
                <label style={{ "margin-left": "-200px" }}>Email</label>
                <input type="text" name="user_email" />
                <label style={{ "margin-left": "-172px" }}>Nội dung</label>
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
