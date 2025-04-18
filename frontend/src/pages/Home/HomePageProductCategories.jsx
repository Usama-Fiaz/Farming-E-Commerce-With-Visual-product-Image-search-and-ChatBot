import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  background: "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
  margin: "10px", // Added margin to create space between cards
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
  },
}));

const StyledMedia = styled(CardMedia)({
  height: 250,
  filter: "brightness(0.9)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledContent = styled(CardContent)({
  textAlign: "center",
  padding: "20px",
});

const Title = styled(Typography)({
  fontSize: "20px",
  fontWeight: "700",
  color: "#222",
});

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#666",
});

const CategoryCard = ({ category }) => (
  <PremiumCard>
    <CardActionArea
      component="a"
      href={`/products/searchbycategory/${category.id}`}
    >
      <StyledMedia
        image={`http://127.0.0.1:8000/${category.image}`}
        title={category.name}
      />
      <StyledContent>
        <Title>{category.name}</Title>
        <Description>
          {category.description || "Explore premium quality products"}
        </Description>
      </StyledContent>
    </CardActionArea>
  </PremiumCard>
);

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/product-inventory/Category-list/"
      );
      setCategories(response.data);
    };
    fetchCategories();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Display 5 cards at once
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        textAlign: "center",
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, color: "#333" }}
      >
        Product Categories
      </Typography>
      <Box sx={{ width: "100%" }}>
        {" "}
        {/* Ensures proper width */}
        <Slider {...settings}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CategorySlider;
