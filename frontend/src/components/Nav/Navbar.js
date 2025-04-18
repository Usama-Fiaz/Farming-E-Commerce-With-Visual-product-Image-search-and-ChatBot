import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import StoreIcon from "@mui/icons-material/Store";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "../../components/Cart/Cart";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CalculateIcon from "@mui/icons-material/Calculate";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import CompareIcon from "@mui/icons-material/Compare";
import SellIcon from "@mui/icons-material/Sell";
import logo from "./logo.png";
import { getToken, removeToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import "./navbar.css";
// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LoginIcon from "@mui/icons-material/Login";
// import StoreIcon from "@mui/icons-material/Store";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
// import CalculateIcon from "@mui/icons-material/Calculate";
import StorefrontIcon from "@mui/icons-material/Storefront";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getToken, removeToken } from "../../services/LocalStorageService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from "./logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: "4rem",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#4CAF50", // Changed to a green farming-friendly theme
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#388E3C", // Dark green for farming feel
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer !important",
  },
  content: {
    flexGrow: 1,
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
  },
  button: {
    color: "#ffffff",
  },
  footer: {
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    maxHeight: "30px",
  },
}));

function App() {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    removeToken();
    toast.success("Successfully Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

    const cartRef = useRef(null);

  // Function to close the cart when clicking outside
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  // Attach event listener when cart is open
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={classes.root}>
      <ToastContainer />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            {openDrawer ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            sx={{
              color: "white !important",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className={classes.logo} /> Farming
            E-Commerce
          </Typography>

          {getToken() ? (
            <>
              <Button
                color="inherit"
                className={classes.button}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Link onClick={() => setOpen(!open)} className={classes.link}>
                <Button color="inherit" className={classes.button}>
                  <ShoppingCartOutlinedIcon />
                  Cart {products.length}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={classes.link}>
                <Button
                  color="inherit"
                  className={classes.button}
                  style={{ marginRight: "10px" }}
                >
                  <AccountCircleIcon style={{ marginRight: "5px" }} /> Login
                </Button>
              </Link>

              <Link to="/register" className={classes.link}>
                <Button color="inherit" className={classes.button}>
                  <HowToRegIcon style={{ marginRight: "5px" }} /> Signup
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      {open && <div ref={cartRef}>
          <Cart />
        </div>}
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar />
        <List>
          <Link to="/ImageSearch" className={`chatbot-link ${classes.link}`}>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon
                  className="chatbot-icon"
                  style={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Visual Search"
                primaryTypographyProps={{
                  style: { transition: "color 0.3s ease-in-out" },
                }}
              />
            </ListItem>
          </Link>
          <Link to="/ChatBot" className={`chatbot-link ${classes.link}`}>
            <ListItem button>
              <ListItemIcon>
                <SmartToyIcon
                  className="chatbot-icon"
                  style={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText primary="Chatbot" />
            </ListItem>
          </Link>
          {/* <Link to="/CostEstimator/TileCalculate" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <CalculateIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Cost Estimator" />
            </ListItem>
          </Link> */}
          <Link to="/ListShopvendor" className={`chatbot-link ${classes.link}`}>
            <ListItem button>
              <ListItemIcon>
                <StorefrontIcon
                  className="chatbot-icon"
                  style={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText primary="Shop Vendors" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      {/* <main className={classes.content}>
        <Toolbar />
      </main> */}
    </div>
  );
}

export default App;
