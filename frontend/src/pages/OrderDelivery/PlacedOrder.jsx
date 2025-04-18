import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Link,
  Button,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartReducer";
import Axios from "axios";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderCart = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const handlePayment = async () => {
    if (processing) return;
    setProcessing(true);
    console.log("sama products : ", products);

    try {
      const res = await Axios.post(
        "http://127.0.0.1:8000/order/CreateProductOrder/",
        { products },
        config
      );

      console.log("sama res : ", res);

      setTimeout(() => {
        toast.success("Your order has been confirmed! Thank you for shopping.");
      }, 2000);
      dispatch(resetCart());
    } catch (error) {
      const errorMessage =
        error.response?.status === 401
          ? "⚠️ Please log in or register before placing an order."
          : `❌ Error: ${error.message}`;
      toast.error(errorMessage);

      if (error.response?.status === 401) {
        removeToken();
        navigate("/login");
      }
    } finally {
      setProcessing(false);
    }
  };

  const totalBill = products.reduce(
    (acc, product) => acc + product.totalbill,
    0
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F1F8E9, #E8F5E9)",
        py: 4,
      }}
    >
      <ToastContainer />

      <Card
        sx={{
          width: "90%",
          maxWidth: "900px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            background: "linear-gradient(135deg, #388E3C, #2E7D32)",
            color: "white",
            py: 2,
            fontWeight: "bold",
          }}
        >
          🛒 Your Shopping Cart
        </Typography>

        <CardContent sx={{ p: 3 }}>
          {products.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              Your cart is empty. Start adding products! 🚀
            </Typography>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{ borderRadius: "8px", overflow: "hidden" }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#F1F8E9" }}>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{ "&:hover": { backgroundColor: "#FAFAFA" } }}
                      >
                        <TableCell align="center">
                          <Link href={`/product/${product.id}`}>
                            <Avatar
                              src={product.img}
                              alt={product.title}
                              sx={{ width: 60, height: 60, mx: "auto" }}
                            />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            href={`/product/${product.id}`}
                            style={{
                              textDecoration: "none",
                              color: "#388E3C",
                              fontWeight: "bold",
                            }}
                          >
                            {product.title}
                          </Link>
                        </TableCell>
                        <TableCell align="center">£ {product.price}</TableCell>
                        <TableCell align="center">{product.quantity}</TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: "bold", color: "#2E7D32" }}
                        >
                          £ {product.totalbill}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  £ {totalBill}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  color: "white",
                  borderRadius: 3,
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(135deg, #388E3C, #1B5E20)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? "Processing..." : "Proceed To Checkout"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCart;
