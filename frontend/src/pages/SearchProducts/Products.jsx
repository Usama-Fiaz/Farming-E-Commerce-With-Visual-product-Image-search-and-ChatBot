import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  CardGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import axios from "axios";
import { Link } from "react-router-dom";
function SidebarFilter() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [productcategory, setProductCategory] = useState([]);
  const [location, setLocation] = useState([]);

  const [filters, setFilters] = useState({
    price: 1000000,
    category: "",
    p_color: "",
    product_category: "",
    loc: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product-inventory/product-list/")
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
      .get("http://127.0.0.1:8000/product-inventory/product-category-list/")
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

    console.log(
      "Filter price",
      filters.price,

      "Filter Category",
      filters.category,

      "Filter color",
      filters.p_color,
      "Filter product category",
      filters.product_category,
      "Filter location",
      filters.loc
    );

    // console.log(
    //   "Item",
    //   item.categoryfk,
    //   "Price",
    //   item.price,
    //   "DataType",
    //   typeof item.categoryfk,
    //   "color",
    //   item.color,
    //   "DataType",
    //   typeof item.color,
    //   "product category",
    //   item.Product_category
    // );

    return (
      item.price <= parseInt(price) &&
      (category === "" || item.categoryfk === parseInt(category)) &&
      (p_color === "" || item.color === p_color) &&
      (product_category === "" || item.Product_category === product_category) &&
      (loc === "" || item.available_location === loc)
    );
  });

  console.log("Filtered-->", filteredItems);

  // search box
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // send request to API and save data
    axios
      .get(`http://127.0.0.1:8000/product-inventory/search/${searchTerm}/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        // handle the error here
      });
  };

  return (
    <Container>
      <Row>
        <Form inline className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="text"
            placeholder="Search"
            className="me-1"
            onChange={handleChange}
          />

          <Button variant="outline-success" onClick={handleSearch}>
            Search
          </Button>
        </Form>
        <Col md={3}>
          <Form>
            <Form.Group controlId="formFilterCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFilterColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                as="select"
                name="color"
                value={filters.color}
                onChange={handleColorChange}
              >
                {color.map((col) => (
                  <option key={col.color} value={col.color}>
                    {col.color}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFilterProductCategory">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                as="select"
                name="product_category"
                value={filters.productcategory}
                onChange={handleProductCategoryChange}
              >
                {productcategory.map((col) => (
                  <option
                    key={col.Product_category}
                    value={col.Product_category}
                  >
                    {col.Product_category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFilterPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="10000000"
                value={filters.price}
                onChange={handlePriceChange}
              />
              <Form.Label>Price: {filters.price}</Form.Label>
            </Form.Group>

            <Form.Group controlId="formFilterLocation">
              <Form.Label>Store Location</Form.Label>
              <Form.Control
                as="select"
                name="available_location"
                value={filters.loc}
                onChange={handleStoreLocationChange}
              >
                {location.map((col) => (
                  <option
                    key={col.available_location}
                    value={col.available_location}
                  >
                    {col.available_location}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        {/* <Col md={9}>
          <CardGroup class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mx-2 my-2">
            {filteredItems.map((product) => (
              <Link className="link" to={`/product/${product?.id}`}>
                <Card key={product.id}>
                  <Card.Img
                    variant="top"
                    style={{ height: "200px" }}
                    src={`http://127.0.0.1:8000/${product?.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">£:{product.price}</small>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </CardGroup>
        </Col> */}
      </Row>
    </Container>
  );
}

export default SidebarFilter;
