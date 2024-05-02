import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import { IoIosArrowForward } from "react-icons/io";
import { useCart } from "../context/cart";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  //addtocart
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
    <Layout>
      <div className="container-fluid category">
        <div className="p-3">
          {" "}
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
              to={"/categories"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Categories
            </Link>
            <IoIosArrowForward
              color="#0156ff"
              style={{
                fontSize: "10px",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            />
            <span style={{ color: "#838383" }}>{category?.name}</span>
          </div>
          <h6 className="mt-2">{products?.length} result found </h6>
        </div>

        <div className="row row-cols-4">
          {products !== undefined ? (
            products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="card ms-4 mb-4"
                  style={{ width: "300px" }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img"
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
              <div className="spinner-container ms-3">
                {/* You should add the loading condition here */}
                {loading ? (
                  <ClipLoader size={50} color={"#123abc"} loading={true} />
                ) : (
                  <p>No Products Found</p>
                )}
              </div>
            )
          ) : (
            <p>No Products Found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
