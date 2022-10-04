const { Productmodel } = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/Apifeatures");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Productmodel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get product
exports.getAllproducts = catchAsyncError(async (req, res, next) => {
  const currentPage = 8;
  const productCount = await Productmodel.countDocuments({});
  let apifeature = new Apifeatures(Productmodel.find(), req.query)
    .search()
    .filter()
    .pagination(currentPage);
  let products = await apifeature.query;

  res.status(200).json({ success: true, products, productCount, currentPage });
});

// update product
exports.productUpdate = catchAsyncError(async (req, res, next) => {
  let product = await Productmodel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images for Cloudinary here
    for (let i = 0; i < images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Productmodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// product_id
exports.productgetId = catchAsyncError(async (req, res, next) => {
  let product = await Productmodel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

// delete product

exports.productDelete = catchAsyncError(async (req, res, next) => {
  let product = await Productmodel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  // Deleting Images from Cloudinary

  for (let i = 0; i < product.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Delete Successfully" });
});

// create new review or update review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Productmodel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // 4,5,2,3,6 ===> total here

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of product

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Productmodel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Productmodel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  //  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Productmodel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
});

// Get All Product Product Admin

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Productmodel.find();

  res.status(200).json({
    success: true,
    products,
  });
});
