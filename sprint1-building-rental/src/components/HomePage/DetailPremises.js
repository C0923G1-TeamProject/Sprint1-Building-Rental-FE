import HeaderUser from "../Header/HeaderUser";
import * as DetailPremisesService from "../../service/DetailPremisesService";
import { Formik, Form } from "formik";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Css/HomePage/DetailPremises.css";
import Helmet from "react-helmet";
import HeaderAdmin from "../Header/HeaderAdmin";

function DetailPremises() {
  const [detailPremises, setDetaiPremises] = useState();
  const { id } = useParams();

  useEffect(() => {
    detailService();
  }, []);

  const detailService = async () => {
    const detail = await DetailPremisesService.detailPremisesService(id);
    if (detail) {
      console.log(detail);
      setDetaiPremises(detail);
      console.log(detailPremises);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  if (!detailPremises) {
    return <span>Loading.....</span>;
  }

  return (
    <>
      <Helmet>
        <title>Thông tin chi tiết</title>
      </Helmet>
      <HeaderUser/>
      <br />
      <Formik
        initialValues={{
          id: detailPremises.id,
          code: detailPremises.code,
          price: detailPremises.price,
          floor: detailPremises.floor,
          cost: detailPremises.cost,
          area: detailPremises.area,
          image: detailPremises.image,
        }}
      >
        <Form>
          <div
            className="container display-detail-premises flexx"
            style={{ background: "#e6e6e6" }}
          >
            <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6">
              <div className="div-detai">
                <img
                  className="picture-detail"
                  name="image"
                  src={detailPremises.image}
                  alt=""
                />
              </div>
            </div>
            <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6">
              <div className="div-detai">
                <h4 className="text-detail-premises">Thông tin mặt bằng</h4>
                <div className="hi">
                  <p name="price">
                    <strong>- Giá cho thuê </strong> :{" "}
                    {detailPremises.price.toLocaleString()} {"vnđ/tháng"}
                  </p>
                  <p name="floor">
                    -<strong> Tầng </strong>: {detailPremises.floor}
                  </p>
                  <p name="cost">
                    -<strong> Phí quản lý </strong>: {detailPremises.cost}
                  </p>
                  <p name="area">
                    -<strong> Diện tích mặt bằng </strong>:{" "}
                    {detailPremises.area}
                  </p>
                  <p name="description">
                    <strong>- Mô tả </strong>: {detailPremises.description}
                  </p>
                  <p name="typePremises">
                    -<strong> Tình trạng </strong>:{" "}
                    {detailPremises.typePremises.name}
                  </p>
                  <p name="premisesStatus">
                    -<strong> Trạng thái </strong>:{" "}
                    {detailPremises.premisesStatus.name}
                  </p>
                </div>

                <br />
              </div>
            </div>
          </div>
        </Form>
      </Formik>

      <br />
      <br />
      <Footer />
    </>
  );
}
export default DetailPremises;
