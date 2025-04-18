import React, { useState } from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Home, Store, AddCircleOutline, Logout } from "@mui/icons-material";

const SidebarItem = ({ to, icon, text, active, onClick, color }) => {
  return (
    <ListItemButton
      component={to ? Link : "button"}
      to={to}
      onClick={onClick}
      sx={{
        bgcolor: active ? "rgba(0, 0, 0, 0.05)" : "transparent",
        color: active ? "#222" : "#555",
        borderRadius: "8px",
        mb: 1,
        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.05)",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <ListItemIcon sx={{ color: color || "inherit", minWidth: "40px" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();

  let handleSubmitButton = async () => {
    removeToken();
    toast.success("Successfully Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Function to determine if a link should be active based on the current location
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{
        width: 250,
        height: "90vh",
        bgcolor: "#fff",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
        p: 2,
      }}
    >
      <ToastContainer />

      {/* Sidebar Header */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          letterSpacing: 1,
          color: "#222",
        }}
      >
        Vendor Panel
      </Typography>

      <Divider sx={{ bgcolor: "rgba(0,0,0,0.1)", mb: 2 }} />

      {/* Sidebar Menu */}
      <List sx={{ flexGrow: 1 }}>
        <SidebarItem
          to="/VendorDashboard"
          icon={<Home />}
          text="Dashboard"
          active={isActive("/VendorDashboard")}
        />
        <SidebarItem
          to="/VendorDashboard/ProductView"
          icon={<Store />}
          text="Store Products"
          active={isActive("/VendorDashboard/ProductView")}
        />
        <SidebarItem
          to="/VendorDashboard/AddProduct"
          icon={<AddCircleOutline />}
          text="Add Product"
          active={isActive("/VendorDashboard/AddProduct")}
        />
      </List>

      <Divider sx={{ bgcolor: "rgba(0,0,0,0.1)", my: 2 }} />

      {/* Logout Button */}
      <List>
        <SidebarItem
          onClick={handleSubmitButton}
          icon={<Logout />}
          text="Logout"
          color="error"
        />
      </List>
    </Box>
  );
};

export default Sidebar;
