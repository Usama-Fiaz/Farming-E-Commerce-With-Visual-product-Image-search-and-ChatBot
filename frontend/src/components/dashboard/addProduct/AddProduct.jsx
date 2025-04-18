import "./addproduct.scss";

import { getToken } from "../../../services/LocalStorageService.js";
import { useEffect, useState } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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

const List = () => {
  let navigate = useNavigate(); // Navigator
  const [errors, setErrors] = useState([]);

  const url = "http://127.0.0.1:8000/product-inventory/product-create/";

  const [data, setData] = useState({
    categoryfk: "",
    vendorfk: "",
    title: "",
    product_slug: "",
    color: "",
    Style: "Any",
    Pattern: "Any",
    shape: "Any",

    Product_category: "Fruits",
    description: "",
    price: 0,
    qty: 0,
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

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Category not found";
  };

  const submit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("image", postimage.image[0]);

    formData.append("categoryfk", data.categoryfk);
    formData.append("vendorfk", data.vendorfk);
    formData.append("title", data.title);
    formData.append("product_slug", data.product_slug);
    formData.append("color", data.color);
    formData.append("Style", data.Style);
    //
    formData.append("Pattern", data.Pattern);
    formData.append("shape", data.shape);
    formData.append("Product_category", getCategoryName(data.categoryfk));
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("qty", data.qty);
    //
    formData.append("brand_name", data.brand_name);
    formData.append("available_location", data.available_location);

    console.log("sama formData : ", formData);

    // Axios.post(url, formData, config)
    //   .then((res) => {
    //     console.log(res.formData);
    //   })
    //   .catch((e) => {
    //     alert("Some error Occured " + e.response.data.errors);
    //     setErrors(e.response.data.errors);
    //     return
    //   });

    try {
      await Axios.post(url, formData, config);
      toast.success("Product add Successfull");
      navigate("/VendorDashboard");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Error: Bad Request" + error.message);
      } else if (error.response.status === 401) {
        toast.error("Session Expired :" + error.message);
        navigate("/");
      } else {
        toast.error("Some other error Occured : " + error.message);
      }
      // alert("Error" + e.response.data.errors + " ->" + e.response);
      // setErrors(e.response.data.errors);
    }
  };

  function handle(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setPostImage({ image: files });
    } else {
      console.log("sama name : ", name);
      console.log("sama value : ", value);

      setData((prevData) => ({
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

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer />

      <form onSubmit={(e) => submit(e)}>
        <Grid container spacing={2}>
          {/* Product Name */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              id="title"
              value={data.title}
              label="Product Name"
              fullWidth
              variant="outlined"
              name="title"
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                onChange={(e) => handle(e)}
                name="categoryfk"
                id="categoryfk"
                value={data.categoryfk}
              >
                {console.log("sama categories : ", categories)}
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
              onChange={(e) => handle(e)}
              id="color"
              value={data.color}
              label="Color"
              fullWidth
              variant="outlined"
              name="color"
            />
          </Grid>

          {/* Style */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              id="Style"
              value={data.Style}
              label="Style"
              fullWidth
              variant="outlined"
              name="Style"
            />
          </Grid> */}

          {/* Pattern */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="Pattern"
              value={data.Pattern}
              label="Pattern"
              fullWidth
              variant="outlined"
              name="Pattern"
            />
          </Grid> */}

          {/* Shape */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="shape"
              value={data.shape}
              label="Shape"
              fullWidth
              variant="outlined"
              name="shape"
            />
          </Grid>

          {/* Product Category */}
          {/* <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="Product_category"
              value={data.Product_category}
              label="Product Category"
              fullWidth
              variant="outlined"
              name="Product_category"
            />
          </Grid> */}

          {/* Description */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="description"
              value={data.description}
              label="Description"
              fullWidth
              variant="outlined"
              name="description"
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="price"
              value={data.price}
              label="Price"
              fullWidth
              variant="outlined"
              name="price"
            />
          </Grid>

          {/* Quantity in Packet */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="qty"
              value={data.qty}
              label="Quantity in Packet"
              fullWidth
              variant="outlined"
              name="qty"
            />
          </Grid>

          {/* Brand Name */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="brand_name"
              value={data.brand_name}
              label="Brand Name"
              fullWidth
              variant="outlined"
              name="brand_name"
            />
          </Grid>

          {/* Available Location */}
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) => handle(e)}
              type="text"
              id="available_location"
              value={data.available_location}
              label="Available Location"
              fullWidth
              variant="outlined"
              name="available_location"
            />
          </Grid>

          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Product Image</Typography>

            <input
              accept="image/*"
              id="image"
              name="image"
              type="file"
              onChange={(e) => handle(e)}
              className="form-control"
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
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default List;
