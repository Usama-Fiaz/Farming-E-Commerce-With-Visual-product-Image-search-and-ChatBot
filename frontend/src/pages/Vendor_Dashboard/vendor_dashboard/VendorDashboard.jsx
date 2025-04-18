import Sidebar from "../../../components/dashboard/sidebar/Sidebar.jsx";

import "./vendordashboard.scss";
import Widget from "../../../components/dashboard/widget/Widget.jsx";

import Table from "../../../components/dashboard/table/Table.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className="listContainer">
          <h6>Order Transactions</h6>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
