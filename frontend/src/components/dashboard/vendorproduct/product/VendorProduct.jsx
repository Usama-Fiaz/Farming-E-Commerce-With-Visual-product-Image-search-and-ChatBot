import "./vendorProduct.scss";
import { Link } from "react-router-dom";
import { getToken } from "../../../../services/LocalStorageService.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { version } from "joi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const VendorProduct = () => {
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const url = "http://127.0.0.1:8000/product-inventory/shopvendor-productlist/";

  const [data, setData] = useState([]);

  //get data from api

  useEffect(() => {
    try {
      axios.get(url, config).then((res) => setData(res.data));

      console.log("Product Data:", data); // Debugging data
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Login Expired. Please Login Again");
        navigate("/login");
      }
      console.log("Error", error);
      toast.error("Error " + error);

      return;
    }
  }, []);

  // console.log("Vendor Order VendorProduct : ", data);

  // function for login button
  function DeleteHandler(pk) {
    console.log("Product ID: ", pk);
    try {
      let response = axios.delete(
        `http://127.0.0.1:8000/product-inventory/product-delete/${pk}`,
        config
      );
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Login Expired. Please Login Again");
        navigate("/login");
      } else toast.error("Error " + error);

      return;
    }

    toast.success("Delete Successful");
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <ToastContainer />
      <Table sx={{ minWidth: 750 }} aria-label="product table">
        {/* Table Head */}
        <TableHead>
          <TableRow sx={{ bgcolor: "#388E3C" }}>
            {[
              "Product ID",
              "Product",
              "Price",
              "Color",
              "Brand",
              "Available Location",
              "Actions",
            ].map((heading) => (
              <TableCell
                key={heading}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:nth-of-type(even)": { bgcolor: "grey.100" } }}
            >
              <TableCell>{row?.id}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <img
                    src={`http://127.0.0.1:8000/${row?.image}`}
                    alt={row?.title}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {row?.title}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>${row?.price}</TableCell>
              <TableCell>{row?.color}</TableCell>
              <TableCell>{row?.brand_name}</TableCell>
              <TableCell>{row?.available_location}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => DeleteHandler(row?.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/VendorDashboard/${row?.id}`}
                  >
                    Update
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VendorProduct;
