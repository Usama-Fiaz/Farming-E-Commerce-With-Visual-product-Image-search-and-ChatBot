import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh" /* Vertical centering */,
    background: "#f0f0f0" /* Light gray background */,
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    textAlign: "center",
    borderRadius: 10 /* Rounded corners */,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "blue" /* Blue button */,
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#3e8e41" /* Dark green on hover */,
    },
  },
}));

function OrderDelivery() {
  let navigate = useNavigate(); // Navigator

  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Name validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      setNameError("Enter only alphabets");
      return;
    } else {
      setNameError("");
    }

    // Phone validation
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Enter only numbers");
      return;
    } else {
      setPhoneError("");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    if (!name || !address || !phone || !email || !comments) {
      toast.error("Please fill out all fields before placing your order.");
    } else {
      // place order logic here
      navigate("/placed-order");
      console.log("Order placed!");
    }
  };

  return (
    <>
      <div className={classes.root}>
        <ToastContainer />
        <Paper className={classes.paper}>
          <h5>Shipping information</h5>
          <form>
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Address"
              type="text"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!phoneError}
              helperText={phoneError}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Comments"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
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
                  background:
                    "linear-gradient(135deg, #388E3C 30%, #1B5E20 90%)",
                },
              }}
            >
              Place Order
            </Button>
          </form>
        </Paper>
      </div>
      <Footer />
    </>
  );
}

export default OrderDelivery;
