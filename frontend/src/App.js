import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Nav/Navbar";
import Home from "./pages/Home/Home";
import SearchProductByCategories from "./pages/Home/SearchProductByCategories";
import VendorDashboard from "./pages/Vendor_Dashboard/vendor_dashboard/VendorDashboard";
import VendorDashboardProductView from "./pages/Vendor_Dashboard/VendorDashboardProductList/VendorDashboardProductList.jsx";
import VendorDashboardAddProduct from "./pages/Vendor_Dashboard/VendorDashboardAddProduct/AddProduct.jsx";
import VendorDashboardUpdateProduct from "./pages/Vendor_Dashboard/VendorDashboardUpdateProduct/UpdateProduct.jsx";
import Register from "./pages/register/Register";
import OrderDelivery from "./pages/OrderDelivery/OrderDelivery";
import PlacedOrder from "./pages/OrderDelivery/PlacedOrder";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";
import Login from "./pages/login/Login";
import MainRegisterPage from "./pages/PageRegister/MainRegisterPage.jsx";
import Forgot from "./pages/forgot/Forgot";
import Product from "./pages/Product/Product";
import Products from "./pages/SearchProducts/Products";
import ImageSearchProduct from "./pages/ImageSearchProducts/ImageProducts";
import ShopsList from "./pages/ListShopvendor/Shop";
import SearchProductByShop from "./pages/ListShopvendor/ShopVendorProduct";
import LocationMap from "./pages/LocationMap/Map";
// import PageLayout from "./pages/Home/Leftsidebar";
import "./app.scss";
import "./App.css";
import Chatbot from "./pages/chatbot/Chatbot.js";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

const VendorDashboardLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        // category each product filter
        path: "/products/search",
        element: <Products />,
      },
      {
        // category each product filter
        path: "/products/searchbycategory/:id",
        element: <SearchProductByCategories />,
      },
      {
        // category each product filter
        path: "/products/searchbyshopvendor/:id",
        element: <SearchProductByShop />,
      },

      {
        // one product filter
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/LocationMap",
        element: <LocationMap />,
      },
      {
        path: "/ListShopvendor",
        element: <ShopsList />,
      },
      {
        path: "/OrderDelivery",
        element: <OrderDelivery />,
      },
      {
        path: "/placed-order",
        element: <PlacedOrder />,
      },
    ],
  },
  {
    path: "/VendorDashboard",
    element: <VendorDashboardLayout />,
    children: [
      {
        path: "/VendorDashboard",
        element: <VendorDashboard />,
      },
      {
        path: "/VendorDashboard/ProductView",
        element: <VendorDashboardProductView />,
      },
      {
        path: "/VendorDashboard/AddProduct",
        element: <VendorDashboardAddProduct />,
      },
      {
        path: "/VendorDashboard/:id",
        element: <VendorDashboardUpdateProduct />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/main_register",
    element: <MainRegisterPage />,
  },
  {
    path: "/Customerregister",
    element: <CustomerRegister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPassword",
    element: <Forgot />,
  },
  {
    path: "/ChatBot",
    element: <Chatbot />,
  },
  {
    path: "/ImageSearch",
    element: <ImageSearchProduct />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
