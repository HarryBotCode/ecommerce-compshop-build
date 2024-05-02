import Layout from "../components/Layout/Layout";
import React, { useState } from "react";
import { useSearch } from "../context/search";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  margin-top: 20px;
  margin-bottom: 20px;
  border-color: blue; // Choose the color you want
`;

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, p) => {
    e.preventDefault();
    const productIndex = cart.findIndex((product) => product._id === p._id);

    if (productIndex !== -1) {
      // Product is already in the cart, increment the quantity
      const updatedCart = cart.map((product, index) =>
        index === productIndex
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Product is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...p, quantity: 1 }];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item Added to cart");
    }
  };

  return (
    <Layout title={"Search results"}>
      <div className="container-fluid searchPage">
        <div className="text-start">
          <h3 className="p-2 m-0 fw-bold">Search Results</h3>
          <h6 className="p-2">
            {values?.results.length < 1
              ? "No Products Found. Please check spelling again or search with different keywords."
              : `${values?.results.length} Products Found. `}
          </h6>

          <div className="row row-cols-4">
            {values ? (
              values.results.length > 0 ? (
                values.results.map((p) => (
                  <div
                    key={p._id}
                    className="card ms-4 mb-4"
                    style={{ width: "300px" }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{p?.name}</h5>
                      <p className="card-text">
                        {p?.description.substring(0, 30)}
                      </p>
                      <h5 className="card-text fw-bold">
                        {p?.price.toLocaleString("en-PK", {
                          style: "currency",
                          currency: "PKR",
                          maximumFractionDigits: 0,
                        })}
                      </h5>
                      <button
                        className="btn btn-dark"
                        onClick={(e) => handleAddToCart(e, p)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-danger rounded-pill border-0 ms-3"
                  style={{ height: "40px", width: "160px" }}
                >
                  RETURN TO SHOP
                </button>
              )
            ) : (
              <RingLoader
                css={override}
                size={35}
                color={"blue"}
                // loading={loading}
              /> // Render your spinner component here
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
