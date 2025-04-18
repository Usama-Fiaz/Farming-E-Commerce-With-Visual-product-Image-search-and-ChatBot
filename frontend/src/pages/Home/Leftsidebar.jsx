import React, { useState } from "react";
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
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import StoreIcon from "@mui/icons-material/Store";
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "../../components/Cart/Cart";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CalculateIcon from "@mui/icons-material/Calculate";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "red",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  link: {
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    border: "1px solid white",
  },
  button: {
    color: "#ffffff",
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  List: {
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    border: "1px solid white",
  },
  listItemHover: {
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));
function App() {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {openDrawer ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="close"
              onClick={handleDrawerClose}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={classes.title}>
            <Link to="/">Farming E-Commerce</Link>
          </Typography>
          <Link to="/login" className={classes.link}>
            <Button color="inherit" className={classes.button}>
              <LoginIcon /> Login
            </Button>
          </Link>

          <Link to="/register" className={classes.link}>
            <Button color="inherit" className={classes.button}>
              <StoreIcon /> Account Signup
            </Button>
          </Link>

          <Link onClick={() => setOpen(!open)} className={classes.link}>
            <Button color="inherit" className={classes.button}>
              <ShoppingCartOutlinedIcon />
              Cart {products.length}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      {open && <Cart />}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>
            <Link to={`/ImageSearch`} className={classes.link}>
              <ListItem
                button
                key="ImageSearch"
                className={classes.listItemHover}
              >
                <ListItemIcon>
                  <ImageSearchIcon />
                </ListItemIcon>
                <ListItemText primary="VisualSearch" />
              </ListItem>
            </Link>

            <Link to={`/RoomVisualizer`} className={classes.link}>
              <ListItem
                button
                key="Room Visualizer"
                className={classes.listItemHover}
              >
                <ListItemIcon>
                  <CalculateIcon />
                </ListItemIcon>
                <ListItemText primary="Room Visualizer" />
              </ListItem>
            </Link>

            <Link to={`/CostEstimator/TileCalculate`} className={classes.link}>
              <ListItem
                button
                key="tiles Cost Estimator"
                className={classes.listItemHover}
              >
                <ListItemIcon>
                  <CalculateIcon />
                </ListItemIcon>
                <ListItemText primary="Tiles CostEstimator" />
              </ListItem>
            </Link>

            <Link
              to={`/CostEstimator/BricksCalculate`}
              className={classes.link}
            >
              <ListItem
                button
                key="bricks Cost Estimator"
                className={classes.listItemHover}
              >
                <ListItemIcon>
                  <CalculateIcon />
                </ListItemIcon>
                <ListItemText primary="Bricks CostEstimator" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container maxWidth="lg"></Container>
      </main>
    </div>
  );
}

export default App;
