import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://https://ecommerce-compshop-build.vercel.app/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container">
        <div className="form-container ">
          <div className="mt-2 p-1">
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
              to={"/register"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Register
            </Link>
          </div>
          {/* <h2 className="fw-bold">Customer Login</h2> */}
          <div className="row container-fluid d-flex justify-content-center mt-4">
            <div className="col-md-5">
              <form
                style={{
                  backgroundColor: "#f5f7ff",
                  boxShadow: "none",
                  height: "745px",
                }}
                onSubmit={handleSubmit}
                className="p-5"
              >
                <h4 className="fw-bold">Already have an account?</h4>
                <div style={{ color: "#65605a" }} className="m-0 p-0">
                  <p>Login to Track orders and more</p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-3 rounded-pill border-0"
                  style={{
                    width: "130px",
                    height: "40px",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </form>
            </div>
            <div className="col-md-5 mb-5">
              <form
                style={{
                  backgroundColor: "#f5f7ff",
                  boxShadow: "none",
                  padding: "40px",
                }}
                onSubmit={handleSubmit}
              >
                <h3 className="fw-bold">Register</h3>
                <p style={{ color: "#65605a" }}>
                  If you have an account, sign in with your email address.
                </p>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label fw-bold">
                    Name
                  </label>
                  <input
                    type="name"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="name"
                    value={name}
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label fw-bold">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    Phone
                  </label>
                  <input
                    type="phone"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your Phone No."
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    Address
                  </label>
                  <input
                    type="address"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your Address"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label fw-bold">
                    What's your favourite sports?
                  </label>
                  <input
                    type="answer"
                    class="form-control"
                    id="exampleInputPassword1"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Your Answer"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    class="btn btn-primary rounded-pill mt-3 border-0"
                    style={{
                      width: "130px",
                      height: "45px",
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
