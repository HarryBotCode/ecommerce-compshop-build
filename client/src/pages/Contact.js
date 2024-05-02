import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { ImClock } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title={"Contact Us - Ecommerce App"}>
      <div className="row contactus m-0">
        <div className="mt-3">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
          <IoIosArrowForward
            color="#0156ff"
            style={{
              fontSize: "10px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            Contact Us
          </Link>
        </div>
        <div className="col-md-8">
          <h3 className="fw-bold mt-3">Contact Us</h3>
          <p>
            We love hearing from you our CompShop customers.
            <br />
            Please contact us and we will make sure to get back to you as soon
            as we possibly can.
          </p>
          <form>
            <div className="row">
              <div class="col-md-6">
                <label
                  for="exampleFormControlInput1"
                  className="form-label fw-bold"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label
                  for="exampleFormControlInput1"
                  className="form-label fw-bold"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mt-3">
                <label
                  for="exampleFormControlInput1"
                  className="form-label fw-bold"
                >
                  Your Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="Your Phone"
                  required
                />
              </div>
              <div className="mb-3 mt-3">
                <label
                  for="exampleFormControlTextarea1"
                  className="form-label fw-bold"
                >
                  What's on your mind?
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="write us a note and we'll get back to you as soon as possible."
                  style={{ fontSize: "15px" }}
                  required
                ></textarea>
              </div>
            </div>

            <div class="col-auto">
              <button
                type="submit"
                class="btn btn-primary rounded-pill mb-3"
                style={{ width: "140px", height: "50px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4 mt-0" style={{ backgroundColor: "#f5f7ff" }}>
          <div className="row p-4">
            <div className="col-md-1">
              <FaLocationDot
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              />
            </div>
            <div className="col-md-11">
              {" "}
              <h5 className="mb-0 fw-bold">Address:</h5>
              <p className="" style={{ fontSize: "14px" }}>
                1234 Street Address City Address, 1234{" "}
              </p>
            </div>
            <div className="col-md-1">
              <BsFillTelephoneFill
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              />
            </div>
            <div className="col-md-11">
              {" "}
              <h5 className="mb-0 fw-bold">Phone:</h5>
              <p className="" style={{ fontSize: "14px" }}>
                (+92)3125983628{" "}
              </p>
            </div>
            <div className="col-md-1">
              <ImClock style={{ fontSize: "21px", fontWeight: "bold" }} />
            </div>
            <div className="col-md-11">
              {" "}
              <h5 className="mb-0 fw-bold">We are open:</h5>
              <p className="" style={{ fontSize: "14px" }}>
                Monday-Saturday 9:00 AM - 10:00 PM
                <br />
                Friday 9:00 AM - 6:00 PM
                <br />
                Sunday OFF{" "}
              </p>
            </div>
            <div className="col-md-1">
              <BiLogoGmail style={{ fontSize: "20px", fontWeight: "bolder" }} />
            </div>
            <div className="col-md-11">
              {" "}
              <h5 className="mb-0 fw-bold">E-mail:</h5>
              <p className="" style={{ fontSize: "14px" }}>
                compshop@email.com{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
