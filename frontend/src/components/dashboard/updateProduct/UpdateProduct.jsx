import "./updateProduct.scss";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

import { getToken } from "../../../services/LocalStorageService.js";
import { useEffect, useState } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const List = () => {
  let navigate = useNavigate(); // Navigator
  const [errors, setErrors] = useState([]);

  const catId = parseInt(useParams().id);
  const url = `http://127.0.0.1:8000/product-inventory/product-update/${catId}/`;

  const [data, setData] = useState({
    categoryfk: "",
    vendorfk: "",
    title: "",
    product_slug: "",
    color: "",
    Style: "",
    Pattern: "",
    shape: "",

    Product_category: "",
    description: "",
    price: "",
    qty: "",
    brand_name: "",
    available_location: "",
  });

  const [postimage, setPostImage] = useState(null);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  function submit(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("image", postimage?.image[0]);

    formData.append("categoryfk", productData?.categoryfk);
    formData.append("vendorfk", productData?.vendorfk);
    formData.append("title", productData?.title);
    formData.append("product_slug", productData?.product_slug);
    formData.append("color", productData?.color);
    formData.append("Style", productData?.Style);
    //
    formData.append("Pattern", productData?.Pattern);
    formData.append("shape", productData?.shape);
    formData.append("Product_category", productData?.Product_category);
    formData.append("description", productData?.description);
    formData.append("price", productData?.price);
    formData.append("qty", productData?.qty);
    //
    formData.append("brand_name", productData?.brand_name);
    formData.append("available_location", productData?.available_location);

    Axios.put(url, formData, config)
      .then((res) => {
        console.log(res.formData);
      })
      .catch((e) => {
        toast.error("Some error Occured  " + e.response);

        setErrors(e.response.data.errors);
        return;
      });

    toast.success("Product update Successfull");
    navigate("/VendorDashboard");
  }

  function handle(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setPostImage({ image: files });
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product-inventory/Category-list/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/product-inventory/product-detail/${catId}`
        );
        setProductData(response.data);
        console.log("sama response.data : ", response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (catId) {
      fetchData();
    }
  }, [catId]);

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer />

      <form onSubmit={(e) => submit(e)}>
        <Grid container spacing={2}>
          {/* Product Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              name="title"
              defaultValue={productData?.title || ""}
              value={productData?.title || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Title"
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryfk"
                value={productData?.categoryfk || ""}
                onChange={(e) => handle(e)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Color */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Color"
              fullWidth
              variant="outlined"
              name="color"
              value={productData?.color || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Color"
            />
          </Grid>

          {/* Style */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Style"
              fullWidth
              variant="outlined"
              name="Style"
              value={productData?.Style || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Style"
            />
          </Grid> */}

          {/* Pattern */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Pattern"
              fullWidth
              variant="outlined"
              name="Pattern"
              value={productData?.Pattern || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Pattern"
            />
          </Grid> */}

          {/* Shape */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Shape"
              fullWidth
              variant="outlined"
              name="shape"
              value={productData?.shape || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Shape"
            />
          </Grid> */}

          {/* Product Category */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              label="Product Category"
              fullWidth
              variant="outlined"
              name="Product_category"
              value={productData?.Product_category || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Category"
            />
          </Grid> */}

          {/* Description */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              name="description"
              value={productData?.description || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Description"
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              fullWidth
              variant="outlined"
              name="price"
              value={productData?.price || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Price"
            />
          </Grid>

          {/* Quantity in Packet */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity in Packet"
              fullWidth
              variant="outlined"
              name="qty"
              value={productData?.qty || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Quantity"
            />
          </Grid>

          {/* Brand Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Brand Name"
              fullWidth
              variant="outlined"
              name="brand_name"
              value={productData?.brand_name || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Brand Name"
            />
          </Grid>

          {/* Available Location */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Available Location"
              fullWidth
              variant="outlined"
              name="available_location"
              value={productData?.available_location || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Available Location"
            />
          </Grid>

          {/* Product Link */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Link"
              fullWidth
              variant="outlined"
              name="product_slug"
              value={productData?.product_slug || ""}
              onChange={(e) => handle(e)}
              placeholder="Enter Product Link"
            />
          </Grid>

          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Product Image</Typography>
            {productData?.image && (
              <Box
                component="img"
                src={productData.image}
                alt="Product"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 1,
                  objectFit: "cover",
                  mb: 1,
                }}
              />
            )}

            <input
              accept="image/*"
              id="image"
              name="image"
              type="file"
              onChange={(e) => handle(e)}
              style={{ marginTop: "10px" }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                "&:hover": {
                  background: "linear-gradient(135deg, #388E3C, #1B5E20)",
                },
              }}
            >
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default List;
