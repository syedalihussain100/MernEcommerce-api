import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Webfont from "webfontloader";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/Layout/About/About";
import ProductDetails from "./Components/Product/productDetails";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";
import LoginSignup from "./Components/User/LoginSignup";
import { loadUser } from "./actions/userAction";
import Profile from "./Components/User/Profiles";
import UserOption from "./Components/Layout/Header/UserOption";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgetPassword from "./Components/User/ForgetPassword";
//import Protected from "./Components/Route/Protected";
import ResetPassword from "./Components/User/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import Payment from "./Components/Cart/Payment";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrders from "./Components/Order/MyOrders.js";
import OrderDetail from "./Components/Order/OrderDetail";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProductList from "./Components/Dashboard/ProductList";
import NewProduct from "./Components/Dashboard/NewProduct";
import UpdateProduct from "./Components/Dashboard/UpdateProduct";
import OrderList from "./Components/Dashboard/OrderList";
import ProcessOrder from "./Components/Dashboard/ProcessOrder";
import UserList from "./Components/Dashboard/UserList";
import UpdatedUser from "./Components/Dashboard/UpdatedUser";
import ProductReviews from "./Components/Dashboard/ProductReviews";
import Contact from "./Components/Layout/Contact/Contact";
import NotFound from "./Components/Layout/NoteFound/NotFound";
import { ProtectedRoute } from "protected-route-react";
import Store from "./store";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      <ToastContainer />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              redirect="/login"
            />
          }
        >
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route
            path="/process/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Route>
        {/*  */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === "admin"}
              redirectAdmin="/account"
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/user/:id" element={<UpdatedUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>

        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
