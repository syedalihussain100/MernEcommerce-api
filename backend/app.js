const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileupload = require("express-fileupload");
const corsOptions = require("./config/corsOptions");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoute");
const payment = require("./routes/PaymentRoute");

//middleware start
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(fileupload());

//routes calling
app.use(`/api/v1`, productRoute);
app.use(`/api/v1`, userRoute);
app.use(`/api/v1`, orderRoute);
app.use(`/api/v1`, payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);

app.use("*", (req, res) => {
  res.status(500).send({ message: "Not Found" });
});

module.exports = app;
