import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import BannerImage from "./bg-image.avif"; // Update this with a relevant high-quality image

const useStyles = makeStyles((theme) => ({
  banner: {
    height: "85vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${BannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    color: "#fff",
    textAlign: "left",
    padding: "0 5%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)", // Dark overlay for better text readability
    zIndex: 1,
  },
  bannerContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "600px",
  },
  title: {
    fontSize: "48px",
    fontWeight: 700,
    lineHeight: "1.2",
    marginBottom: "15px",
  },
  description: {
    fontSize: "18px",
    fontWeight: 300,
    marginBottom: "25px",
  },
  buttonsContainer: {
    display: "flex",
    gap: "15px",
  },
  shopNowBtn: {
    backgroundColor: "#ff6600",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    padding: "12px 25px",
    borderRadius: "50px",
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#cc5200",
    },
  },
  exploreBtn: {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    padding: "12px 25px",
    borderRadius: "50px",
    border: "2px solid #fff",
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <div className={classes.overlay}></div>
      <Grid container>
        <Grid item xs={12} md={6} className={classes.bannerContent}>
          <Typography variant="h1" className={classes.title}>
            Your One-Stop Shop for Everything!
          </Typography>
          <Typography variant="body1" className={classes.description}>
            Discover thousands of products at unbeatable prices. Shop the latest
            trends, gadgets, and essentials all in one place.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button variant="contained" className={classes.shopNowBtn}>
              Shop Now
            </Button>
            <Button variant="outlined" className={classes.exploreBtn}>
              Explore More
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Banner;
