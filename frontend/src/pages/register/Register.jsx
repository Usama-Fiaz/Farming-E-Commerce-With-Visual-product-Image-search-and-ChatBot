import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./vendorRegister.webp";
import logo1 from "./customerRegister.webp";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../login/background-register.jpg";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    Business_name: "",
    Business_phone: "",
    Business_address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear the corresponding error when the user starts typing in a field
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: null,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (formData.password !== formData.password2) {
      errors.password2 = "Passwords do not match";
    }

    if (!formData.Business_name.trim()) {
      errors.Business_name = "Business Name is required";
    }

    if (!formData.Business_phone.trim()) {
      errors.Business_phone = "Business Phone is required";
    } else if (!/^\d+$/.test(formData.Business_phone)) {
      errors.Business_phone = "Business Phone must contain only numbers";
    }

    if (!formData.Business_address.trim()) {
      errors.Business_address = "Business Address is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/shopvendor/register/",
          formData
        );
        toast.success("Registration Successful");
      } catch (error) {
        toast.error("Registration Failed");
        console.error("Error:", error);
      }
    }
  };

  const styles = {
    paper: {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "16px",
    },
    tab: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    gridContainer: {
      justifyContent: "center",
    },
  };

  return (
    <Box sx={{ backgroundColor: "#C7DB9C" }}>
      {/* style={{ backgroundImage: `url(${backgroundImage})` }}> */}
      <Navbar />
      <Container sx={{ marginTop: "20px" }}>
        <Paper
          variant="outlined"
          square
          className="mb-4"
          style={styles.paper}
          sx={{ background: "#FBF6EE", padding: "30px" }}
        >
          <Tabs
            value={1}
            centered
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#4CAF50" }, // Custom indicator color
              "& .MuiTab-root": {
                color: "#4CAF50 !important",
                fontWeight: "bold",
              }, // Default text color
              "& .Mui-selected": {
                color: "#4CAF50 !important",
                fontWeight: "bold",
              }, // Selected tab color
            }}
          >
            <Tab
              label="Customer Register"
              component={Link}
              to="/Customerregister"
              style={styles.tab}
            />
            <Tab
              label="Vendor Register"
              component={Link}
              to="/register"
              style={styles.tab}
            />
          </Tabs>
        </Paper>
      </Container>
      <ToastContainer />
      <Grid
        container
        spacing={3}
        mb={2}
        alignItems="center"
        justifyContent="center"
        className="mt-3 py-0 mx-auto"
        sx={{
          width: "90%",
          background: "#FBF6EE",
          padding: "30px 0px",
          borderRadius: "10px",
          color: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          ...styles.gridContainer,
        }}
      >
        <Grid item xs={12} md={6} className="d-flex justify-content-center p-0">
          <img
            src={logo}
            alt="Phone"
            className="img-fluid"
            style={{
              width: "100%",
              height: "640px",
              borderRadius: "10px 0px 0px 10px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className="d-flex justify-content-center py-2"
        >
          <Container>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "black",
                  fontSize: "28px",
                  color: "#4CAF50",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                mb={4}
              >
                Vendor Register
              </Typography>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!formErrors.username}
                helperText={formErrors.username}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                error={!!formErrors.password2}
                helperText={formErrors.password2}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                name="Business_name"
                value={formData.Business_name}
                onChange={handleChange}
                error={!!formErrors.Business_name}
                helperText={formErrors.Business_name}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Business Phone"
                variant="outlined"
                name="Business_phone"
                value={formData.Business_phone}
                onChange={handleChange}
                error={!!formErrors.Business_phone}
                helperText={formErrors.Business_phone}
                className="mb-2"
              />
              <TextField
                fullWidth
                label="Business Address"
                variant="outlined"
                name="Business_address"
                value={formData.Business_address}
                onChange={handleChange}
                error={!!formErrors.Business_address}
                helperText={formErrors.Business_address}
                className="mb-2"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                className="mb-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #4CAF50 30%, #2E7D32 90%)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #388E3C 30%, #1B5E20 90%)",
                  },
                }}
              >
                Register
              </Button>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: "black" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  component="span" // Ensures Link does not inherit unwanted styles
                  sx={{
                    color: "#388E3C !important",
                    textDecoration: "none", // Removes underline
                    "&:hover": { textDecoration: "underline" }, // Optional: Add underline on hover
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Register;
