import Layout from "../../components/Layout/Layout.js";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-compshop-build.vercel.app/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting products!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid mt-5 p-3 adminPage">
        <div className="row">
          <div className="col-md-3 mt-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-5 p-2">
            <h4 className="fw-bold text-center p-2">All Products List</h4>

            <div className="row row-cols-4">
              {products?.map((p) => (
                <div
                  className="card ms-4 mb-4 btn"
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/dashboard/admin/products/${p.slug}`)
                  }
                >
                  <img
                    src={`https://ecommerce-compshop-build.vercel.app/api/v1/product/product-photo/${p._id}`}
                    className="card-img"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{p?.name}</h5>
                    <p className="card-text">{p?.description}</p>
                    <h5 className="card-text fw-bold">
                      {p.price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                        maximumFractionDigits: 0,
                      })}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
