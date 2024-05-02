import React from "react";
import { NavLink, Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const UserMenu = () => {
  return (
    <>
      <div className="">
        <div className="">
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
            to="/dashboard/user"
            style={{ textDecoration: "none", color: "black" }}
          >
            My Dashboard
          </Link>

          <h2 className="text-start fw-bold mt-3">My Dashboard </h2>
          <div
            className="p-2"
            style={{ backgroundColor: "#f5f7ff", height: "300px" }}
          >
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item mt-2"
            >
              My Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/orders"
              className="list-group-item mt-2"
            >
              My Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
