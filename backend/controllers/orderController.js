const { OrderModel } = require("../model/Order");
const { Productmodel } = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create new Order

exports.newOrder = catchAsyncError(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order here

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("order not found for this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user Orders

exports.myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// admin check all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order status  => Admin
exports.updateOrdersStatus = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // order.orderItems.forEach(async (order) => {
  //   await updateStock(order.product, order.quantity);
  // });

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Productmodel.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//delete order status ===> Admin

exports.deleteOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
