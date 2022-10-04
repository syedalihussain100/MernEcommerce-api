import React, { Fragment, useState, useEffect } from "react";
import "./ForgetPassword.css";
import { MailOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader/Loader";
import Metadata from "../Layout/Metadata";

const ForgetPassword = () => {
  const { error, message, loading } = useSelector(
    (state) => state.forgetPassword
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgetPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, toast, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="forgotPasswordContainer">
            <Metadata title="Forget Password" />
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgetPassword;
