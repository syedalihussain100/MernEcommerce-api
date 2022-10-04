import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Metadata from "../Layout/Metadata";
import Loader from "../Layout/Loader/Loader";
import Sidebar from "./SideBar";
import { MailOutline, PersonOutline, VerifiedUser } from "@mui/icons-material";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import { useNavigate, useMatch } from "react-router-dom";
import {
  getDetailsUser,
  updateUser,
  clearErrors,
} from "../../actions/userAction";

const UpdatedUser = () => {
  const { loading, error, user } = useSelector((state) => state.userDetail);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch("/admin/user/:id");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user?._id !== userId) {
      dispatch(getDetailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, toast, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <Metadata title={`UPDATE USER - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
              >
                <h1>Update User</h1>

                <div>
                  <PersonOutline />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <VerifiedUser />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                >
                  Update
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatedUser;
