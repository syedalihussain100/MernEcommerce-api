import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  AdminproductReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducer/productReducer";
import {
  allUserReducer,
  forgetPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  newOrderReducer,
  myOrderReducer,
  getSingleOrder,
  allOrderReducer,
  orderReducer,
} from "./reducer/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  singleOrder: getSingleOrder,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  admin_delete_update: AdminproductReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  allUsers: allUserReducer,
  userDetail: userDetailsReducer,
  productReview: productReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
