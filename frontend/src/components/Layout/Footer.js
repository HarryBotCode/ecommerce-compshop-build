import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDiscount } from "react-icons/md";
import "../../styles/Footer.css";
import { toast } from "react-hot-toast";

const handleSubmit = () => {
  toast.success("You have successfully subscribed to our Newsletter!");
};

const Footer = () => {
  const { email, setEmail } = useState("");
  return (
    <>
      <div className="container-fluid row text-center background p-0 m-0">
        <div className="col-md-4 mt-5">
          <button
            class="btn btn-primary border-0 btn-lg rounded-circle"
            style={{ width: `${53}px`, backgroundColor: "#0156ff" }}
          >
            <BiSupport
              style={{
                fontSize: `${28}px`,
                marginBottom: `${2}px`,
                marginLeft: `${-3.5}px`,
              }}
            />
          </button>

          <h1
            className="mt-4"
            style={{ fontSize: `${20}px`, fontWeight: "bold" }}
          >
            Product Support
          </h1>
          <p className="text-center mb-5" style={{ color: "rgb(90, 89, 89)" }}>
            Up to 3 years on-site warranty <br />
            available for peace of mind.
          </p>
        </div>
        <div className="col-md-4 mt-5">
          <button
            class="btn btn-primary btn-lg border-0 rounded-circle"
            style={{ width: `${53}px`, backgroundColor: "#0156ff" }}
          >
            <CgProfile
              style={{
                fontSize: `${29}px`,
                marginBottom: `${2}px`,
                marginLeft: `${-3.5}px`,
              }}
            />
          </button>

          <h1
            className="mt-4"
            style={{ fontSize: `${20}px`, fontWeight: "bold" }}
          >
            Personal Account
          </h1>
          <p className="text-center mb-5" style={{ color: "rgb(90, 89, 89)" }}>
            With big discounts, free delivery and <br />a dedicated support
            specialist.
          </p>
        </div>
        <div className="col-md-4 mt-5">
          <button
            class="btn btn-primary btn-lg border-0 rounded-circle"
            style={{ width: `${53}px`, backgroundColor: "#0156ff" }}
          >
            <MdDiscount
              style={{
                fontSize: `${25}px`,
                marginBottom: `${2}px`,
                marginLeft: `${-2}px`,
              }}
            />
          </button>

          <h1
            className="mt-4"
            style={{ fontSize: `${20}px`, fontWeight: "bold" }}
          >
            Amazing Savings
          </h1>
          <p className="text-center mb-5" style={{ color: "rgb(90, 89, 89)" }}>
            Up to 70% off on new Products, you can <br />
            be sure of the best price.
          </p>
        </div>
      </div>
      <div className="footer bg">
        <div className="row mt-4 d-flex flex-row justify-content-around">
          <div className="col-md-6">
            <h1>Sign Up To Our Newsletter.</h1>
            <h6>Be the first to hear about the latest offers.</h6>
          </div>
          <form
            className="col-md-6 d-flex justify-content-end"
            onSubmit={handleSubmit}
          >
            <div className="row-md-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Your Email"
                className="form-control transparent-input"
                required
              />
            </div>
            <div className="row-md-3 ms-4">
              <button
                className="btn btn-primary btn-sm rounded-pill sub-btn"
                style={{ fontSize: "16px" }}
                onSubmit
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row bg d-flex flex-row justify-content-around m-0 p-0">
        <div className="col-md-2">
          <h6 className="fw-bold" style={{ color: "#838383" }}>
            Information
          </h6>
          <ul
            className="list-unstyled"
            style={{
              marginTop: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <li>
              <Link className="a-unstyled" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="a-unstyled">
                Privacy Policy{" "}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="a-unstyled">
                Terms{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Contact Us{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Newsletter Subscription
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold" style={{ color: "#838383" }}>
            PC Parts
          </h6>
          <ul
            className="list-unstyled"
            style={{
              marginTop: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <li>
              <Link className="a-unstyled" to="/about">
                CPUs
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="a-unstyled">
                Hard Drives (Internal){" "}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="a-unstyled">
                Graphic Cards{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Cases / PSUs / Cooling{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Motherboards
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold" style={{ color: "#838383" }}>
            Desktop PCs
          </h6>
          <ul
            className="list-unstyled"
            style={{
              marginTop: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <li>
              <Link className="a-unstyled" to="/about">
                Custom PCs
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="a-unstyled">
                HP/Compaq PCs{" "}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="a-unstyled">
                ASUS PCs{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Servers{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                MSI Pcs
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold" style={{ color: "#838383" }}>
            Laptops
          </h6>
          <ul
            className="list-unstyled"
            style={{
              marginTop: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <li>
              <Link className="a-unstyled" to="/about">
                HP Laptops
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="a-unstyled">
                Tablets & Pads{" "}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="a-unstyled">
                Notebooks{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                MSI Prestige Series{" "}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="a-unstyled">
                Infinity Gaming Notebooks
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="fw-bold" style={{ color: "#838383" }}>
            Address
          </h6>
          <ul
            className="list-unstyled"
            style={{
              marginTop: "25px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <li>
              <Link className="a-unstyled" to="/about">
                Address: 1234 Street Islamabad, Pakistan, 4400
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="a-unstyled">
                Phones:
                <span style={{ color: "#0d6efd" }}> (+92) 3125983628</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="a-unstyled">
                We are open: Monday-Thursday:<br/> 9:00 AM - 10:00 PM{" "}
              </Link>
            </li>

            <li>
              <Link to="/contact" className="a-unstyled">
                E-mail:
                <span style={{ color: "#0d6efd" }}> compshop@email.com</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg">
        <img src="/images/line.png" className="img-fluid mt-4" />

        <div className="row mt-4 p-0 m-0">
          <div className="col-md-2">
            <img src="images/fb-icon.png" alt="fb-icon" className="img-fluid" />
            <img
              src="images/insta-icon.png"
              alt="insta-icon"
              className="img-fluid ms-2"
            />
          </div>
          <div className="col-md-8 text-center">
            <img
              src="images/payment-group-icon.png"
              alt="payment-icon"
              className="img-fluid"
            />
          </div>
          <div className="col-md-2">
            <p
              className="text-center fw-light"
              style={{ fontSize: "14px", color: "#838383" }}
            >
              Copyright &copy; CompShop Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
