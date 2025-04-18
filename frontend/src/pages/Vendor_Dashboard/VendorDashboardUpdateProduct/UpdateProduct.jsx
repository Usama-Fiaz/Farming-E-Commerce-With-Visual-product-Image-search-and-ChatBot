import Sidebar from "../../../components/dashboard/sidebar/Sidebar.jsx";
import "./updateproduct.scss";
import Table from "../../../components/dashboard/updateProduct/UpdateProduct.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Paper, Typography } from "@mui/material";

const UpdateProduct = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f4f4" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Update Product
          </Typography>
          <Table />
        </Paper>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
