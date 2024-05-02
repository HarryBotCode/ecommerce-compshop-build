import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { RiShoppingCartLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import "../../styles/Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top d-flex flex-column justify-content-between m-0 p-0">
        <div className="container-fluid bg-dark" style={{ height: "35px" }}>
          <div className="navbar-nav container-fluid mt-2">
            <div className="nav-item ms-left">
              <p
                style={{
                  color: "white",
                  fontSize: "12px",
                  color: "#b7b7b6",
                  fontWeight: "bold",
                }}
              >
                Mon-Sat:{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "initial",
                  }}
                >
                  9:00 AM - 10:00 PM
                </span>
              </p>
            </div>
            <div className="nav-item ms-auto">
              <p
                style={{
                  color: "white",
                  fontSize: "12px",
                  color: "#b7b7b6",
                  fontWeight: "bold",
                }}
              >
                Visit our showroom in 1234 address city{" "}
                <Link
                  to="/contact"
                  style={{ color: "white", marginLeft: "4px" }}
                >
                  {" "}
                  Contact Us
                </Link>
              </p>
            </div>
            <div className="nav-item ms-auto">
              <p style={{ color: "white", fontSize: "12px" }}>
                Call us: (+92)3125983628{" "}
                <AiFillFacebook style={{ fontSize: "16px", margin: "4px" }} />{" "}
                <AiFillInstagram style={{ fontSize: "16px" }} />
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-2 mt-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img
              src="/images/Logo.png"
              alt="logo"
              className="img-fluid p-0 m-0"
              style={{
                height: "50px",
              }}
            />
            <ul className="navbar-nav ms-left mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{ height: "300px", overflowY: "auto" }}
                >
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                      key={c._id}
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink>
                  <SearchInput />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge
                    count={cart?.length}
                    offset={[-8, -1]}
                    style={{ backgroundColor: "#0156ff", color: "white" }}
                  >
                    <RiShoppingCartLine
                      style={{
                        fontSize: `${23}px`,
                        marginRight: `${10}px`,
                      }}
                    />
                  </Badge>
                </NavLink>
              </li>
              {!auth?.user ? (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      <FiLogIn style={{ fontSize: "25px" }} />
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropstart">
                    <NavLink
                      className="nav-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      <RxAvatar
                        style={{
                          fontSize: `${25}px`,
                        }}
                      />
                      {/* {auth?.user?.name} */}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
