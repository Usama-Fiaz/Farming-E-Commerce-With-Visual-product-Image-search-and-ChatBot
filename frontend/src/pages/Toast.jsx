import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";

const CustomToast = ({ message }) => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    >
      <Alert severity="info" onClose={toast.dismiss}>
        {message}
      </Alert>
    </ToastContainer>
  );
};

export default CustomToast;