import React from "react";
import { Grid } from "@material-ui/core";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Banner from "./Banner";
import Stats from "./Stats";
import ProductCategory from "./HomePageProductCategories";
import AboutUs from "./AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Banner />
      </Grid>
      <Grid item xs={12}>
        <Stats />
      </Grid>

      <Grid item xs={12}>
        <ProductCategory />
      </Grid>
      <Grid item xs={12}>
        <AboutUs />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
