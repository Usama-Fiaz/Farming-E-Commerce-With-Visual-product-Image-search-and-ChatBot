import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import products from "./products.png";
import customers from "./customers.png";
import venders from "./venders.png";

const useStyles = makeStyles((theme) => ({
  statsSection: {
    background: "#000",
    boxShadow: "0px 4px 4px 3px rgba(0, 0, 0, 0.34)",
    minWidth: "85%",
    margin: "30px 10px",
    padding: "20px 0",
  },
  statIconBg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    width: "80px",
    height: "80px",
    marginRight: "20px",
    backgroundColor: "#fff", // White background for better contrast
  },
  statIcon: {
    width: "50px",
    height: "50px",
  },
  statDivs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "270px",
    textAlign: "center",
    margin: "10px 20px",
  },
  statRight: {
    textAlign: "left",
    minWidth: "200px",
  },
  statTitle: {
    textAlign: "left",
    color: "#fff",
    fontSize: "24px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  statDescription: {
    textAlign: "left",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 300,
    whiteSpace: "nowrap",
  },
}));

const Stats = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.statsSection}
      style={{ width: "99%", overflow: "hidden" }}
    >
      <Grid container justifyContent="center" spacing={3} mt={2}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          {" "}
          {/* Added xs={12} for responsiveness */}
          <div className={classes.statDivs}>
            <div className={classes.statIconBg}>
              <img
                src={products}
                alt="Products"
                className={classes.statIcon}
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className={classes.statRight}>
              <Typography variant="h5" className={classes.statTitle}>
                50k+
              </Typography>
              <Typography variant="body1" className={classes.statDescription}>
                Products
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <div className={classes.statDivs}>
            <div className={classes.statIconBg}>
              <img
                src={customers}
                alt="Customers"
                className={classes.statIcon}
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className={classes.statRight}>
              <Typography variant="h5" className={classes.statTitle}>
                5000+
              </Typography>
              <Typography variant="body1" className={classes.statDescription}>
                Happy Customers
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <div className={classes.statDivs}>
            <div className={classes.statIconBg}>
              <img
                src={venders}
                alt="Vendors"
                className={classes.statIcon}
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className={classes.statRight}>
              <Typography variant="h5" className={classes.statTitle}>
                50+
              </Typography>
              <Typography variant="body1" className={classes.statDescription}>
                Vendors
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;
