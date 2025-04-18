import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import logo from "./about-us.webp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    color: "black",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    color: "#17093E",
    fontSize: "30px",
    fontWeight: 700,
    lineHeight: "120%",
    textAlign: "left",
  },
  description: {
    color: "#0C2233",
    fontSize: "18px",
    fontWeight: 200,
    lineHeight: "normal",
    textAlign: "left",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center", // Centers the image horizontally
    alignItems: "center", // Centers the image vertically within the container
  },
  image: {
    maxWidth: "350px",
    minWidth: "350px",
    objectFit: "cover",
    height: "auto",
    borderRadius: "5px",
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          className={classes.sectionTitle}
        >
          About Us
        </Typography>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Container className={classes.paper}>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="h5"
                gutterBottom
                className={classes.title}
              >
                What is our <span style={{ color: "#00ABB3" }}>Project</span>
              </Typography>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="body1"
                className={classes.description}
              >
                Welcome to <strong>Farming E-Commerce</strong>, your trusted
                destination for farm-fresh produce and agricultural essentials.
                We are dedicated to bridging the gap between farmers and
                consumers by providing high-quality, organic, and sustainable
                products straight from the farm to your doorstep.
              </Typography>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="body1"
                className={classes.description}
              >
                <strong>Our Mission:</strong> We believe in revolutionizing the
                farming industry by integrating technology with traditional
                agriculture. Our goal is to empower local farmers, promote
                sustainable farming practices, and ensure that our customers
                receive the freshest and healthiest products available.
              </Typography>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="body1"
                className={classes.description}
              >
                <strong>What We Offer:</strong>
                <ul>
                  <li>Farm-to-table fresh produce</li>
                  <li>Premium quality seeds and farming tools</li>
                  <li>Fast and reliable delivery</li>
                  <li>Eco-friendly and sustainable practices</li>
                </ul>
              </Typography>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="body1"
                className={classes.description}
              >
                <strong>Why Choose Us?</strong>
                <ul>
                  <li>Supporting local farmers</li>
                  <li>Technology-driven agriculture solutions</li>
                  <li>Commitment to sustainability and quality</li>
                  <li>Hassle-free shopping experience</li>
                </ul>
              </Typography>
              <Typography
                style={{ fontFamily: "sans-serif" }}
                variant="body1"
                className={classes.description}
              >
                Join us in reshaping the future of agriculture—one fresh product
                at a time! 🌱🚜
              </Typography>
            </Container>
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={6} className={classes.imageContainer}>
            <img
              src={logo}
              alt="Farming E-Commerce"
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;
