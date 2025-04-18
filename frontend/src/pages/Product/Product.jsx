import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import useFetch from "../../hooks/useFetch";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Grid,
  Container,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AddShoppingCart,
  Add,
  Remove,
  Store,
  PersonPinCircle,
  Info,
  Category,
} from "@mui/icons-material";
import CircularLoader from "../Loader/CircularLoader";

const GreenButton = styled(Button)({
  backgroundColor: "#4CAF50",
  color: "white",
  "&:hover": {
    backgroundColor: "#388E3C",
  },
});

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [productOfCategories, setProductOfCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { data, loading } = useFetch(
    `http://127.0.0.1:8000/product-inventory/product-detail/${id}`
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/product-inventory/Category-list/"
        );
        const filteredCat = response?.data?.find(
          (cat) => cat.name === data?.Product_category
        );
        setCategory(filteredCat);

        if (filteredCat?.id) {
          const response2 = await axios.get(
            `http://127.0.0.1:8000/product-inventory/product-by-category/${filteredCat.id}/`
          );
          setProductOfCategories(response2?.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (data?.Product_category) fetchCategories();
  }, [data?.Product_category]);

  if (loading) return <CircularLoader />;

  return (
    <>
      {/* Main Product Display */}
      <Container
        maxWidth="md"
        sx={{
          p: 5,
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: "none" }}>
            <CardMedia
              component="img"
              height="350"
              image={data?.image || "https://via.placeholder.com/400"}
              alt={data?.title}
              sx={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Card>

          <Card sx={{ maxWidth: 500, p: 3, boxShadow: "none" }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {data?.title}
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                £: {data?.price}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                <Store color="action" />
                <Typography variant="body1">
                  Business: {data?.vendorfk?.Business_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <PersonPinCircle color="action" />
                <Typography variant="body2" color="text.secondary">
                  Vendor: {data?.vendorfk?.vendorname}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ mt: 1, color: data?.qty ? "green" : "red" }}
              >
                {data?.qty ? "In Stock" : "Out of Stock"}
              </Typography>
              <Box sx={{ display: "flex", mt: 1 }}>
                <Chip
                  label={`Category: ${data?.Product_category}`}
                  color="primary"
                  icon={<Category />}
                />
              </Box>
              <Box sx={{ display: "flex", mt: 1 }}>
                <Chip
                  label={`Available in: ${data?.available_location}`}
                  color="success"
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={3}>
                <Tooltip title="Decrease">
                  <IconButton
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <Remove />
                  </IconButton>
                </Tooltip>
                <Typography fontSize="1.2rem">{quantity}</Typography>
                <Tooltip title="Increase">
                  <IconButton onClick={() => setQuantity((prev) => prev + 1)}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </Box>
              <GreenButton
                fullWidth
                startIcon={<AddShoppingCart />}
                sx={{
                  mt: 3,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: 3,
                }}
                disabled={!data?.qty}
                onClick={() => {
                  console.log("sama data : ", data);
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.title,
                      price: data.price,
                      img: data.image,
                      quantity,
                      totalbill: data.price * quantity,
                      vendorfk: data?.vendorfk,
                    })
                  );
                }}
              >
                {data?.qty ? "Add to Cart" : "Out of Stock"}
              </GreenButton>
            </CardContent>
          </Card>
        </Box>

        <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Product Description
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "left" }}
          >
            {data?.description ||
              "This product is a high-quality agricultural item, carefully sourced and selected to provide excellent results for farmers and gardeners."}
          </Typography>
        </Container>
      </Container>

      {/* Related Products Section */}
      <Container
        sx={{
          mt: 4,
          px: 4,
          py: 4,
          backgroundColor: "#f4f9f4",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Related Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {productOfCategories?.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                component={Link}
                to={`/product/${product.id}`}
                sx={{ borderRadius: 5, overflow: "hidden" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://127.0.0.1:8000/${product.image}`}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body1" color="primary">
                    £ {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Product;
