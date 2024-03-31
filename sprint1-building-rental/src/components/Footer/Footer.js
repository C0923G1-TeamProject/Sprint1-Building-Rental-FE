function Footer() {
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div>
        <div class="display">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <img class="logo_footer" src="/img/HomePage/Logo-footer.png" />
          </div>
          <div
            class="col-xs-2 col-sm-2 col-md-2 col-lg-2"
            style={{ background: "#3F3836" }}
          ></div>
          <div
            class="col-xs-6 col-sm-6 col-md-6 col-lg-6"
            style={{ background: "#3F3836" }}
          >
            <p class="text-footer">
              <i
                class="fa fa-map-marker"
                style={{ "font-size": "25px", color: "white" }}
              ></i>{" "}
              Địa chỉ : Số 35 Thái Phiên, Phường Phước Ninh, Quận Hải Châu, TP
              Đà Nẵng
            </p>
            <br />
            <p class="text-footer">
              <i
                class="fa fa-phone"
                style={{ "font-size": "25px", color: "white" }}
              ></i>
              Diện thoại : 0813.06.16.36
            </p>
          </div>
          {/* <p style={{ background: "#EEB043" }}>
            © C0923G1 | Codegym Đà Nẵng
          </p> */}
        </div>
      </div>

      {/* <!-- Footer End --> */}
    </>
  );
}
export default Footer;
