import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Layout/Metadata";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "./SideBar";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { DELETE_USER_RESET } from "../../constants/userConstant";
import { allUsers, deleteUser } from "../../actions/userAction";
import { clearErrors } from "../../actions/productActions";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: Deleteerror,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (Deleteerror) {
      toast.error(Deleteerror);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(allUsers());
  }, [dispatch, error, Deleteerror, toast, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item?._id,
        role: item?.role,
        email: item?.email,
        name: item?.name,
      });
    });
  return (
    <Fragment>
      <Metadata title={`ALL USERS - ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL USERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
