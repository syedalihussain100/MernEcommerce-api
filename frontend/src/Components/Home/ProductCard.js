import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {Rating} from "@mui/material"


function Product({ product }) {
  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      <LazyLoadImage
        src={product?.images[0]?.url}
        alt={product?.name}
        effect="blur"
        height="230px"
        // width="100%"
        delayTime="300"
        delayMethod="debounce"
      />
      <p>{product?.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span>({product?.numOfReviews} Reviews)</span>
      </div>
      <span>{`Rs: ${product?.price}`}</span>
    </Link>
  );
}

export default Product;
