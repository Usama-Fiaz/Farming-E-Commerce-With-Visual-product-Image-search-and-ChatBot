import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";

// Import images
import BannerImage1 from "./bg-image.avif";
import BannerImage2 from "./bg-img2.avif";
import BannerImage3 from "./bg-img3.avif";
import BannerImage4 from "./bg-img4.avif";
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
const images = [BannerImage1, BannerImage2, BannerImage4, BannerImage3];

const useStyles = makeStyles((theme) => ({
  banner: {
    height: "90vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundImage: `url(${BannerImage})`,
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
  const sliderRef = useRef(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable default arrows
  };

  return (
    <Box
      position="relative"
      sx={{
        m: -2,
      }}
    >
      {/* Left Arrow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          zIndex: 2,
          cursor: "pointer",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s",
          "&:hover": { background: "rgba(0, 0, 0, 0.8)" },
        }}
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowBackIosIcon sx={{ color: "white" }} fontSize="large" />
      </Box>

      {/* Right Arrow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 2,
          cursor: "pointer",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s",
          "&:hover": { background: "rgba(0, 0, 0, 0.8)" },
        }}
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowForwardIosIcon sx={{ color: "white" }} fontSize="large" />
      </Box>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "85vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={classes.banner}>
              <div className={classes.overlay}></div>
              <Grid container>
                <Grid item xs={12} md={6} className={classes.bannerContent}>
                  <Typography
                    variant="h2"
                    className={classes.title}
                    sx={{ mb: 2 }}
                  >
                    Your One-Stop Shop for Everything!
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.description}
                    sx={{ mb: 3 }}
                  >
                    Discover thousands of products at unbeatable prices. Shop
                    the latest trends, gadgets, and essentials all in one place.
                  </Typography>
                  <div className={classes.buttonsContainer}>
                    <Button
                      variant="contained"
                      className={classes.shopNowBtn}
                      onClick={() => {
                        navigate('/products/searchbycategory/2');
                      }}
                    >
                      Shop Now
                    </Button>
                    <Button variant="outlined" className={classes.exploreBtn} onClick={() => {
                        navigate('/ListShopvendor');
                      }}>
                      Explore Vendors
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default Banner;
