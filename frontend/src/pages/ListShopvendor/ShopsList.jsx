import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Avatar, Box } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import BusinessIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import imageSrc from "./shop.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    maxWidth: "300px",
    width: "100%",
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    backdropFilter: "blur(12px)", // Stronger blur effect
    background: "rgba(0, 0, 0, 0.4)", // Darker background
    border: "1px solid rgba(255, 255, 255, 0.3)", // More visible border
    color: "#fff",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
    },
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    borderRadius: "0",
    marginBottom: theme.spacing(2),
  },
  content: {
    wordWrap: "break-word",
    position: "relative",
    zIndex: 1,
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "8px",
    marginTop: theme.spacing(1),
  },
  icon: {
    color: "#FFD700", // Premium gold color
  },
  shopName: {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
  },
  address: {
    fontSize: "14px",
    marginTop: "5px",
    color: "#ccc",
  },
  phone: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  },
}));

const Shop = ({ Sid, name, phone, address, vendorname }) => {
  const classes = useStyles();
  const shortAddress =
    address.length > 30 ? address.substring(0, 30) + "..." : address;

  return (
    <Card className={classes.root}>
      <CardActionArea
        component="a"
        href={`/products/searchbyshopvendor/${Sid}`}
      >
        <img className={classes.image} alt={name} src={imageSrc} />
        <CardContent className={classes.content}>
          {/* Business Name */}
          <Box className={classes.detailRow}>
            <BusinessIcon className={classes.icon} />
            <Typography className={classes.shopName}>{name}</Typography>
          </Box>

          {/* Address */}
          <Box className={classes.detailRow}>
            <LocationOnIcon className={classes.icon} />
            <Typography className={classes.shopName}>{shortAddress}</Typography>
          </Box>

          {/* Vendor Name */}
          <Box className={classes.detailRow}>
            <PersonIcon className={classes.icon} />
            <Typography className={classes.address}>{vendorname}</Typography>
          </Box>

          {/* Phone Number */}
          <Box className={classes.detailRow}>
            <PhoneIcon className={classes.icon} />
            <Typography className={classes.phone}>{phone}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Shop;
