import React, { useState } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import Axios from "axios";

import { getToken } from "../../services/LocalStorageService.js";
import { removeToken } from "../../services/LocalStorageService.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} from "../../redux/cartReducer";

const Cart = () => {
  let navigate = useNavigate(); // Navigator
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false); // Add processing state

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const Tomove = async () => {
    navigate("/OrderDelivery");
  };

  const handlePayment = async () => {
    try {
      if (processing) return; // Check if payment is already being processed
      setProcessing(true); // Set processing state to true
      console.log("customer order product:", products);

      const res = await Axios.post(
        "http://127.0.0.1:8000/order/CreateProductOrder/",
        {
          products,
        },
        config
      );

      toast.success(
        "Thank you for shopping Farming E-Commerce. Your order is confirmed."
      );
      dispatch(resetCart());
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Error: Bad Request" + error.message);
      } else if (error.response.status === 401) {
        toast.error(
          "If you already have an account, please log in. Otherwise, please register on the website."
        );
        removeToken();
        navigate("/login");
      } else if (error.response.status === 500) {
        toast.error("Backend server error :" + error.message);
      } else {
        toast.error("Some other error Occured : " + error.message);
      }
    } finally {
      setProcessing(false); // Reset processing state to false
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        position: "absolute",
        right: 15,
        top: 30,
        zIndex: 999,
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 0px 7px -5px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Shopping Cart
      </Typography>

      {products.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            p: 2,
            boxShadow: 1,
          }}
        >
          {/* Product Image */}
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: 70,
              height: 70,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />

          {/* Product Details */}
          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.color}
            </Typography>
          </CardContent>

          {/* Quantity Controls */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
            <IconButton
              size="small"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Price */}
          <Typography
            sx={{ fontWeight: "bold", width: 80, textAlign: "right" }}
          >
            £ {item.price}
          </Typography>

          {/* Actions: Heart & Delete */}
          <IconButton
            size="small"
            color="error"
            onClick={() => dispatch(removeItem(item.id))}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Card>
      ))}

      {/* Checkout Button */}
      {products.length > 0 && (
        <Button
          onClick={Tomove}
          disabled={processing}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            background: "linear-gradient(135deg, #4CAF50 30%, #2E7D32 90%)",
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #388E3C 30%, #1B5E20 90%)",
            },
          }}
        >
          Checkout
        </Button>
      )}
    </Box>
  );
};

export default Cart;
