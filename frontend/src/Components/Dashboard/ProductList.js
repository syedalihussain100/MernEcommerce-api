import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../Layout/Metadata";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Sidebar from "./SideBar";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.admin_delete_update
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [error, toast, dispatch, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() => DeleteProduct(params.getValue(params.id, "id"))}
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  console.log("rows", rows);

  products &&
    products.forEach((item) => {
      rows.push({
        id: item?._id,
        stock: item?.stock,
        price: item?.price,
        name: item?.name,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`ALL PRODUCTS - ADMIN`} />
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
