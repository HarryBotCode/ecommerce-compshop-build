import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div
        className="p-3"
        style={{ backgroundColor: "#f5f7ff", height: "300px" }}
      >
        <div className="">
          <ul className="list-group">
            <h4 className="fw-bold text-center">Admin Panel</h4>
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item mt-2"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item"
            >
              Create Product
            </NavLink>
            <NavLink to="/dashboard/admin/products" className="list-group-item">
              Products
            </NavLink>
            <NavLink to="/dashboard/admin/users" className="list-group-item">
              Users
            </NavLink>
            <NavLink to="/dashboard/admin/orders" className="list-group-item">
              Orders
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
