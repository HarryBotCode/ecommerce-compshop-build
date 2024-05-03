import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { IoIosArrowForward } from "react-icons/io";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://https://ecommerce-compshop-build.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.message) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
            to={"/login"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Login
          </Link>
        </div>
        {/* <h2 className="fw-bold">Customer Login</h2> */}
        <div className="row container-fluid d-flex justify-content-center mt-4">
          <div className="col-md-5">
            <form
              style={{
                backgroundColor: "#f5f7ff",
                boxShadow: "none",
                height: "420px",
              }}
              onSubmit={handleSubmit}
              className="p-5"
            >
              <h3 className="fw-bold">Login</h3>
              <p style={{ color: "#65605a" }}>
                If you have an account, sign in with your email address.
              </p>
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
                  Sign in
                </button>
                <button
                  className="btn mt-3 border-0"
                  onClick={() => navigate("/forgot-password")}
                  style={{ textDecoration: "underline" }}
                >
                  Forgot Your Password?
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <form
              style={{
                backgroundColor: "#f5f7ff",
                boxShadow: "none",
                height: "420px",
              }}
              onSubmit={handleSubmit}
              className="p-5"
            >
              <h4 className="fw-bold">New Customer?</h4>
              <div style={{ color: "#65605a" }} className="m-0 p-0">
                <p>Creating an account has many benefits:</p>
                <ul>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3 rounded-pill border-0"
                style={{
                  width: "200px",
                  height: "45px",
                }}
                onClick={() => navigate("/register")}
              >
                Create An Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
