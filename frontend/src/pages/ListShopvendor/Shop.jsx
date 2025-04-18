import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Shop from "./ShopsList";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import bgImage from "./bannerimg.webp"; // Background image

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    overflowX: "hidden", // Prevents horizontal scrolling
    overflowY: "hidden", // Prevent vertical scrolling
  },
  searchBox: {
    width: "90%",
    maxWidth: "600px",
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
  },
  scrollContainer: {
    width: "90%",
    flexGrow: 1, // Allows it to take available space without causing scroll
    overflowY: "hidden", // Removed scrolling
    borderRadius: "10px",
    padding: 0,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "bold",
    color: "#373737",
    textAlign: "center",
  },
}));

const ShopPage = () => {
  const classes = useStyles();
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      const response = await fetch("http://127.0.0.1:8000/shopvendorlist/");
      const data = await response.json();
      setShops(data);
    };
    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.Business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        All Stores
      </Typography>
      <TextField
        className={classes.searchBox}
        variant="outlined"
        placeholder="Search stores..."
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Container>
        <Grid container spacing={1}>
          {filteredShops.map((shop) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={shop.user}>
              <Shop
                Sid={shop.user}
                name={shop.Business_name}
                phone={shop.Business_phone}
                address={shop.Business_address}
                vendorname={shop.vendorname}
                logoUrl={shop.logoUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopPage;
