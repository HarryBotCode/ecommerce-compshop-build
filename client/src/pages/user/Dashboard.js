import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container userPage">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-5">
            <h5 className="fw-bold">Account Information</h5>
            <hr />
            <div className="col-md-8">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h6 className="fw-bold">Contact Information</h6>
                  <p style={{ color: "grey", width: "300px" }}>
                    {auth?.user?.name}
                    <br />
                    {auth?.user?.email}
                    <br />
                    {auth?.user?.phone}
                  </p>
                  <div>
                    <Link to="/dashboard/user/profile">Edit</Link>
                    <Link className="ms-4" to="/dashboard/user/profile">
                      Change Password
                    </Link>
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold">Newsletters</h6>
                  <p style={{ color: "grey", width: "350px" }}>
                    You don't subscribe to our newsletter
                  </p>
                  <br />
                  <br />
                  <Link to="/dashboard/user/profile">Edit</Link>
                </div>
              </div>
            </div>
            <h5 className="fw-bold mt-4">Address Book</h5>
            <hr />
            <div className="col-md-8">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h6 className="fw-bold">Default Billing Address</h6>
                  <p style={{ color: "grey", width: "300px" }}>
                    You haven't set a default billing address.
                  </p>
                  <br />
                  <div>
                    <Link to="/dashboard/user/profile">Edit Address</Link>
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold">Default Shipping Address</h6>
                  <p style={{ color: "grey", width: "350px" }}>
                    You have not set a default shipping address.
                  </p>
                  <br />

                  <Link to="/dashboard/user/profile">Edit</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
