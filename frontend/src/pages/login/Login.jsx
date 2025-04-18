import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import "./login.css";
import backgroundImage from "./login-bg-img.jpg";
import { storeToken } from "../../services/LocalStorageService"; // Import the storeToken function
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/CircularLoader";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true when login button is clicked
      const response = await axios.post("http://127.0.0.1:8000/Login_api/", {
        username: formData.username,
        password: formData.password,
      });
      if (response.data.is_customer || response.data.is_vendor) {
        toast.success("Login Successful", { autoClose: 2000 });
        storeToken(response.data.tokens.access);
        setTimeout(() => {
          navigate(response.data.is_vendor ? "/VendorDashboard" : "/");
          setLoading(false);
        }, 1300);
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log("Error", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader size={100} />
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <ToastContainer />
            <Container
              maxWidth="lg"
              className="py-0"
              sx={{
                minHeight: "100vh", // Full viewport height
                display: "flex", // Enables flexbox
                alignItems: "center", // Centers vertically
                justifyContent: "center", // Centers horizontally
              }}
            >
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  item
                  xs={12}
                  className="d-flex justify-content-center"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.1)",
                      padding: "40px",
                      borderRadius: "10px",
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="h4"
                      className="mb-4"
                      gutterBottom
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Login
                    </Typography>
                    <TextField
                      fullWidth
                      label="User Name"
                      variant="outlined"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mb-4"
                      InputLabelProps={{ style: { color: "white" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white !important",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mb-4"
                      InputLabelProps={{ style: { color: "white" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white !important",
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    />
                    <div className="d-flex justify-content-between mb-4">
                      <Link
                        to="/forgotPassword"
                        className="link-style"
                        style={{ color: "white" }}
                      >
                        Forgot Password
                      </Link>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleLogin}
                      className="mb-4"
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        "&:hover": {
                          backgroundColor: "#cccccc",
                        },
                      }}
                    >
                      Sign in
                    </Button>
                    <Typography
                      variant="body1"
                      align="center"
                      style={{ color: "white" }}
                    >
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="link-style mx-1"
                        style={{ color: "#0f0", fontWeight: "bold" }}
                      >
                        Register
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Login;
