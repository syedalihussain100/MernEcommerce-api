import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { BiMouseAlt } from "react-icons/bi";
import Product from "./ProductCard";
import Metadata from "../Layout/Metadata";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, toast]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"ECOMMERCE"} />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Scroll <BiMouseAlt />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            <>
              {products && products
                ? products.map((product) => (
                    <Product product={product} key={product?._id} />
                  ))
                : "Some Problem"}
            </>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default Home;
