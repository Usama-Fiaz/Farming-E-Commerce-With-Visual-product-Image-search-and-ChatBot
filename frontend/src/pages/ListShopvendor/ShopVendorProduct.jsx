import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Slider,
  InputAdornment,
  Paper,
} from "@mui/material";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { Search, Star, StarHalf, StarBorder } from "@mui/icons-material";
import { Box } from "@material-ui/core";
import imageSrc from "./shop.png";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const getAlphabetBasedRating = (title) => {
  if (!title || typeof title !== "string") return 3; // Default fallback rating

  const firstLetter = title.charAt(0).toUpperCase();
  const ratingMap = {
    A: 5,
    B: 4.5,
    C: 4,
    D: 3.5,
    E: 3,
    F: 2.5,
    G: 2,
    H: 5,
    I: 4.5,
    J: 4,
    K: 3.5,
    L: 3,
    M: 2.5,
    N: 2,
    O: 5,
    P: 4.5,
    Q: 4,
    R: 3.5,
    S: 3,
    T: 2.5,
    U: 2,
    V: 5,
    W: 4.5,
    X: 4,
    Y: 3.5,
    Z: 3,
  };

  return ratingMap[firstLetter] || 3; // Default rating if letter not mapped
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} sx={{ color: "#ffcc00" }} />);
    } else if (i - 0.5 === rating) {
      stars.push(<StarHalf key={i} sx={{ color: "#ffcc00" }} />);
    } else {
      stars.push(<StarBorder key={i} sx={{ color: "#ffcc00" }} />);
    }
  }
  return stars;
};

