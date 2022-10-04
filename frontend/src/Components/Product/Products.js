import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@mui/material";

const categories = [
  "Dells laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productCount, currentPage } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPages, price, category, ratings));
  }, [dispatch, keyword, currentPages, price, category, ratings]);

  const setCurrentPageNo = (e) => {
    setCurrentPages(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="footer_handling">
          <div>
            <h2 className="productHeading">Products</h2>
            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard product={product} key={product?._id} />
                ))}
            </div>

            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
                color="primary"
              />
              <Typography>Categories</Typography>
              <ul className="CategoryBox">
                {categories.map((category) => (
                  <li
                    className="category_link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {currentPage < productCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPages}
                  itemsCountPerPage={currentPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
