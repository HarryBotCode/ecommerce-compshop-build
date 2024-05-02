import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid p-3 adminPage">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h5 className="fw-bold">Account Information</h5>
            <hr />
            <div className="col-md-7">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h6 className="fw-bold">Contact Information</h6>
                  <p style={{ color: "grey" }}>
                    {auth?.user?.name}
                    <br />
                    {auth?.user?.email}
                    <br />
                    {auth?.user?.phone}
                  </p>
                  <div className="mb-5 text-start">
                    <Link to="/">Edit</Link>
                    <Link className="ms-4" to="/">
                      Change Password
                    </Link>
                  </div>
                </div>
                <div className="ms-5">
                  <h6 className="fw-bold">Newsletters</h6>
                  <p style={{ color: "grey" }}>
                    You don't subscribe to our newsletter
                  </p>
                  <br />
                  <br />
                  <Link to="/">Edit</Link>
                </div>
              </div>
            </div>
            <h5 className="fw-bold">Address Book</h5>
            <hr />
            <div className="col-md-7">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h6 className="fw-bold">Default Billing Address</h6>
                  <p style={{ color: "grey" }}>
                    You have not set a default billing address.
                  </p>
                  <br />
                  <div className="mb-5 text-start">
                    <Link to="/">Edit Address</Link>
                  </div>
                </div>
                <div className="ms-5">
                  <h6 className="fw-bold">Default Shipping Address</h6>
                  <p style={{ color: "grey" }}>
                    You have not set a default shipping address.
                  </p>
                  <br />

                  <Link to="/">Edit Address</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
