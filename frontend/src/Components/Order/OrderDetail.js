import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Layout/Metadata";
import Loader from "../Layout/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";

const OrderDetail = () => {
  const { loading, error, order } = useSelector((state) => state.singleOrder);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, toast, params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order?._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <div>
                    <p>Name:</p>
                    <span>{order?.user && order?.user?.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order?.shippingInfo && order?.shippingInfo?.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address</p>
                    <span>
                      {order?.shippingInfo &&
                        `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, ${order?.shippingInfo?.country}`}
                    </span>
                  </div>
                </div>
                <Typography className="payment">Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.paymentInfo &&
                        order?.paymentInfo?.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.paymentInfo &&
                      order?.paymentInfo?.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div style={{ display: "flex", margin: "0 1rem" }}>
                    <p>Amount:</p>
                    <span>{order?.totalPrice && order?.totalPrice}</span>
                  </div>
                </div>
                <Typography className="payment">Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.orderStatus && order?.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.orderStatus && order?.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <div key={item?.product}>
                        <img src={item?.image} alt="Product" />
                        <Link to={`/product/${item?.product}`}>
                          {item?.name}
                        </Link>
                        <span>
                          {item?.quantity} x Rs{item?.price} =
                          <b>Rs{item?.price * item?.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetail;
