import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { GiArrowDunk } from "react-icons/gi";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
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
      <div className="row conatiner-fluid product-details m-0 p-0">
        <div className="mt-3">
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
            to={`/category/${product?.category?.slug}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {product?.category?.name}
          </Link>
          <IoIosArrowForward
            color="#0156ff"
            style={{
              fontSize: "10px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          <span style={{ color: "#838383" }}>{product?.name}</span>
        </div>
        <div className="col">
          <div className="mt-3 mb-5">
            <ul className="nav nav-tabs" id="myTabs">
              <li className="nav-item">
                <a
                  className="nav-link active fw-bold"
                  id="tab1-tab"
                  data-bs-toggle="tab"
                  href="#tab1"
                >
                  Product Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="tab2-tab"
                  data-bs-toggle="tab"
                  href="#tab2"
                >
                  Specs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="tab3-tab"
                  data-bs-toggle="tab"
                  href="#tab3"
                >
                  Reviews
                </a>
              </li>
            </ul>

            {/** -------------          ALL TABS     -------------------- */}
            <div className="tab-content">
              {/*-------------       TAB 1 - PRODUCT DETAILS        ----------------- */}
              <div className="tab-pane fade show active" id="tab1">
                <div className="row container-fluid">
                  <div
                    className="col-md-6 ps-5"
                    style={{ backgroundColor: "#f5f7ff" }}
                  >
                    <h2 className="fw-bold mt-4">{product.name}</h2>

                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: "15px",
                      }}
                    >
                      Be the first to review this product
                    </Link>

                    <div className="col-md-10">
                      <ul className="list-unstyled mt-4">
                        <li>{product.description}</li>
                      </ul>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <div className="col-md-6 mb-5 mt-4">
                        <h3 className="fw-bold mt-4">
                          {product?.price?.toLocaleString("en-PK", {
                            style: "currency",
                            currency: "PKR",
                            maximumFractionDigits: 0,
                          })}
                        </h3>
                        <button
                          className="btn rounded-pill btn-primary border-2 fw-bold"
                          style={{
                            width: `${110}px`,
                            fontSize: `${15}px`,
                            height: "40px",
                            paddingTop: "8px",
                            marginRight: "15px",
                          }}
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Add To Cart
                        </button>
                        <Link style={{ textDecoration: "none" }}>
                          <img
                            src="/images/paypal.png"
                            alt="paypal"
                            className="img-fluid hover"
                            style={{ height: "40px" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-content-around mt-4">
                    <div className="text-center">
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                        className="img-fluid rounded-start card-image-top"
                        alt={product.name}
                      />
                    </div>
                    <div className="text-center mt-auto mb-5">
                      {" "}
                      <img src="/images/pagination.png" />
                    </div>
                  </div>
                </div>
              </div>
              {/**-------------       TAB 2 - PRODUCT SPECS         ----------------- */}
              <div className="tab-pane fade" id="tab2">
                <div className="row container-fluid">
                  <div className="col-md-6 d-flex flex-column justify-content-around mt-4">
                    <div className="text-center">
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                        className="img-fluid rounded-start card-image-top"
                        alt={product.name}
                      />
                    </div>
                    <div className="text-center mt-auto mb-5">
                      {" "}
                      <img src="/images/pagination.png" />
                    </div>
                  </div>

                  <div
                    className="col-md-6 ps-5"
                    style={{ backgroundColor: "#f5f7ff" }}
                  >
                    <h2 className="fw-bold mt-4">{product.name}</h2>

                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: "15px",
                      }}
                    >
                      Be the first to review this product
                    </Link>

                    <div className="col-md-10">
                      <ul className="list-unstyled mt-4">
                        <li>{product.description}</li>
                      </ul>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <div className="col-md-6 mb-5 mt-4">
                        <h3 className="fw-bold mt-4">
                          {product?.price?.toLocaleString("en-PK", {
                            style: "currency",
                            currency: "PKR",
                            maximumFractionDigits: 0,
                          })}
                        </h3>
                        <button
                          className="btn rounded-pill btn-primary border-2 fw-bold"
                          style={{
                            width: `${110}px`,
                            fontSize: `${15}px`,
                            height: "40px",
                            paddingTop: "8px",
                            marginRight: "15px",
                          }}
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Add To Cart
                        </button>
                        <Link style={{ textDecoration: "none" }}>
                          <img
                            src="/images/paypal.png"
                            alt="paypal"
                            className="img-fluid hover"
                            style={{ height: "40px" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**-------------       TAB 3 - PRODUCT REVIEWS        ----------------- */}
              <div className="tab-pane fade" id="tab3">
                <div className="row container-fluid">
                  <div className="col-md-10 d-flex flex-column justify-content-around mt-4">
                    <h5>Customer Reviews</h5>
                    <div className="d-flex justify-content-between flex-row align-items-center mb-5">
                      <div>
                        <img
                          src="/images/reviews.png"
                          alt="reviews"
                          height={"20px"}
                          style={{ cursor: "pointer" }}
                        />

                        <Link className="ms-4">
                          Be the first to write a review.
                        </Link>
                      </div>
                      <button className="btn btn-primary">
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row container-fluid">
        {relatedProducts.length > 0 && (
          <div className="text-center">
            {" "}
            <h4 className="fw-bold text-center mb-5 ">
              Similar Products <GiArrowDunk />
            </h4>
          </div>
        )}
        <div className="row row-cols-4">
          {relatedProducts?.map((p) => (
            <div className="card ms-4 mb-4" style={{ width: "300px" }}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{p?.name}</h5>
                <p className="card-text">
                  {p?.description.substring(0, 25)}...
                </p>
                <h5 className="card-text fw-bold">
                  {p.price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    maximumFractionDigits: 0,
                  })}
                </h5>
                <div className="btn-group d-flex flex-row justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleAddToCart(e, p)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                      window.scrollTo(0, 40);
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
