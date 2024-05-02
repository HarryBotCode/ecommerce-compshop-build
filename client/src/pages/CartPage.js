import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { IoIosArrowForward } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price * item.quantity; // Consider the quantity
      });
      return total.toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //delete all items
  const removeAllCartItems = () => {
    try {
      // Set cart to an empty array
      setCart([]);

      // Update localStorage to reflect the empty cart
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Update local storage with the latest cart data
      localStorage.setItem("cart", JSON.stringify(cart));

      // Request payment method from the client
      const { nonce } = await instance.requestPaymentMethod();

      // Send payment data to your server
      const { data } = await axios.post(
        "/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );

      // Clear cart data after a successful payment
      localStorage.removeItem("cart");
      setCart([]);

      // Navigate to the orders page
      navigate("/dashboard/user/orders");

      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //increment cart items
  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setCart(updatedCart);
  };

  //decrement cart items
  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setCart(updatedCart);
  };

  const calculateTotal = (product) => {
    return product.price * product.quantity;
  };
  return (
    <Layout>
      <div className="cart-page">
        {/* <div className="row container-fluid">
          <div className="col-md-12 ">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div> */}

        <div className="row container-fluid">
          {cart?.length ? (
            <>
              <div className="mt-2 ms-2">
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
                  to={"/login"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </div>
              <div className="col-md-8">
                <h4 className="fw-bold mt-3 p-1">Shopping Cart</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th></th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            height={"100px"}
                            style={{ marginRight: "-60px" }}
                          />
                        </td>
                        <td
                          className="col-md-4 p-3"
                          style={{ fontSize: "14px" }}
                        >
                          {p.description.substring(0, 105)}
                        </td>

                        <td className="fw-bold pt-4 text-center">{p.price}</td>
                        <td className="fw-bold pt-4 text-center">
                          <button
                            className="btn"
                            onClick={() => decrementQuantity(p._id)}
                          >
                            -
                          </button>
                          {p.quantity} {/* Display quantity here */}
                          <button
                            className="btn"
                            onClick={() => incrementQuantity(p._id)}
                          >
                            +
                          </button>
                        </td>
                        <td className="fw-bold pt-4 text-center">{calculateTotal(p)}</td>
                        <td>
                          <button
                            className="btn pt-3 border-0"
                            onClick={() => removeCartItem(p._id)}
                          >
                            <SlClose
                              style={{ fontSize: "20px", color: "grey" }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-outline-dark rounded-pill ms-3"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={removeAllCartItems}
                  className="btn btn-dark rounded-pill ms-3"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="text-center me-5 mt-1 bg-none">
                  <img
                    src="/images/empty-cart.png"
                    height={"200px"}
                    style={{ marginRight: "50px" }}
                    alt=""
                  />
                  <h2 className="fw-bold mt-3" style={{ fontSize: "50px" }}>
                    Your Cart is{" "}
                    <span style={{ color: "#e63946" }}>Empty!</span>{" "}
                  </h2>
                  <p style={{ marginTop: "-20px" }}>
                    Must add items on the cart before you proceed to checkout.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-danger rounded-pill border-0"
                    style={{ height: "40px", width: "160px" }}
                  >
                    RETURN TO SHOP
                  </button>
                </div>
              </div>
            </>
          )}

          {cart?.length ? (
            <>
              <div
                className="col-md-4 p-5 mb-5"
                style={{ backgroundColor: "#f5f7ff" }}
              >
                <h3 className="fw-bold">Summary</h3>
                <p>Estimate Shipping and Tax</p>

                <p>Apply Discount Code</p>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Subtotal </p>
                  <p className="fw-bold"> {totalPrice()} </p>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="">
                    <p className="fw-bold">Shipping </p>
                    <p
                      className=""
                      style={{
                        width:"220px",
                        fontSize: "12px",
                        color: "grey",
                        marginTop: "-10px",
                      }}
                    >
                      (Standard Rate - Price may vary depending on the
                      item/destination, TECS Staff will contact you.){" "}
                    </p>
                  </div>
                  <p className="fw-bold"> Free Shipping </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Tax </p>
                  <p className="fw-bold">Rs 0.00 </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">GST (10%) </p>
                  <p className="fw-bold">Rs 0.00 </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="fw-bold">Order Total </p>
                  <p className="fw-bold" style={{ fontSize: "22px" }}>
                    {" "}
                    {totalPrice()}{" "}
                  </p>
                </div>
                <hr />
                <div className="mt-2">
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn rounded-pill btn-primary border-2 w-100"
                        style={{
                          fontSize: `${15}px`,
                          height: "50px",
                          paddingTop: "8px",
                          marginRight: "15px",
                          fontSize: "18px",
                        }}
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing...." : "Proceed to Checkout"}
                      </button>
                    </>
                  )}
                </div>
                <div>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3 mt-3">
                        <button
                          className="btn rounded-pill btn-warning border-2 w-100"
                          style={{
                            fontSize: `${15}px`,
                            height: "50px",
                            paddingTop: "8px",
                            marginRight: "15px",
                            fontSize: "18px",
                          }}
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn rounded-pill btn-warning border-2 w-100"
                          style={{
                            fontSize: `${15}px`,
                            height: "50px",
                            paddingTop: "8px",
                            marginRight: "15px",
                            fontSize: "18px",
                          }}
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn rounded-pill btn-warning border-2 w-100"
                          style={{
                            fontSize: `${15}px`,
                            height: "50px",
                            paddingTop: "8px",
                            marginRight: "15px",
                            fontSize: "18px",
                          }}
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Plase Login to checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
