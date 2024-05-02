import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title={"About us - Ecommerce App"}>
      <div className="container-fluid about">
        <div className="mt-1 p-2">
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
            to={"/about"}
            style={{ textDecoration: "none", color: "black" }}
          >
            About Us
          </Link>
        </div>
        <h3 className="fw-bold p-2">About Us</h3>
        <div className="row" style={{ background: "black" }}>
          <div className="col-md-4 ms-5">
            <img src="/images/aboutus1.png" height={"400px"} />
          </div>

          <div className="col-md-6 mt-5 text-end">
            <img
              src="/images/aboutus1pc.png"
              height={"300px"}
              style={{ marginRight: "80px" }}
            />
          </div>
        </div>

        <div className="row text-center" style={{ background: "white" }}>
          <div className="col-md-12">
            <img src="/images/aboutus2.png" height={"400px"} />
          </div>
        </div>

        <div className="row" style={{ background: "black" }}>
          <div className="col-md-4 ms-5">
            <img src="/images/aboutus3.png" height={"400px"} />
          </div>

          <div className="col-md-6 mt-5 text-end">
            <img
              src="/images/aboutus3pc.png"
              height={"300px"}
              style={{ marginRight: "80px" }}
            />
          </div>
        </div>

        <div className="row text-center" style={{ background: "white" }}>
          <div className="col-md-12">
            <img src="/images/aboutus4.png" height={"400px"} />
          </div>
        </div>

        <div className="row" style={{ background: "black" }}>
          <div className="col-md-4 ms-5">
            <img src="/images/aboutus5.png" height={"400px"} />
          </div>

          <div className="col-md-6 mt-5 text-end">
            <img
              src="/images/aboutus5pc.png"
              height={"300px"}
              style={{ marginRight: "80px" }}
            />
          </div>
        </div>

        <div className="row text-center" style={{ background: "white" }}>
          <div className="col-md-12 mt-5 mb-5">
            <img src="/images/Review.png" height={"250px"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