function SidebarFilter() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [productcategory, setProductCategory] = useState([]);
  const [location, setLocation] = useState([]);

  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      // Find max price
      const max = products.reduce(
        (max, product) => (product.price > max ? product.price : max),
        0
      );
      setMaxPrice(max);
      setFilters((prevFilters) => ({
        ...prevFilters,
        price: maxPrice,
      }));
    }
  }, [products, maxPrice]);

  const [filters, setFilters] = useState({
    price: maxPrice,
    category: "",
    p_color: "",
    product_category: "",
    loc: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product-inventory/product-by-vendor/${id}/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product-inventory/Category-list/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  // color list get
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product-inventory/color-list/")
      .then((response) => {
        setColor(response.data);
        console.log("color", response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  // product category list get

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product-inventory/product-category-list/`)
      .then((response) => {
        setProductCategory(response.data);
        console.log("product category", response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  // location list get

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product-inventory/store-location/")
      .then((response) => {
        setLocation(response.data);
        console.log("product store location", response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  const handlePriceChange = (event) => {
    const newFilters = {
      ...filters,
      price: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleCategoryChange = (event) => {
    const newFilters = {
      ...filters,
      category: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleColorChange = (event) => {
    const newFilters = {
      ...filters,
      p_color: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleProductCategoryChange = (event) => {
    const newFilters = {
      ...filters,
      product_category: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleStoreLocationChange = (event) => {
    const newFilters = {
      ...filters,
      loc: event.target.value,
    };
    setFilters(newFilters);
  };

  const filteredItems = products.filter((item) => {
    const { price, category, p_color, product_category, loc } = filters;
    return (
      item.price <= parseInt(price) &&
      (category === "" || item.categoryfk === parseInt(category)) &&
      (p_color === "" || item.color === p_color) &&
      (product_category === "" || item.Product_category === product_category) &&
      (loc === "" || item.available_location === loc)
    );
  });

  // search box
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return; // Prevent empty searches

    axios
      .get(`http://127.0.0.1:8000/product-inventory/search/${searchTerm}/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Search error:", error);
      });
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/shopvendorlist/`);
        const data = await response.json();

        const filteredShop = data.find((shop) => shop.user == id);
        setShops(filteredShop || null);

        console.log("Filtered shop:", filteredShop);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleResetFilters = () => {
    setFilters({
      category: "",
      p_color: "",
      product_category: "",
      loc: "",
      price: maxPrice, // Default max price
    });
  };

  return (
    <>
      <Container
        sx={{
          mt: 4,
          mb: 4,
          px: 4,
          py: 4,
          backgroundColor: "#f4f9f4",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers content horizontally
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
            gap: 0.5,
          }}
        >
          {/* First Line: Explore + Shop Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#388e3c",
                display: "inline-block",
                mr: 3,
              }}
            >
              Explore All Products at {shops?.Business_name}'s Shop
            </Typography>
            <img
              alt="Shop Icon"
              src={imageSrc}
              style={{ width: "40px", height: "40px", display: "inline-block" }}
            />
          </Box>

          {/* Second Line: Owned by Vendor */}
          <Typography
            variant="body2"
            sx={{
              color: "#2e7d32",
              fontWeight: "normal",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            (Owned by {shops?.vendorname})
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            mt: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#388e3c", // Custom background color
                    color: "white", // Text color
                    "&:hover": {
                      backgroundColor: "#388e3d", // Darker shade on hover
                    },
                    minWidth: "90px", // Adjust button width
                    height: "40px", // Adjust button height to match input
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#e8f5e9",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: "#2e7d32" }}>
                Filters
              </Typography>

              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                sx={{ mb: 2 }}
              >
                {categories.map((category, index) => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#4CAF50" : "#388E3C",
                      color: "white",
                      transition: "background-color 0.3s ease",
                      "&.Mui-selected": {
                        backgroundColor: "#2E7D32 !important", // Ensuring selected item is not gray
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor:
                          index % 2 === 0 ? "#2E7D32" : "#1B5E20",
                      },
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>

              {productcategory[0]?.Product_category !== "Fruits" &&
                productcategory[0]?.Product_category !== "Vegetables" &&
                productcategory[0]?.Product_category !== "Seeds" && (
                  <TextField
                    fullWidth
                    select
                    label="Color"
                    name="p_color"
                    value={filters.p_color}
                    onChange={handleFilterChange}
                    sx={{ mb: 2 }}
                  >
                    {color.map((col, index) => (
                      <MenuItem
                        key={col.color}
                        value={col.color}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#4CAF50" : "#388E3C",
                          color: "white",
                          transition: "background-color 0.3s ease",
                          "&.Mui-selected": {
                            backgroundColor: "#2E7D32 !important", // Ensuring selected item is not gray
                            color: "white",
                          },
                          "&:hover": {
                            backgroundColor:
                              index % 2 === 0 ? "#2E7D32" : "#1B5E20",
                          },
                        }}
                      >
                        {col.color}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              {/* <TextField
                fullWidth
                select
                label="Product Category"
                name="product_category"
                value={filters.product_category}
                onChange={handleFilterChange}
                sx={{ mb: 2 }}
              >
                {productcategory.map((col, index) => (
                  <MenuItem
                    key={col.Product_category}
                    value={col.Product_category}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#4CAF50" : "#388E3C",
                      color: "white",
                      transition: "background-color 0.3s ease",
                      "&.Mui-selected": {
                        backgroundColor: "#2E7D32 !important", // Ensuring selected item is not gray
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor:
                          index % 2 === 0 ? "#2E7D32" : "#1B5E20",
                      },
                    }}
                  >
                    {col.Product_category}
                  </MenuItem>
                ))}
              </TextField> */}
              <TextField
                fullWidth
                select
                label="Store Location"
                name="available_location"
                value={filters.loc}
                onChange={handleStoreLocationChange}
                sx={{ mb: 2 }}
              >
                {location.map((loc, index) => (
                  <MenuItem
                    key={loc.available_location}
                    value={loc.available_location}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#4CAF50" : "#388E3C",
                      color: "white",
                      transition: "background-color 0.3s ease",
                      "&.Mui-selected": {
                        backgroundColor: "#2E7D32 !important", // Ensuring selected item is not gray
                        color: "white",
                      },
                      "&:hover": {
                        backgroundColor:
                          index % 2 === 0 ? "#2E7D32" : "#1B5E20",
                      },
                    }}
                  >
                    {loc.available_location}
                  </MenuItem>
                ))}
              </TextField>
              <Typography sx={{ mt: 0 }}>Max Price: {filters.price}</Typography>
              <Slider
                value={filters.price}
                onChange={handlePriceChange}
                min={0}
                max={maxPrice}
                sx={{ color: "#388e3c" }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  textAlign: "center",
                  gap: 2,
                  width: "100%", // Ensures full width for centering
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleResetFilters}
                  sx={{
                    background:
                      "linear-gradient(135deg, #4CAF50 30%, #2E7D32 90%)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "40px",
                    height: "40px",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #388E3C 30%, #1B5E20 90%)",
                    },
                  }}
                >
                  <RestartAltIcon />
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {filteredItems.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      component={Link}
                      to={`/product/${product.id}`}
                      sx={{
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.12)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={`http://127.0.0.1:8000/${product.image}`}
                        alt={product.title}
                        sx={{
                          transition:
                            "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                          objectFit: "cover", // Ensures the image fills the area while maintaining aspect ratio
                          width: "100%", // Makes sure it fits the container width
                          opacity: 0.85, // Dims the image slightly
                        }}
                      />
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2">
                          £ {product.price}
                        </Typography>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          {renderStars(getAlphabetBasedRating(product.title))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default SidebarFilter;
