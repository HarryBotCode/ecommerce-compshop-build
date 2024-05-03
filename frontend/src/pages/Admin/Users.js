import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const Users = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  //get orders
  const getOrders = async () => {
    const { data } = await axios.get(
      "https://https://ecommerce-compshop-build.vercel.app/api/v1/auth/all-orders"
    );
    setOrders(data);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid mt-5 p-3 adminPage">
        <div className="row">
          <div className="col-md-3 mt-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-5 p-2">
            <h4 className="fw-bold text-center p-2">All Users</h4>
            {orders?.map((o, i) => {
              return (
                <div className="">
                  <h6>{o?.buyer?.name}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
