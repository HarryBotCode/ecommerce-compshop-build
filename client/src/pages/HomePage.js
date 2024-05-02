import React, { useState, useEffect, useCallback  } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import "../styles/Homepage.css";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import { FaGripHorizontal } from "react-icons/fa";
import { LuAlignLeft } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
  TbSortDescendingLetters,
  TbSortAscendingLetters,
} from "react-icons/tb";

const override = css`
  margin-top: 20px;
  margin-bottom: 20px;
  border-color: blue; // Choose the color you want
`;

const HomePage = () => {
 

  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("vertical");
  const [categoryClicked, setCategoryClicked] = useState("unclicked");
  const [radioClicked, setRadioClicked] = useState("unclicked");
  const [brands, setBrands] = useState("unclicked");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortPriceOrder, setSortPriceOrder] = useState("");

  //sort products NAME from asc order
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  //sort products PRICE from asc order
  const handlePriceSort = (criteria) => {
    setSortCriteria(criteria);
    setSortPriceOrder((prevOrder) => (prevOrder === "asce" ? "desce" : "asce"));
  };

  //SORTED PRODUCTS TO MAP
  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortCriteria === "price") {
      const priceA = a.price;
      const priceB = b.price;
      return sortPriceOrder === "asce" ? priceA - priceB : priceB - priceA;
    }

    return 0;
  });

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);
  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
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
    <Layout title={"All Products - Best offers "}>
      {/*-------------------- carousel bootstrap for banners images----------------------*/}

      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide banner-img"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="/images/banner2.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src="/images/banner4.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src="/images/banner5.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>
      {/* banner image end*/}

      <div className="row container-fluid home-page">
        {/*-------------------   SIDE PANEL / HOME MENU  -----------------------------------*/}

        <div className="col-md-2 filters">
          <div className="background">
            <h5 className="pt-4 mt-0 text-center fw-bold">Filters</h5>
            <h6 className="mt-4 p-2 fw-bold d-flex justify-content-between">
              Category{" "}
              <span>
                {categoryClicked === "clicked" ? (
                  <IoMdArrowDropup
                    onClick={() => setCategoryClicked("unclicked")}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <IoMdArrowDropdown
                    onClick={() => setCategoryClicked("clicked")}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                )}
              </span>
            </h6>

            {/* ------CATEGORY FILTER MENU------- */}
            {categoryClicked === "clicked" && (
              <>
                {categories?.map((c) => (
                  <div className="d-flex flex-column">
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c?.name}
                    </Checkbox>
                  </div>
                ))}
              </>
            )}

            {/* ------PRICE RANGE FILTER MENU------- */}
            <h6
              className="mt-2 p-2 fw-bold d-flex justify-content-between"
              // style={{ background: "#022e4c", color: "white" }}
            >
              Price Range{" "}
              <span>
                {radioClicked === "clicked" ? (
                  <IoMdArrowDropup
                    onClick={() => setRadioClicked("unclicked")}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <IoMdArrowDropdown
                    onClick={() => setRadioClicked("clicked")}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                )}
              </span>
            </h6>
            <div className="d-flex flex-column">
              {radioClicked === "clicked" && (
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p?.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              )}
            </div>
            <div className="d-flex flex-column">
              {(categoryClicked === "clicked" ||
                radioClicked === "clicked") && (
                <div className="text-center">
                  <button
                    className="btn rounded-pill btn-outline-primary mt-4 mb-4"
                    style={{ height: "35px", width: "110px", fontSize: "13px" }}
                    onClick={() => window.location.reload()}
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="background">
            <h5 className="pt-4 mt-2 text-center fw-bold">Brands</h5>

            <div className="text-center">
              <button
                className="btn btn-outline-secondary rounded-pill mt-2 mb-2 w-50"
                style={{ height: "34px" }}
                onClick={() => setBrands("clicked")}
              >
                All Brands
              </button>
            </div>
            {brands === "clicked" && (
              <div className="row text-center mt-2 p-1">
                <div className="col-md-6 mb-4">
                  <img src="/images/roccat.png" height={"40px"} alt=""/>
                  <img
                    src="/images/thermaltake.png"
                    height={"40px"}
                    className="mt-2"
                    alt=""
                  />
                  <img
                    src="/images/hewlet.png"
                    height={"40px"}
                    className="mt-2"
                    alt=""
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <img src="/images/msi.png" height={"40px"} alt=""/>
                  <img
                    src="/images/adata.png"
                    height={"40px"}
                    className="mt-2"
                    alt=""
                  />
                  <img
                    src="/images/roccat.png"
                    height={"40px"}
                    className="mt-2"
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
          <div className="background">
            <h5 className="text-center mt-2 pt-4 fw-bold">Compare Products</h5>
            <div className="text-center pb-3">
              <p>You have no items to compare.</p>
            </div>
          </div>
          <div className="background">
            <h5 className="text-center mt-2 pt-4 fw-bold">My Wish List</h5>
            <div className="text-center pb-3">
              <p>You have no items in your wish list.</p>
            </div>
          </div>
          <div>
            <div className="text-center pb-3">
              <img src="/images/ads.png" className="mt-3 w-100" />
            </div>
          </div>
        </div>

        {/*-------------------  PRODUCTS LISTING/MAPPING   ----------------------------------*/}

        <div className="col-md-10">
          <div className="d-flex justify-content-between flex-row mt-3 mb-3 align-items-center">
            {/*--------NAVIGATION -------- */}
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
            </div>

            {/*---------FILTER BY A-Z / 0-9 / VERTICAL TO HORIZONTAL / HORIZONTAL TO VERTICAL--------------*/}
            <div className="">
              <FaGripHorizontal
                onClick={() => setSelectedIcon("horizontal")}
                style={{
                  fontSize: "30px",
                  marginRight: "15px",
                  cursor: "pointer",
                  opacity: selectedIcon === "horizontal" ? 1 : 0.5,
                }}
              />
              <LuAlignLeft
                onClick={() => setSelectedIcon("vertical")}
                style={{
                  fontSize: "30px",
                  marginRight: "15px",
                  cursor: "pointer",
                  opacity: selectedIcon === "vertical" ? 1 : 0.5,
                }}
              />
              {sortOrder === "asc" ? (
                <TbSortDescendingLetters
                  onClick={() => handleSort("name")}
                  style={{
                    cursor: "pointer",
                    fontSize: "23px",
                  }}
                />
              ) : (
                <TbSortAscendingLetters
                  onClick={() => handleSort("name")}
                  style={{
                    cursor: "pointer",
                    fontSize: "23px",
                  }}
                />
              )}
              {sortPriceOrder === "asce" ? (
                <TbSortAscendingNumbers
                  onClick={() => handlePriceSort("price")}
                  style={{
                    cursor: "pointer",
                    fontSize: "23px",
                    marginLeft: "10px",
                  }}
                />
              ) : (
                <TbSortDescendingNumbers
                  onClick={() => handlePriceSort("price")}
                  style={{
                    cursor: "pointer",
                    fontSize: "23px",
                    marginLeft: "10px",
                  }}
                />
              )}
            </div>
          </div>

          {/*---------------------- HORIZONTAL TAB------------------------------ */}
          {selectedIcon === "horizontal" && (
            <>
              <div className="row row-cols-4">
                {sortedProducts.map((s) => (
                  <Link to={`/product/${s.slug}`} className="remove-link-style">
                    <div
                      key={s._id}
                      className="card mb-4 mt-2 border-0"
                      style={{ width: "270px" }}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${s._id}`}
                        className="horz-top"
                        alt={s.name}
                      />
                      <div className="card-body">
                        <div className="d-flex flex-row text-start mb-3">
                          <div>
                            <img
                              src="/images/stars.png"
                              className="img-fluid me-4"
                              alt=""
                            />{" "}
                            <span style={{ color: "grey" }}> Reviews(3)</span>
                          </div>
                        </div>

                        <h5
                          className="card-title fw-bold"
                          style={{ fontSize: "18px" }}
                        >
                          {s?.name}
                        </h5>
                        <p className="card-text">
                          {s?.description.substring(0, 25)}...
                        </p>
                        <div className="d-flex justify-content-between flex-row align-items-center">
                          {" "}
                          <h6
                            className="card-title fw-bold"
                            style={{
                              fontSize: "22px",
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                            {s?.price.toLocaleString("en-PK", {
                              style: "currency",
                              currency: "PKR",
                              maximumFractionDigits: 0,
                            })}
                          </h6>
                          <button
                            className="btn rounded-pill btn-outline-dark border-1 fw-bold"
                            style={{
                              width: `${125}px`,
                              height: `${35}px`,
                              margin: "0px",
                              padding: "0px",
                              fontSize: `${13}px`,
                            }}
                            onClick={(e) => handleAddToCart(e, s)}
                          >
                            <FiShoppingCart
                              style={{
                                fontSize: `${19}px`,
                                marginRight: `${12}px`,
                                marginBottom: `${2}px`,
                                transform: "scaleX(-1)",
                              }}
                            />
                            Add To Cart
                            {"  "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/*---------------------- VERTICAL TAB------------------------------ */}
          {selectedIcon === "vertical" && (
            <>
              <div className="row">
                {sortedProducts.map((p) => (
                  <Link key={p._id} to={`/product/${p.slug}`} className="remove-link-style">
                    <div className="card w-100 mb-4 border-0 mt-2">
                      <div className="row g-0">
                        <div className="col-md-4 d-flex flex-column align-items-center">
                          <div className="">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="img-fluid rounded-start card-img-top"
                              alt={p.name}
                            />
                          </div>
                          <div className="row mt-auto p-4">
                            <div className="col-md-6 text-center">
                              <img
                                src="/images/stars.png"
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            <div className="col-md-6" style={{ color: "grey" }}>
                              {" "}
                              Reviews(3)
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card-body d-flex flex-column justify-content-between h-100">
                            <div>
                              <h5 className="card-title mt-4 fw-bold">
                                {p?.name}
                              </h5>
                              <p
                                className="card-text"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                {p?.description.substring(0, 185)}
                              </p>
                            </div>

                            <div className="d-flex flex-column align-items-start">
                              <h4 className="card-title card-price mt-5">
                                {p?.price?.toLocaleString("en-PK", {
                                  style: "currency",
                                  currency: "PKR",
                                  maximumFractionDigits: 0,
                                })}
                              </h4>

                              <button
                                className="btn rounded-pill btn-outline-primary mt-2 border-2 fw-bold mb-4"
                                style={{
                                  width: `${150}px`,
                                  fontSize: `${15}px`,
                                }}
                                // onClick={(e) => {
                                //   e.preventDefault();
                                //   setCart([...cart, p]);
                                //   localStorage.setItem(
                                //     "cart",
                                //     JSON.stringify([...cart, p])
                                //   );
                                //   toast.success("Item Added to cart");
                                // }}
                                onClick={(e) => handleAddToCart(e, p)}
                              >
                                <FiShoppingCart
                                  style={{
                                    fontSize: `${19}px`,
                                    marginRight: `${12}px`,
                                    marginBottom: `${2}px`,
                                    transform: "scaleX(-1)",
                                  }}
                                />
                                Add To Cart
                                {"  "}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2 d-flex flex-column align-items-end p-4">
                          <div>
                            <img src="/images/In Stock.png" alt="in-stock" />
                          </div>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between">
                              <div className="ms-2">
                                <img src="/images/like.png" alt="like" />
                              </div>
                              <div className="ms-2">
                                <img src="/images/stats.png" alt="stats" />
                              </div>
                              <div className="ms-2">
                                <img src="/images/text.png" alt="text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/*------ LOAD MORE BUTTON -----*/}
          <div className="row container-fluid">
            {products && products.length < total && (
              <div className="col-md-12 mt-5 mb-5">
                <div
                  className="text-start"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <RingLoader
                      css={override}
                      size={35}
                      color={"blue"}
                      loading={loading}
                    />
                  ) : (
                    <>
                      <button
                        className="btn btn-primary rounded-pill border-0 bg-none text-center"
                        style={{ width: "100px" }}
                      >
                        More
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
