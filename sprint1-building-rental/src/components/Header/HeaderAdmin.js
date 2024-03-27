import "../Css/HomePage/Header.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "jquery";
import "@popperjs/core"; // Edit here
import "bootstrap/dist/js/bootstrap.bundle";

function HeaderAdmin({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    setShowModal(true); // Hiển thị Modal khi người dùng nhấn vào nút "Đăng xuất"
  };



  return (
    <>
      {/* Topbar Start */}
      <div class="container-fluid bg-dark p-0 wow fadeIn" data-wow-delay="0.1s">
        <div class="row gx-0 d-none d-lg-flex">
          <div class="col-lg-7 px-5 text-start">
            <div class="h-100 d-inline-flex align-items-center py-3 me-3">
              <a
                style={{
                  color: "white",
                  "font-size": "15px",
                  color: "white",
                  margin: "0 10px",
                }}
              >
                <PhoneIcon style={{ color: "#eeb043" }} /> 0813.06.16.36
              </a>
              <a
                style={{
                  color: "white",
                  "font-size": "15px",
                  color: "white",
                  margin: "0 10px",
                }}
              >
                <LocationOnIcon style={{ color: "#eeb043" }} /> Số 35 Thái
                Phiên, Phường Phước Ninh, Quận Hải Châu, TP Đà Nẵng
              </a>
            </div>
          </div>
          <div class="col-lg-5 px-5 text-end">
            <div class="h-100 d-inline-flex align-items-center">
              <a class="btn btn-sm-square btn-outline-body me-1">
                <FacebookIcon />
              </a>
              <a class="btn btn-sm-square btn-outline-body me-1">
                <TwitterIcon />
              </a>
              <a class="btn btn-sm-square btn-outline-body me-1">
                <LinkedInIcon />
              </a>
              <a class="btn btn-sm-square btn-outline-body me-0">
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      <nav
        class="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <a href="" class="navbar-brand ms-4 ms-lg-0">
          <img
            className="logo_header"
            src="/img/HomePage/Logo_header.png"
            alt="Image"
          />
        </a>
        <button
          type="button"
          class="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink to={"/loginPage"} id="trang-chu" className={`nav-link`}>
              Trang chủ
            </NavLink>
            {/* sideba Start */}
            <div>
              
            </div>
            <NavLink
              style={{ "text-align": "center" }}
              onClick={handleShow}
              className="me-2"
            >
              {name} <button className="text-manage">QUẢN LÝ</button>
            </NavLink>
            <Offcanvas show={show} onHide={handleClose} {...props}>
              <Offcanvas.Header  closeButton>
                <Offcanvas.Title>
                  <span className="sidebar-title">Quản Lý</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="sidebar-loginPage">
                <div>
                  <Link className="text-sideba" to={"/premises"}>
                    <button className="button-sideba">
                      <span >Quản lý mặt bằng</span>
                    </button>
                  </Link>
                </div>
                <div>
                  <Link className="text-sideba" to={""}>
                    <button  className="button-sideba">
                      <span>Quản lý khách hàng</span>
                    </button>
                  </Link>
                </div>
                <div>
                  <Link className="text-sideba" to={""}>
                    <button className="button-sideba">
                      <a href="/contract" style={{color:`black`, textDecoration:`none`}}><span>Quản lý hợp đồng</span></a>
                    </button>
                  </Link>
                </div>

                <button></button>
              </Offcanvas.Body>
            </Offcanvas>

            {/* sideba End */}

            <div>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                </DropdownToggle>
                
                  <DropdownMenu>
                  <DropdownItem>Thông tin cá nhân</DropdownItem>
                    <DropdownItem><p className="logout-button-header" onClick={handleLogout}>Đăng xuất</p></DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đăng xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body><strong>Bạn có chắc chắn muốn đăng xuất?</strong></Modal.Body>
        <Modal.Footer>
          <Button className="nologout" onClick={handleCloseModal}>
            Không
          </Button>
          <Link to="/">
            <Button className="button-logout">Đăng xuất</Button>
          </Link>
        </Modal.Footer>
      </Modal>
      {/* modal End */}
    </>
  );
}
export default HeaderAdmin;
