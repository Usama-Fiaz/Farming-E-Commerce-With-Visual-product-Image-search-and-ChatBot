import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Nav/Navbar";
import Footer from "../../components/Footer/Footer";

function ImageUpload() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!image) {
      return toast.error("Please select an image to upload.");
    }

    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/product-inventory/upload-image/",
        formData
      );
      setData(response.data);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated Data: ", data);
  }, [data]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container style={{ padding: "50px 0" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Upload an Image to Search Products
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "block", margin: "10px auto" }}
            />
            {image && (
              <Card
                style={{
                  maxWidth: 300,
                  margin: "20px auto",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={URL.createObjectURL(image)}
                  alt="preview"
                />
              </Card>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleUpload}
              style={{ marginTop: "10px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginTop: "30px" }}
        >
          Search Results
        </Typography>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {data.length > 0 ? (
              data.map((result) => (
                <Grid item xs={12} sm={6} md={4} key={result.id}>
                  <Card style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={`http://127.0.0.1:8000/${result.image}`}
                      alt={result.title}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        <Link
                          to={`/product/${result.id}`}
                          style={{ textDecoration: "none", color: "#333" }}
                        >
                          {result.title}
                        </Link>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        £: {result.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography align="center">No products found.</Typography>
            )}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ImageUpload;
