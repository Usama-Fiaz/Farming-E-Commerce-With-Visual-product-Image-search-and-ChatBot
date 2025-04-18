import "./table.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { getToken } from "../../../services/LocalStorageService.js";
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
  Stack,
  Typography,
  Button,
} from "@mui/material";

const List = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  useEffect(() => {
    const LoadOrderList = async () => {
      try {
        const apiResponse = await axios.get(
          "http://127.0.0.1:8000/product-inventory/shopvendor-orderlist/",
          config
        );
        setData(apiResponse.data);
      } catch (error) {
        console.error("API Call Failed:", error);
        if (error.response?.status === 401) {
          toast.error("Session Expired. Please Login Again.");
          navigate("/login");
        } else {
          toast.error("Error: " + error.message);
        }
      }
    };

    LoadOrderList();
  }, [navigate]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <ToastContainer />
      <Table sx={{ minWidth: 750 }} aria-label="order table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#388E3C" }}>
            {[
              "ID",
              "Date",
              "Order ID",
              "Product ID",
              "Product",
              "Price",
              "Quantity",
              "Total Amount",
              // "Actions",
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
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:nth-of-type(even)": { bgcolor: "grey.100" } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {moment(row.created_at).format("MM/DD/YYYY hh:mm:ss")}
              </TableCell>
              <TableCell>{row.order}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.Product_title}</TableCell>
              <TableCell>£{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>£{row.quantity * row.price}</TableCell>
              {/* <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="error" size="small">
                    Cancel
                  </Button>
                </Stack>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
