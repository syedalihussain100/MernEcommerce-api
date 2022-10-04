import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const Protected = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>{isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />}</>
      )}
    </Fragment>
  );
};

export default Protected;
